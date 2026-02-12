import { generateReactHelpers } from '@uploadthing/react';
import * as React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function useUploadFile({
  onUploadComplete,
  onUploadError,
  ...props
} = {}) {
  const [uploadedFile, setUploadedFile] = React.useState();
  const [uploadingFile, setUploadingFile] = React.useState();
  const [progress, setProgress] = React.useState(0);
  const [isUploading, setIsUploading] = React.useState(false);
  async function uploadThing(file) {
    const base64 = await fileToBase64(file);

    const mockUploadedFile = {
      key: 'mock-key-0',
      appUrl: `https://mock-app-url.com/${file.name}`,
      name: file.name,
      size: file.size,
      type: file.type,
      url: base64,
    };
    setUploadedFile(mockUploadedFile);

    // setIsUploading(true);
    // setUploadingFile(file);
    // try {
    //   const res = await uploadFiles('editorUploader', {
    //     ...props,
    //     files: [file],
    //     onUploadProgress: ({ progress }) => {
    //       setProgress(Math.min(progress, 100));
    //     },
    //   });
    //   setUploadedFile(res[0]);
    //   onUploadComplete?.(res[0]);
    //   return uploadedFile;
    // } catch (error) {
    //   const errorMessage = getErrorMessage(error);
    //   const message =
    //     errorMessage.length > 0
    //       ? errorMessage
    //       : 'Something went wrong, please try again later.';
    //   toast.error(message);
    //   onUploadError?.(error);

    //   // Mock upload for unauthenticated users
    //   // toast.info('User not logged in. Mocking upload process.');

    //   const mockUploadedFile = {
    //     key: 'mock-key-0',
    //     appUrl: `https://mock-app-url.com/${file.name}`,
    //     name: file.name,
    //     size: file.size,
    //     type: file.type,
    //     url: URL.createObjectURL(file),
    //   };
    //   // Simulate upload progress
    //   let progress = 0;
    //   const simulateProgress = async () => {
    //     while (progress < 100) {
    //       await new Promise((resolve) => setTimeout(resolve, 50));
    //       progress += 2;
    //       setProgress(Math.min(progress, 100));
    //     }
    //   };
    //   await simulateProgress();
    //   setUploadedFile(mockUploadedFile);
    //   return mockUploadedFile;
    // } finally {
    //   setProgress(0);
    //   setIsUploading(false);
    //   setUploadingFile(undefined);
    // }
  }
  return {
    isUploading,
    progress,
    uploadedFile,
    uploadFile: uploadThing,
    uploadingFile,
  };
}
export const { uploadFiles, useUploadThing } = generateReactHelpers();
export function getErrorMessage(err) {
  const unknownError = 'Something went wrong, please try again later.';
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => issue.message);
    return errors.join('\n');
  }
  if (err instanceof Error) {
    return err.message;
  }
  return unknownError;
}
export function showErrorToast(err) {
  const errorMessage = getErrorMessage(err);
  return toast.error(errorMessage);
}
