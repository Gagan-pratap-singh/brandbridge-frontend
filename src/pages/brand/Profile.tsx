import { useEffect, useState } from "react";

interface BrandProfile {
  company_name: string;
  industry: string;
  website: string;
  logo_url: string;
  description: string;
  location: string;
  instagram_url: string;
  linkedin_url: string;
  twitter_url: string;
  company_size: string;
}

const API_BASE_URL = "http://127.0.0.1:8000";

export default function Profile() {
  const [profile, setProfile] =
    useState<BrandProfile>({
      company_name: "",
      industry: "",
      website: "",
      logo_url: "",
      description: "",
      location: "",
      instagram_url: "",
      linkedin_url: "",
      twitter_url: "",
      company_size: "",
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const token =
        localStorage.getItem("token");

      const res = await fetch(
        `${API_BASE_URL}/brands/profile/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();

      setProfile({
        company_name:
          data.company_name || "",
        industry:
          data.industry || "",
        website:
          data.website || "",
        logo_url:
          data.logo_url || "",
        description:
          data.description || "",
        location:
          data.location || "",
        instagram_url:
          data.instagram_url || "",
        linkedin_url:
          data.linkedin_url || "",
        twitter_url:
          data.twitter_url || "",
        company_size:
          data.company_size || "",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function saveProfile() {
    try {
      const token =
        localStorage.getItem("token");

      const res = await fetch(
        `${API_BASE_URL}/brands/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profile),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      alert(
        "Profile updated successfully!"
      );
    } catch {
      alert(
        "Failed to update profile"
      );
    }
  }

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Brand Profile
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border p-8">

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 font-medium">
              Company Name
            </label>

            <input
              className="w-full border rounded-xl p-3"
              value={profile.company_name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  company_name:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Industry
            </label>

            <input
              className="w-full border rounded-xl p-3"
              value={profile.industry}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  industry:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Website
            </label>

            <input
              className="w-full border rounded-xl p-3"
              value={profile.website}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  website:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Logo URL
            </label>

            <input
              className="w-full border rounded-xl p-3"
              value={profile.logo_url}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  logo_url:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Location
            </label>

            <input
              className="w-full border rounded-xl p-3"
              value={profile.location}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  location:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Company Size
            </label>

            <input
              className="w-full border rounded-xl p-3"
              value={profile.company_size}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  company_size:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Instagram
            </label>

            <input
              className="w-full border rounded-xl p-3"
              value={
                profile.instagram_url
              }
              onChange={(e) =>
                setProfile({
                  ...profile,
                  instagram_url:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              LinkedIn
            </label>

            <input
              className="w-full border rounded-xl p-3"
              value={
                profile.linkedin_url
              }
              onChange={(e) =>
                setProfile({
                  ...profile,
                  linkedin_url:
                    e.target.value,
                })
              }
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-2 font-medium">
              Twitter
            </label>

            <input
              className="w-full border rounded-xl p-3"
              value={
                profile.twitter_url
              }
              onChange={(e) =>
                setProfile({
                  ...profile,
                  twitter_url:
                    e.target.value,
                })
              }
            />
          </div>

        </div>

        <div className="mt-6">
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows={5}
            className="w-full border rounded-xl p-3"
            value={profile.description}
            onChange={(e) =>
              setProfile({
                ...profile,
                description:
                  e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={saveProfile}
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
}