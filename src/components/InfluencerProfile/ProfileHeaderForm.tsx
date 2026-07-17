import { FaCamera } from "react-icons/fa";
import API_BASE_URL from "../../services/api";

import {
  uploadProfileImage,
  uploadCoverImage,
} from "../../services/influencerService";

interface Props {
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProfileHeaderForm({
  profile,
  setProfile,
}: Props) {
  async function changeProfileImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files?.length) return;

    try {
      const file = e.target.files[0];

      const data = await uploadProfileImage(file);

      setProfile((prev: any) => ({
        ...prev,
        profile_image: data.profile_image,
      }));
    } catch {
      alert("Failed to upload profile image.");
    }
  }

  async function changeCoverImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files?.length) return;

    try {
      const file = e.target.files[0];

      const data = await uploadCoverImage(file);

      setProfile((prev: any) => ({
        ...prev,
        cover_image: data.cover_image,
      }));
    } catch {
      alert("Failed to upload cover image.");
    }
  }

  const profileImage = profile?.profile_image
    ? `${API_BASE_URL}${profile.profile_image}`
    : "https://i.pravatar.cc/300";

  const coverImage = profile?.cover_image
    ? `${API_BASE_URL}${profile.cover_image}`
    : "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200";

  return (
    <div className="bg-white rounded-3xl shadow-lg border overflow-hidden mb-8">
      {/* Cover */}
      <div className="relative">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-72 object-cover"
        />

        <label className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-gray-100 transition">
          <FaCamera />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={changeCoverImage}
          />
        </label>
      </div>

      {/* Avatar */}
      <div className="px-8">
        <div className="relative -mt-20 w-fit">
          <img
            src={profileImage}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-xl bg-white"
          />

          <label className="absolute bottom-3 right-3 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition">
            <FaCamera />

            <input
              type="file"
              hidden
              accept="image/*"
              onChange={changeProfileImage}
            />
          </label>
        </div>
      </div>

      {/* Details */}
      <div className="px-8 py-8 space-y-6">
        <input
          value={profile.name || ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              name: e.target.value,
            })
          }
          placeholder="Full Name"
          className="w-full border rounded-xl p-3"
        />

        <div className="grid md:grid-cols-2 gap-5">
          <input
            value={profile.niche || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                niche: e.target.value,
              })
            }
            placeholder="Content Niche"
            className="border rounded-xl p-3"
          />

          <input
            value={profile.location || ""}
            onChange={(e) =>
              setProfile({
                ...profile,
                location: e.target.value,
              })
            }
            placeholder="Location"
            className="border rounded-xl p-3"
          />
        </div>
      </div>
    </div>
  );
}