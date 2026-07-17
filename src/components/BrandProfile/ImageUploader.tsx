import { useRef, useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';

interface ImageUploadFieldProps {
  label: string;
  currentUrl: string;
  shape: 'circle' | 'banner';
  uploading: boolean;
  onFileSelected: (file: File) => void;
}

export default function ImageUploadField({
  label,
  currentUrl,
  shape,
  uploading,
  onFileSelected,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be under 5MB.');
      return;
    }

    setLocalPreview(URL.createObjectURL(file));
    onFileSelected(file);
    e.target.value = ''; // allow re-selecting the same file later
  }

  const displayUrl = localPreview || currentUrl;

  return (
    <div>
      <label className="font-medium">{label}</label>
      <div className="mt-2 flex items-center gap-4">
        {displayUrl ? (
          <img
            src={displayUrl}
            alt={label}
            className={
              shape === 'circle'
                ? 'w-20 h-20 rounded-full object-cover border'
                : 'w-32 h-20 rounded-lg object-cover border'
            }
          />
        ) : (
          <div
            className={
              shape === 'circle'
                ? 'w-20 h-20 rounded-full bg-slate-100 border flex items-center justify-center'
                : 'w-32 h-20 rounded-lg bg-slate-100 border flex items-center justify-center'
            }
          >
            <Camera className="h-5 w-5 text-slate-400" />
          </div>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium hover:bg-slate-50 disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
          {uploading ? 'Uploading…' : 'Choose from gallery'}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
}