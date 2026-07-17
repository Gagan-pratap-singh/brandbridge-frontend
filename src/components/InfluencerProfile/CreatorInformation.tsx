import { useState } from "react";
import { updateProfile } from "../../services/influencerService";

type Props = {
  profile: any;
};

export default function CreatorInformation({ profile }: Props) {
  const [form, setForm] = useState({
    name: profile?.name || "",
    username: profile?.username || "",
    email: profile?.email || "",
    phone: profile?.phone || "",
    location: profile?.location || "",
    category: profile?.category || "",
    niche: profile?.niche || "",
    languages: profile?.languages || "",
    experience: profile?.experience || "",
    bio: profile?.bio || "",
  });

  const [saving, setSaving] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setSaving(true);

      await updateProfile(form);

      alert("Profile Updated Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow border p-8">
      <h2 className="text-2xl font-bold mb-8">
        Creator Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="font-medium">
              Full Name
            </label>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Username
            </label>

            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Email
            </label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Phone
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Location
            </label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Category
            </label>

            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Niche
            </label>

            <input
              name="niche"
              value={form.niche}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Languages
            </label>

            <input
              name="languages"
              value={form.languages}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">
              Experience
            </label>

            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-medium">
              Bio
            </label>

            <textarea
              rows={5}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>

      </form>
    </div>
  );
}