import { useEffect, useState } from "react";

import {
  getMyProfile,
  createProfile,
  updateProfile,
} from "../../services/influencerService";

const emptyForm = {
  bio: "",
  profile_image: "",
  cover_image: "",
  location: "",

  niche: "",
  categories: "",
  languages: "",
  content_type: "",

  instagram_url: "",
  youtube_url: "",
  twitter_url: "",
  linkedin_url: "",
  website: "",

  followers: 0,
  engagement_rate: 0,
  average_views: 0,

  portfolio_url: "",
  media_kit_url: "",
  previous_collaborations: "",
  pricing: "",
};

const NUMBER_FIELDS = ["followers", "engagement_rate", "average_views"];

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getMyProfile();

      setForm({
        bio: data.bio || "",
        profile_image: data.profile_image || "",
        cover_image: data.cover_image || "",
        location: data.location || "",

        niche: data.niche || "",
        categories: data.categories || "",
        languages: data.languages || "",
        content_type: data.content_type || "",

        instagram_url: data.instagram_url || "",
        youtube_url: data.youtube_url || "",
        twitter_url: data.twitter_url || "",
        linkedin_url: data.linkedin_url || "",
        website: data.website || "",

        followers: data.followers || 0,
        engagement_rate: data.engagement_rate || 0,
        average_views: data.average_views || 0,

        portfolio_url: data.portfolio_url || "",
        media_kit_url: data.media_kit_url || "",
        previous_collaborations: data.previous_collaborations || "",
        pricing: data.pricing || "",
      });

      setProfileExists(true);
    } catch {
      setProfileExists(false);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: NUMBER_FIELDS.includes(name) ? Number(value) : value,
    }));
  }

  async function handleSave() {
    setSaving(true);

    try {
      if (profileExists) {
        await updateProfile(form);
      } else {
        await createProfile(form);
        setProfileExists(true);
      }

      alert("Profile saved!");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to save profile");
    } finally {
      setSaving(false);
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

      {/* Cover + Avatar Card */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div
          className="h-40 w-full bg-gradient-to-r from-indigo-500 to-purple-500 bg-cover bg-center"
          style={
            form.cover_image
              ? { backgroundImage: `url(${form.cover_image})` }
              : undefined
          }
        />

        <div className="p-8 pt-0">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-14">

            <img
              src={
                form.profile_image ||
                "https://i.pravatar.cc/150"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />

            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                Influencer Profile
              </h2>

              <p className="text-gray-500 mt-1">
                {form.location || "No location added"}
                {form.niche ? ` • ${form.niche}` : ""}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium">
                  {form.followers.toLocaleString()} Followers
                </span>

                <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                  {form.engagement_rate}% Engagement
                </span>

                <span className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium">
                  {form.average_views.toLocaleString()} Avg. Views
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-6">
          Basic Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-medium">Profile Image URL</label>
            <input
              name="profile_image"
              value={form.profile_image}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="font-medium">Cover Image URL</label>
            <input
              name="cover_image"
              value={form.cover_image}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="font-medium">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="font-medium">Website</label>
            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="https://..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">Bio</label>
            <textarea
              rows={5}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="Tell brands about yourself..."
            />
          </div>

        </div>
      </div>

      {/* Creator Information */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-6">
          Creator Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-medium">Niche</label>
            <input
              name="niche"
              value={form.niche}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="e.g. Fitness, Beauty, Tech"
            />
          </div>

          <div>
            <label className="font-medium">Categories</label>
            <input
              name="categories"
              value={form.categories}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="Comma separated, e.g. Fashion, Lifestyle"
            />
          </div>

          <div>
            <label className="font-medium">Languages</label>
            <input
              name="languages"
              value={form.languages}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="e.g. English, Hindi"
            />
          </div>

          <div>
            <label className="font-medium">Content Type</label>
            <input
              name="content_type"
              value={form.content_type}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="e.g. Reels, Vlogs, Blogs"
            />
          </div>

        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-6">
          Social Links
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-medium">Instagram</label>
            <input
              name="instagram_url"
              value={form.instagram_url}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="https://instagram.com/..."
            />
          </div>

          <div>
            <label className="font-medium">YouTube</label>
            <input
              name="youtube_url"
              value={form.youtube_url}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="https://youtube.com/..."
            />
          </div>

          <div>
            <label className="font-medium">LinkedIn</label>
            <input
              name="linkedin_url"
              value={form.linkedin_url}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div>
            <label className="font-medium">Twitter</label>
            <input
              name="twitter_url"
              value={form.twitter_url}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="https://twitter.com/..."
            />
          </div>

        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-6">
          Statistics
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div>
            <label className="font-medium">Followers</label>
            <input
              type="number"
              name="followers"
              value={form.followers}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="font-medium">Engagement Rate (%)</label>
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
            <label className="font-medium">Average Views</label>
            <input
              type="number"
              name="average_views"
              value={form.average_views}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-6">
          Professional Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-medium">Portfolio URL</label>
            <input
              name="portfolio_url"
              value={form.portfolio_url}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="font-medium">Media Kit URL</label>
            <input
              name="media_kit_url"
              value={form.media_kit_url}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="font-medium">Pricing</label>
            <input
              name="pricing"
              value={form.pricing}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="e.g. Starting at $200 per post"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">Previous Collaborations</label>
            <textarea
              rows={4}
              name="previous_collaborations"
              value={form.previous_collaborations}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
              placeholder="Brands you've worked with..."
            />
          </div>

        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-8 bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>

      </div>
    </div>
  );
}