import { useEffect, useState } from "react";

import {
  getMyProfile,
  createProfile,
  updateProfile,
} from "../../services/influencer";

export default function Profile() {
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    bio: "",
    niche: "",
    followers: 0,
    location: "",
    engagement_rate: 0,
    instagram_url: "",
    youtube_url: "",
    linkedin_url: "",
    twitter_url: "",
    website: "",
    profile_image: "",
  });

  const [profileExists, setProfileExists] =
    useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getMyProfile();

      setForm({
        bio: data.bio || "",
        niche: data.niche || "",
        followers: data.followers || 0,
        location: data.location || "",
        engagement_rate:
          data.engagement_rate || 0,
        instagram_url:
          data.instagram_url || "",
        youtube_url:
          data.youtube_url || "",
        linkedin_url:
          data.linkedin_url || "",
        twitter_url:
          data.twitter_url || "",
        website: data.website || "",
        profile_image:
          data.profile_image || "",
      });

      setProfileExists(true);
    } catch {
      setProfileExists(false);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "followers" ||
        name === "engagement_rate"
          ? Number(value)
          : value,
    }));
  }

  async function handleSave() {
    try {
      if (profileExists) {
        await updateProfile(form);
      } else {
        await createProfile(form);
        setProfileExists(true);
      }

      alert("Profile saved!");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile");
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your influencer profile and social presence.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="flex items-center gap-8">

          <img
            src={
              form.profile_image ||
              "https://i.pravatar.cc/150"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />

          <div>
            <h2 className="text-3xl font-bold">
              Influencer Profile
            </h2>

            <p className="text-gray-500 mt-2">
              {form.location ||
                "No location added"}
            </p>

            <div className="flex gap-3 mt-4">

              <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full">
                {form.followers.toLocaleString()} Followers
              </span>

              <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full">
                {form.engagement_rate}% Engagement
              </span>

            </div>
          </div>

        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">

        <h2 className="text-2xl font-bold mb-6">
          Profile Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label>Profile Image</label>

            <input
              name="profile_image"
              value={form.profile_image}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="Image URL"
            />
          </div>

          <div>
            <label>Location</label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>Niche</label>

            <input
              name="niche"
              value={form.niche}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>Followers</label>

            <input
              type="number"
              name="followers"
              value={form.followers}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>Engagement Rate</label>

            <input
              type="number"
              step="0.1"
              name="engagement_rate"
              value={form.engagement_rate}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>Website</label>

            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>Instagram</label>

            <input
              name="instagram_url"
              value={form.instagram_url}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>YouTube</label>

            <input
              name="youtube_url"
              value={form.youtube_url}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>LinkedIn</label>

            <input
              name="linkedin_url"
              value={form.linkedin_url}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>Twitter</label>

            <input
              name="twitter_url"
              value={form.twitter_url}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label>Bio</label>

            <textarea
              rows={5}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

        </div>

        <button
          onClick={handleSave}
          className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700"
        >
          Save Profile
        </button>

      </div>
    </div>
  );
}