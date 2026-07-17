import { useRef, useState } from "react";
import {
  uploadBrandCover,
  uploadBrandLogo,
} from "../../services/brandService";
import API_BASE_URL from "../../services/api";

type Props = {
  companyName: string;
  industry: string;
  logo?: string | null;
  cover?: string | null;
  phone?: string;
  email?: string;
  location?: string;
};

export default function ProfileHeader({
  companyName,
  industry,
  logo,
  cover,
  phone,
  email,
  location,
}: Props) {
  const [showLogo, setShowLogo] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const [logoUrl, setLogoUrl] = useState(logo || "");
  const [coverUrl, setCoverUrl] = useState(cover || "");

  const logoInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const defaultLogo = "https://i.pravatar.cc/300?img=12";

  const defaultCover =
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600";

  const getImageUrl = (url?: string | null) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${API_BASE_URL}${url}`;
  };

  const handleLogoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const data = await uploadBrandLogo(file);

      setLogoUrl(data.logo_url);

      alert("Logo updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to upload logo");
    }

    setShowMenu(false);
  };

  const handleCoverUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const data = await uploadBrandCover(file);

      setCoverUrl(data.cover_url);

      alert("Cover updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to upload cover");
    }

    setShowMenu(false);
  };

  return (
    <>
      {/* Hidden Inputs */}
      <input
        ref={logoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleLogoUpload}
      />

      <input
        ref={coverInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCoverUpload}
      />

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {/* Cover */}
        <div className="relative h-72">
          <img
            src={getImageUrl(coverUrl) || defaultCover}
            alt="Cover"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
            >
              Edit ▼
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border z-50">
                <button
                  className="w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  ✏ Edit Details
                </button>

                <button
                  onClick={() => coverInputRef.current?.click()}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  🖼 Change Cover Photo
                </button>

                <button
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100"
                >
                  📷 Change Profile Picture
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Header */}
        <div className="relative px-8 pb-8">
          <div className="-mt-16">
            <img
              src={getImageUrl(logoUrl) || defaultLogo}
              alt={companyName}
              onClick={() => setShowLogo(true)}
              onError={(e) => {
                e.currentTarget.src = defaultLogo;
              }}
              className="w-32 h-32 rounded-full border-4 border-white object-cover cursor-pointer shadow-lg"
            />
          </div>

          <div className="mt-4">
            <h1 className="text-4xl font-bold">{companyName}</h1>

            <p className="text-gray-500 text-lg mt-2">
              {industry}
            </p>

            <div className="flex flex-wrap gap-6 mt-5 text-gray-600">
              {location && <div>📍 {location}</div>}
              {phone && <div>📞 {phone}</div>}
              {email && <div>✉ {email}</div>}
            </div>
          </div>
        </div>
      </div>

      {showLogo && (
        <div
          onClick={() => setShowLogo(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <img
            src={getImageUrl(logoUrl) || defaultLogo}
            className="max-w-[80vw] max-h-[80vh] rounded-xl"
            alt="Logo"
          />
        </div>
      )}
    </>
  );
}