import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API_BASE_URL from "../../services/api";
import { getInfluencer } from "../../services/influencerService";

export default function InfluencerProfile() {
  const { userId } = useParams();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

async function loadProfile() {
  if (!userId) {
    setLoading(false);
    return;
  }

  try {
    const data = await getInfluencer(Number(userId));
    setProfile(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-20 text-xl">
        Influencer not found.
      </div>
    );
  }

  const profileImage = profile.profile_image
    ? `${API_BASE_URL}${profile.profile_image}`
    : "https://i.pravatar.cc/300?img=12";

  const coverImage = profile.cover_image
    ? `${API_BASE_URL}${profile.cover_image}`
    : "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600";

  return (
    <div className="space-y-8">

      {/* Cover */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="relative h-72">

          <img
            src={coverImage}
            className="w-full h-full object-cover"
          />

          <img
            src={profileImage}
            className="absolute left-10 -bottom-16 w-36 h-36 rounded-full border-4 border-white object-cover shadow-lg"
          />

        </div>

        <div className="pt-20 px-10 pb-8">

          <h1 className="text-4xl font-bold">
            {profile.name}
          </h1>

          <p className="text-indigo-600 text-lg mt-2">
            {profile.niche}
          </p>

          <p className="text-gray-600 mt-4">
            {profile.bio || "No bio added."}
          </p>

          <div className="flex flex-wrap gap-6 mt-6 text-gray-600">

            <span>📍 {profile.location || "Not specified"}</span>

            <span>
              👥 {(profile.followers || 0).toLocaleString()} Followers
            </span>

            <span>
              ⭐ {profile.engagement_rate || 0}% Engagement
            </span>

            <span>
              ▶ {profile.average_views || 0} Avg Views
            </span>

          </div>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-2xl shadow border p-6 text-center">
          <h2 className="text-4xl font-bold text-indigo-600">
            {profile.followers || 0}
          </h2>
          <p className="mt-2 text-gray-500">
            Followers
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow border p-6 text-center">
          <h2 className="text-4xl font-bold text-green-600">
            {profile.engagement_rate || 0}%
          </h2>
          <p className="mt-2 text-gray-500">
            Engagement
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow border p-6 text-center">
          <h2 className="text-4xl font-bold text-orange-600">
            {profile.average_views || 0}
          </h2>
          <p className="mt-2 text-gray-500">
            Avg Views
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow border p-6 text-center">
          <h2 className="text-4xl font-bold text-purple-600">
            ₹{profile.pricing || 0}
          </h2>
          <p className="mt-2 text-gray-500">
            Starting Price
          </p>
        </div>

      </div>

      {/* Information */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow border p-8">

          <h2 className="text-2xl font-bold mb-6">
            Creator Information
          </h2>

          <div className="space-y-4">

            <p>
              <strong>Category:</strong>{" "}
              {profile.categories || "-"}
            </p>

            <p>
              <strong>Languages:</strong>{" "}
              {profile.languages || "-"}
            </p>

            <p>
              <strong>Content Type:</strong>{" "}
              {profile.content_type || "-"}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {profile.location || "-"}
            </p>

            <p>
              <strong>Previous Collaborations:</strong>{" "}
              {profile.previous_collaborations || "-"}
            </p>

          </div>

        </div>

        <div className="bg-white rounded-2xl shadow border p-8">

          <h2 className="text-2xl font-bold mb-6">
            Social Links
          </h2>

          <div className="space-y-4">

            {profile.instagram_url && (
              <a
                href={profile.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="block text-pink-600 hover:underline"
              >
                📷 Instagram
              </a>
            )}

            {profile.youtube_url && (
              <a
                href={profile.youtube_url}
                target="_blank"
                rel="noreferrer"
                className="block text-red-600 hover:underline"
              >
                ▶ YouTube
              </a>
            )}

            {profile.twitter_url && (
              <a
                href={profile.twitter_url}
                target="_blank"
                rel="noreferrer"
                className="block text-sky-600 hover:underline"
              >
                🐦 Twitter
              </a>
            )}

            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="block text-blue-700 hover:underline"
              >
                💼 LinkedIn
              </a>
            )}

            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className="block text-indigo-600 hover:underline"
              >
                🌐 Website
              </a>
            )}

            {profile.portfolio_url && (
              <a
                href={profile.portfolio_url}
                target="_blank"
                rel="noreferrer"
                className="block text-green-700 hover:underline"
              >
                📁 Portfolio
              </a>
            )}

            {profile.media_kit_url && (
              <a
                href={profile.media_kit_url}
                target="_blank"
                rel="noreferrer"
                className="block text-orange-700 hover:underline"
              >
                📄 Media Kit
              </a>
            )}

          </div>

        </div>

      </div>

    </div>
  );
} 