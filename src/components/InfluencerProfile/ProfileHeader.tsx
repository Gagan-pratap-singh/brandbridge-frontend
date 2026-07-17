import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import API_BASE_URL from "../../services/api";

interface Props {
  profile: any;
}

export default function ProfileHeader({ profile }: Props) {
  const profileImage = profile?.profile_image
    ? `${API_BASE_URL}${profile.profile_image}`
    : "https://i.pravatar.cc/300";

  const coverImage = profile?.cover_image
    ? `${API_BASE_URL}${profile.cover_image}`
    : "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600";

  return (
    <div className="bg-white rounded-3xl shadow-lg border overflow-hidden">

      {/* Cover */}
      <div className="relative">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-72 object-cover"
        />

        <Link
          to="/influencer/profile/edit"
          className="absolute top-6 right-6 bg-white px-5 py-2 rounded-xl shadow hover:bg-gray-100 flex items-center gap-2 font-medium"
        >
          <FaPen />
          Edit Profile
        </Link>
      </div>

      {/* Bottom */}
      <div className="px-10 pb-8">

        <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-20">

          {/* Profile Image */}
          <img
            src={profileImage}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg bg-white"
          />

          {/* Details */}
          <div className="pb-4">

            <div className="flex items-center gap-2">

              <h1 className="text-4xl font-bold">
                {profile?.name || "Influencer"}
              </h1>

              <FaCheckCircle className="text-blue-500 text-xl" />

            </div>

            <p className="text-xl text-gray-700 mt-2">
              {profile?.niche || "Content Creator"}
            </p>

            <div className="flex items-center gap-2 text-gray-500 mt-3">
              <FaMapMarkerAlt />
              {profile?.location || "Location"}
            </div>

            {profile?.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 text-indigo-600 hover:underline"
              >
                {profile.website}
              </a>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}