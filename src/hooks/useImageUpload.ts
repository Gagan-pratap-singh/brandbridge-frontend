import { useState, useRef, useCallback, useEffect } from 'react';

interface UseImageUploadOptions {
  maxSizeMB?: number;
  onUpload?: (file: File) => Promise<string> | void; // returns final URL if uploading to backend
}

export function useImageUpload({ maxSizeMB = 5, onUpload }: UseImageUploadOptions = {}) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  // Clean up the blob URL when it's replaced or the component unmounts
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setError(null);

      if (!file.type.startsWith('image/')) {
        setError('Please choose an image file.');
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`Image must be under ${maxSizeMB}MB.`);
        return;
      }

      // Instant local preview from the file the user picked
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      const localUrl = URL.createObjectURL(file);
      objectUrlRef.current = localUrl;
      setPreview(localUrl);

      if (onUpload) {
        try {
          setUploading(true);
          const finalUrl = await onUpload(file);
          if (typeof finalUrl === 'string') setPreview(finalUrl);
        } catch (err) {
          setError('Upload failed. Please try again.');
        } finally {
          setUploading(false);
        }
      }

      // allow re-selecting the same file later
      e.target.value = '';
    },
    [maxSizeMB, onUpload]
  );

  return { preview, setPreview, uploading, error, inputRef, openFilePicker, handleFileChange };
}