import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../services/api";
import {
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTags,
  FaEnvelope,
} from "react-icons/fa";

interface Props {
  profile: any;
}

export default function HeroSection({
  profile,
}: Props) {
  const navigate = useNavigate();

  return (
    <>
      {/* Cover */}
      <div className="relative h-[320px] rounded-3xl overflow-hidden shadow-lg">

        <img
          src={
            profile.cover_image
              ? `${API_BASE_URL}${profile.cover_image}`
              : "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600"
          }
          alt="Cover"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

      </div>

      {/* Hero */}

      <div className="relative px-10">

        <div className="-mt-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          <div className="flex items-end gap-8">

            <img
              src={
                profile.profile_image
                  ? `${API_BASE_URL}${profile.profile_image}`
                  : "https://i.pravatar.cc/250"
              }
              alt="Profile"
              className="w-48 h-48 rounded-full border-8 border-white object-cover shadow-2xl"
            />

            <div className="pb-5">

              <div className="flex items-center gap-3">

                <h1 className="text-4xl font-bold">
                  {profile.name}
                </h1>

                <FaCheckCircle
                  className="text-blue-600"
                  size={24}
                />

              </div>

              <p className="text-xl font-medium text-indigo-600 mt-2">
                {profile.niche || "Influencer"}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">

                <span className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full">

                  <FaMapMarkerAlt />

                  {profile.location || "Unknown"}

                </span>

                <span className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full">

                  <FaTags />

                  {profile.categories || "Creator"}

                </span>

              </div>

            </div>

          </div>

          <button
            onClick={() =>
              navigate(`/dashboard/messages/${profile.user_id}`)
            }
            className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition"
          >
            <FaEnvelope />

            Message Creator
          </button>

        </div>

      </div>
    </>
  );
}