import { useState } from "react";
import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";

import { updateProfile } from "../../services/influencerService";

type Props = {
  profile: any;
};

export default function SocialMedia({ profile }: Props) {
  const [form, setForm] = useState({
    instagram_url: profile?.instagram_url || "",
    youtube_url: profile?.youtube_url || "",
    linkedin_url: profile?.linkedin_url || "",
    twitter_url: profile?.twitter_url || "",
    website: profile?.website || "",
  });

  const [saving, setSaving] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProfile(form);

      alert("Social links updated.");
    } catch (err) {
      console.error(err);
      alert("Failed to update.");
    } finally {
      setSaving(false);
    }
  }

  const inputStyle =
    "w-full border rounded-xl px-4 py-3 mt-2";

  return (
    <div className="bg-white rounded-2xl shadow border p-8">
      <h2 className="text-2xl font-bold mb-8">
        Social Media
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="flex items-center gap-2 font-medium">
              <FaInstagram className="text-pink-500" />
              Instagram
            </label>

            <input
              name="instagram_url"
              value={form.instagram_url}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 font-medium">
              <FaYoutube className="text-red-600" />
              YouTube
            </label>

            <input
              name="youtube_url"
              value={form.youtube_url}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 font-medium">
              <FaLinkedin className="text-blue-600" />
              LinkedIn
            </label>

            <input
              name="linkedin_url"
              value={form.linkedin_url}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 font-medium">
              <FaTwitter className="text-sky-500" />
              Twitter / X
            </label>

            <input
              name="twitter_url"
              value={form.twitter_url}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 font-medium">
              <FaGlobe className="text-green-600" />
              Website
            </label>

            <input
              name="website"
              value={form.website}
              onChange={handleChange}
              className={inputStyle}
            />
          </div>

        </div>

        <div className="flex justify-end">
          <button
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
          >
            {saving ? "Saving..." : "Save Social Links"}
          </button>
        </div>
      </form>
    </div>
  );
}