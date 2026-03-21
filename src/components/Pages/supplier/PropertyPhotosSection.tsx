import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import type { SupplierMediaItem } from "../../../api/suppliers";
import { uploadSupplierPropertyImages } from "../../../api/suppliers";
import { resolveMediaUrl } from "../../../utils/mediaUrl";

const MAX_PHOTOS = 10;

type Props = {
  token: string;
  media: SupplierMediaItem[];
  onChange: (next: SupplierMediaItem[]) => void;
  /** Extra line for category-specific tips (simple English). */
  extraHint?: string;
};

const PropertyPhotosSection = ({ token, media, onChange, extraHint }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    const remaining = MAX_PHOTOS - media.length;
    if (remaining <= 0) {
      setError(`You can add up to ${MAX_PHOTOS} photos.`);
      return;
    }
    const slice = Array.from(files).slice(0, remaining);
    setError(null);
    setUploading(true);
    try {
      const uploaded = await uploadSupplierPropertyImages(token, slice);
      const merged = [...media, ...uploaded].map((m, i) => ({
        ...m,
        isPrimary: i === 0,
      }));
      onChange(merged);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (index: number) => {
    const next = media.filter((_, i) => i !== index).map((m, i) => ({
      ...m,
      isPrimary: i === 0,
    }));
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-slate-800">Photos (optional)</p>
      <p className="text-xs text-slate-500">
        JPEG, PNG or WebP, up to 5MB each. Up to {MAX_PHOTOS} images. First image is used as the
        primary preview when live.
      </p>
      {extraHint ? (
        <p className="text-xs text-slate-600 leading-relaxed">{extraHint}</p>
      ) : null}
      {error ? (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
          {error}
        </div>
      ) : null}
      <div className="flex flex-wrap gap-3">
        {media.map((m, i) => (
          <div
            key={`${m.url}-${i}`}
            className="relative w-24 h-24 rounded-lg border border-slate-200 overflow-hidden bg-slate-100 shrink-0"
          >
            <img
              src={resolveMediaUrl(m.url)}
              alt=""
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              className="absolute top-1 right-1 p-1 rounded bg-black/50 text-white hover:bg-black/70"
              aria-label="Remove photo"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            {i === 0 ? (
              <span className="absolute bottom-1 left-1 text-[10px] font-medium bg-primary text-white px-1.5 py-0.5 rounded">
                Primary
              </span>
            ) : null}
          </div>
        ))}
        {media.length < MAX_PHOTOS ? (
          <button
            type="button"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
            className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 hover:border-primary hover:text-primary transition-colors disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <ImagePlus className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">Add</span>
              </>
            )}
          </button>
        ) : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/jpg"
        multiple
        className="hidden"
        onChange={(e) => void pickFiles(e.target.files)}
      />
    </div>
  );
};

export default PropertyPhotosSection;
