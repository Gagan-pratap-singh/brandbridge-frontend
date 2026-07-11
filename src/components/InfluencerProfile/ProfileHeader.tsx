import { useRef } from "react";
import API_BASE_URL from "../../services/api";

type Props = {
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
};

export default function ProfileHeader({
  profile,
  setProfile,
}: Props) {
  const profileInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  const uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile_image" | "cover_image"
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE_URL}/upload/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      setProfile((prev: any) => ({
        ...prev,
        [type]: data.url,
      }));
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow border overflow-hidden">

      {/* ================= Cover ================= */}

      <div className="relative h-72">

        <img
          src={
            profile.cover_image
              ? `${API_BASE_URL}${profile.cover_image}`
              : "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600"
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />

        <button
          onClick={() => coverInput.current?.click()}
          className="absolute bottom-6 right-6 bg-black/60 hover:bg-black/80 text-white px-5 py-2 rounded-xl transition"
        >
          📷 Change Cover
        </button>

        <input
          ref={coverInput}
          hidden
          type="file"
          accept="image/*"
          onChange={(e) => uploadImage(e, "cover_image")}
        />

      </div>

      {/* ================= Profile ================= */}

      <div className="px-10 pb-10">

        <div className="flex flex-col lg:flex-row lg:justify-between">

          {/* Left */}

          <div className="flex flex-col lg:flex-row gap-8 -mt-20">

            {/* Avatar */}

            <div className="relative w-fit">

              <img
                src={
                  profile.profile_image
                    ? `${API_BASE_URL}${profile.profile_image}`
                    : "https://i.pravatar.cc/300"
                }
                alt="Profile"
                className="w-40 h-40 rounded-full border-8 border-white object-cover shadow-lg"
              />

              <button
                onClick={() => profileInput.current?.click()}
                className="absolute bottom-2 right-2 bg-white rounded-full shadow-lg p-3 hover:scale-105 transition"
              >
                📷
              </button>

              <input
                ref={profileInput}
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => uploadImage(e, "profile_image")}
              />

            </div>

            {/* Information */}

            <div className="pt-8">

              <h1 className="text-4xl font-bold flex items-center gap-2">

                {localStorage.getItem("user_name") || "Influencer"}

                <span className="text-blue-600 text-2xl">
                  ✔
                </span>

              </h1>

              <h2 className="text-xl font-semibold text-indigo-600 mt-2">
                {profile.niche || "Content Creator"}
              </h2>

              <div className="flex flex-wrap gap-5 mt-4 text-gray-600 text-sm">

                <span>
                  📍 {profile.location || "No Location"}
                </span>

                <span>
                  🌐 {profile.website || "No Website"}
                </span>

                <span>
                  💼 {profile.portfolio_url || "No Portfolio"}
                </span>

              </div>

              {/* Categories */}

              <div className="flex flex-wrap gap-2 mt-5">

                {(profile.categories || "")
                  .split(",")
                  .filter((cat: string) => cat.trim() !== "")
                  .map((cat: string, index: number) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm font-medium"
                    >
                      {cat.trim()}
                    </span>
                  ))}

              </div>

            </div>

          </div>

          {/* Button */}

          <div className="mt-8 lg:mt-10">

            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-xl font-medium transition"
            >
              Edit Profile
            </button>

          </div>

        </div>

        {/* ================= Stats ================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <h3 className="text-3xl font-bold text-indigo-700">
              {profile.followers
                ? Number(profile.followers).toLocaleString()
                : "0"}
            </h3>

            <p className="text-gray-600 mt-2">
              Followers
            </p>

          </div>

          <div className="bg-green-50 rounded-2xl p-6 text-center">

            <h3 className="text-3xl font-bold text-green-600">
              {profile.engagement_rate || 0}%
            </h3>

            <p className="text-gray-600 mt-2">
              Engagement Rate
            </p>

          </div>

          <div className="bg-purple-50 rounded-2xl p-6 text-center">

            <h3 className="text-3xl font-bold text-purple-600">
              {profile.average_views
                ? Number(profile.average_views).toLocaleString()
                : "0"}
            </h3>

            <p className="text-gray-600 mt-2">
              Average Views
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}