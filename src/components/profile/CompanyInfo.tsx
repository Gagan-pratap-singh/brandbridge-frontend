import { useEffect, useState } from "react";
import {
  getBrandProfile,
  createBrandProfile,
  updateBrandProfile,
} from "../../services/brandService";

export default function CompanyInfo() {
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);

  const [form, setForm] = useState({
    company_name: "",
    website: "",
    industry: "",
    company_size: "",
    location: "",
    description: "",
    logo_url: "",
    instagram_url: "",
    linkedin_url: "",
    twitter_url: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getBrandProfile();

      setForm({
        company_name: data.company_name || "",
        website: data.website || "",
        industry: data.industry || "",
        company_size: data.company_size || "",
        location: data.location || "",
        description: data.description || "",
        logo_url: data.logo_url || "",
        instagram_url: data.instagram_url || "",
        linkedin_url: data.linkedin_url || "",
        twitter_url: data.twitter_url || "",
      });

      setProfileExists(true);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setProfileExists(false);
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      if (profileExists) {
        await updateBrandProfile(form);
        alert("Profile updated successfully.");
      } else {
        await createBrandProfile(form);
        setProfileExists(true);
        alert("Profile created successfully.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save profile.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8 mt-8">
      <h2 className="text-2xl font-bold mb-8">
        Company Information
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="font-medium">Company Name</label>

          <input
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="font-medium">Website</label>

          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="font-medium">Industry</label>

          <input
            name="industry"
            value={form.industry}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="font-medium">Company Size</label>

          <input
            name="company_size"
            value={form.company_size}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="font-medium">Location</label>

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="font-medium">Logo URL</label>

          <input
            name="logo_url"
            value={form.logo_url}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="font-medium">
          Company Description
        </label>

        <textarea
          rows={5}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full mt-2 border rounded-xl p-3 resize-none"
        />
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div>
          <label className="font-medium">Instagram</label>

          <input
            name="instagram_url"
            value={form.instagram_url}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="font-medium">LinkedIn</label>

          <input
            name="linkedin_url"
            value={form.linkedin_url}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>

        <div>
          <label className="font-medium">Twitter / X</label>

          <input
            name="twitter_url"
            value={form.twitter_url}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          {profileExists ? "Update Profile" : "Create Profile"}
        </button>
      </div>
    </div>
  );
}