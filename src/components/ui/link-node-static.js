import { getLinkAttributes } from '@platejs/link';
import { SlateElement } from 'platejs/static';
export function LinkElementStatic(props) {
  return (
    <SlateElement
      {...props}
      as="a"
      attributes={{
        ...props.attributes,
        ...getLinkAttributes(props.editor, props.element),
      }}
      className="font-medium text-primary underline decoration-primary underline-offset-4"
    >
      {props.children}
    </SlateElement>
  );
}
