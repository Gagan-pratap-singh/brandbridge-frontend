import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaMapMarkerAlt, FaEdit } from "react-icons/fa";

import API_BASE_URL from "../../services/api";

import {
  getMyProfile,
  createProfile,
} from "../../services/influencerService";

import AboutCard from "../../components/InfluencerProfile/AboutCard";
import CreatorInformation from "../../components/InfluencerProfile/CreatorInformation";
import SocialMedia from "../../components/InfluencerProfile/SocialMedia";
import Portfolio from "../../components/InfluencerProfile/Portfolio";
import ProfileStats from "../../components/InfluencerProfile/ProfileStats";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getMyProfile();
      setProfile(data);
    } catch {
      const data = await createProfile({});
      setProfile(data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-lg font-semibold">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="w-full max-w-none px-6 space-y-8">
      {/* ================= HEADER ================= */}
      <div className="bg-white rounded-2xl shadow overflow-hidden border">

        {/* Cover */}
        <div className="relative h-72 overflow-hidden rounded-t-2xl">
  <img
    src={
      profile?.cover_image
        ? `${API_BASE_URL}${profile.cover_image}`
        : "/default-cover.jpg"
    }
    alt="Cover"
    className="w-full h-full object-cover"
  />
</div>
        {/* Profile Section */}
<div className="relative px-10 pb-8">

  <div className="flex justify-between items-end">

    {/* Left Side */}
    <div className="flex gap-6 items-end -mt-16 relative z-20">

      {/* Profile Image */}
      <img
        src={
          profile?.profile_image
            ? `${API_BASE_URL}${profile.profile_image}`
            : "/default-avatar.png"
        }
        alt="Profile"
        className="w-40 h-40 rounded-full border-4 border-white object-cover bg-white shadow-2xl"
      />

      {/* User Details */}
      <div className="pt-20">

        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold text-gray-900">
            {profile.name || "Influencer"}
          </h1>

          <FaCheckCircle className="text-blue-500 text-xl" />
        </div>

        <div className="mt-3 inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
          {profile.niche || "Content Creator"}
        </div>

        <div className="mt-3 flex items-center gap-2 text-gray-500 text-lg">
          <FaMapMarkerAlt className="text-indigo-500" />
          <span>{profile.location || "Location"}</span>
        </div>

      </div>

    </div>

    {/* Edit Button */}
    <div className="pb-4">
      <Link
        to="/influencer/profile/edit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg"
      >
        <FaEdit />
        Edit Profile
      </Link>
    </div>

  </div>

</div>

      </div>

      {/* Statistics */}
      <ProfileStats profile={profile} />

      {/* About */}
      <AboutCard profile={profile} />

      {/* Creator Information */}
      <CreatorInformation profile={profile} />

      {/* Social Media */}
      <SocialMedia profile={profile} />

      {/* Portfolio */}
      <Portfolio profile={profile} />
    </div>
  );
}