import { createGateway } from '@ai-sdk/gateway';
import {
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateObject,
  streamObject,
  streamText,
  tool,
} from 'ai';
import express from 'express';
import { createSlateEditor, nanoid } from 'platejs';
import { z } from 'zod';
import { markdownJoinerTransform } from '../lib/markdown-joiner-transform.js';
import {
  getChooseToolPrompt,
  getCommentPrompt,
  getEditPrompt,
  getGeneratePrompt,
} from '../lib/prompts.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { apiKey: key, ctx, messages: messagesRaw = [], model } = req.body;

  const { children, selection, toolName: toolNameParam } = ctx;

  // Note: BaseEditorKit would need to be imported from the React app
  // For now, we'll use a minimal plugin set
  const editor = createSlateEditor({
    plugins: [], // TODO: Import BaseEditorKit if needed
    selection,
    value: children,
  });

  const apiKey = key || process.env.AI_GATEWAY_API_KEY;

  if (!apiKey) {
    return res.status(401).json({ error: 'Missing AI Gateway API key.' });
  }

  const isSelecting = editor.api.isExpanded();

  const gatewayProvider = createGateway({
    apiKey,
  });

  try {
    const stream = createUIMessageStream({
      execute: async ({ writer }) => {
        let toolName = toolNameParam;

        if (!toolName) {
          const { object: AIToolName } = await generateObject({
            enum: isSelecting
              ? ['generate', 'edit', 'comment']
              : ['generate', 'comment'],
            model: gatewayProvider(model || 'google/gemini-2.5-flash'),
            output: 'enum',
            prompt: getChooseToolPrompt(messagesRaw),
          });

          writer.write({
            data: AIToolName,
            type: 'data-toolName',
          });

          toolName = AIToolName;
        }

        const textStream = streamText({
          experimental_transform: markdownJoinerTransform(),
          model: gatewayProvider(model || 'openai/gpt-4o-mini'),
          prompt: '',
          tools: {
            comment: getCommentTool(editor, {
              messagesRaw,
              model: gatewayProvider(model || 'google/gemini-2.5-flash'),
              writer,
            }),
          },
          prepareStep: async (step) => {
            if (toolName === 'comment') {
              return {
                ...step,
                toolChoice: { toolName: 'comment', type: 'tool' },
              };
            }

            if (toolName === 'edit') {
              const editPrompt = getEditPrompt(editor, {
                isSelecting,
                messages: messagesRaw,
              });

              return {
                ...step,
                activeTools: [],
                messages: [
                  {
                    content: editPrompt,
                    role: 'user',
                  },
                ],
              };
            }

            if (toolName === 'generate') {
              const generatePrompt = getGeneratePrompt(editor, {
                messages: messagesRaw,
              });

              return {
                ...step,
                activeTools: [],
                messages: [
                  {
                    content: generatePrompt,
                    role: 'user',
                  },
                ],
                model: gatewayProvider(model || 'openai/gpt-4o-mini'),
              };
            }
          },
        });

        writer.merge(textStream.toUIMessageStream({ sendFinish: false }));
      },
    });

    return createUIMessageStreamResponse({ stream }).then((response) => {
      // Copy headers to Express response
      response.headers.forEach((value, key) => {
        res.setHeader(key, value);
      });
      res.status(response.status);

      // Pipe the response body
      if (response.body) {
        response.body.pipeTo(
          new WritableStream({
            write(chunk) {
              res.write(chunk);
            },
            close() {
              res.end();
            },
          })
        );
      } else {
        res.end();
      }
    });
  } catch (error) {
    console.error('AI Command Error:', error);
    return res.status(500).json({ error: 'Failed to process AI request' });
  }
});

const getCommentTool = (editor, { messagesRaw, model, writer }) =>
  tool({
    description: 'Comment on the content',
    inputSchema: z.object({}),
    execute: async () => {
      const { elementStream } = streamObject({
        model,
        output: 'array',
        prompt: getCommentPrompt(editor, {
          messages: messagesRaw,
        }),
        schema: z
          .object({
            blockId: z
              .string()
              .describe(
                'The id of the starting block. If the comment spans multiple blocks, use the id of the first block.'
              ),
            comment: z
              .string()
              .describe('A brief comment or explanation for this fragment.'),
            content: z
              .string()
              .describe(
                String.raw`The original document fragment to be commented on.It can be the entire block, a small part within a block, or span multiple blocks. If spanning multiple blocks, separate them with two \\n\\n.`
              ),
          })
          .describe('A single comment'),
      });

      for await (const comment of elementStream) {
        const commentDataId = nanoid();
        writer.write({
          id: commentDataId,
          data: {
            comment,
            status: 'streaming',
          },
          type: 'data-comment',
        });
      }

      writer.write({
        id: nanoid(),
        data: {
          comment: null,
          status: 'finished',
        },
        type: 'data-comment',
      });
    },
  });

export default router;
