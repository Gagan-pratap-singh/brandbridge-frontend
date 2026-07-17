import { useState } from "react";
import {
  FaYoutube,
  FaInstagram,
  FaGlobe,
  FaFilePdf,
} from "react-icons/fa";

import { updateProfile } from "../../services/influencerService";

type Props = {
  profile: any;
};

export default function Portfolio({ profile }: Props) {
  const [form, setForm] = useState({
    featured_video: profile?.featured_video || "",
    instagram_reel: profile?.instagram_reel || "",
    portfolio: profile?.portfolio || "",
    media_kit: profile?.media_kit || "",
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

      alert("Portfolio Updated Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update portfolio");
    } finally {
      setSaving(false);
    }
  }

  const input =
    "w-full border rounded-xl px-4 py-3 mt-2 focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="bg-white rounded-2xl shadow border p-8">

      <h2 className="text-2xl font-bold mb-8">
        Portfolio
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <div>

          <label className="flex items-center gap-2 font-medium">
            <FaYoutube className="text-red-600" />
            Featured YouTube Video
          </label>

          <input
            name="featured_video"
            value={form.featured_video}
            onChange={handleChange}
            className={input}
            placeholder="https://youtube.com/..."
          />

        </div>

        <div>

          <label className="flex items-center gap-2 font-medium">
            <FaInstagram className="text-pink-600" />
            Best Instagram Reel
          </label>

          <input
            name="instagram_reel"
            value={form.instagram_reel}
            onChange={handleChange}
            className={input}
            placeholder="https://instagram.com/..."
          />

        </div>

        <div>

          <label className="flex items-center gap-2 font-medium">
            <FaGlobe className="text-indigo-600" />
            Portfolio Website
          </label>

          <input
            name="portfolio"
            value={form.portfolio}
            onChange={handleChange}
            className={input}
            placeholder="https://yourportfolio.com"
          />

        </div>

        <div>

          <label className="flex items-center gap-2 font-medium">
            <FaFilePdf className="text-red-500" />
            Media Kit Link
          </label>

          <input
            name="media_kit"
            value={form.media_kit}
            onChange={handleChange}
            className={input}
            placeholder="Google Drive / Dropbox PDF"
          />

        </div>

        <div className="flex justify-end">

          <button
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
          >
            {saving ? "Saving..." : "Save Portfolio"}
          </button>

        </div>

      </form>

    </div>
  );
}