import { useEffect, useState } from "react";
import ProfileHeaderForm from "../../components/InfluencerProfile/ProfileHeaderForm";
import {
  getMyProfile,
  updateProfile,
} from "../../services/influencerService";

export default function EditInfluencerProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<any>({
  //name: "",
  bio: "",
  location: "",
  website: "",
  niche: "",

  instagram_url: "",
  youtube_url: "",
  linkedin_url: "",
  twitter_url: "",

  followers: 0,
  engagement_rate: 0,
  avg_views: 0,
  collaborations: 0,

  portfolio_url: "",
  media_kit_url: "",

  profile_image: "",
  cover_image: "",
});

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getMyProfile();
      setProfile(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      console.log(profile);
      await updateProfile(profile);
      alert("Profile updated successfully!");
    } catch {
      alert("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">

      <ProfileHeaderForm
        profile={profile}
        setProfile={setProfile}
      />

      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="text-xl font-bold mb-5">
          About Me
        </h2>

        <textarea
          rows={5}
          value={profile.bio || ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              bio: e.target.value,
            })
          }
          className="w-full border rounded-xl p-3"
          placeholder="Tell brands about yourself..."
        />
      </div>

      {/* Creator Information */}
<div className="bg-white rounded-2xl shadow border p-6">
  <h2 className="text-xl font-bold mb-5">
    Creator Information
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    <input
      placeholder="Name"
      value={profile.name || ""}
      onChange={(e) =>
        setProfile({
          ...profile,
          name: e.target.value,
        })
      }
      className="border rounded-xl p-3"
    />

    <input
      placeholder="Location"
      value={profile.location || ""}
      onChange={(e) =>
        setProfile({
          ...profile,
          location: e.target.value,
        })
      }
      className="border rounded-xl p-3"
    />

    <input
      placeholder="Niche"
      value={profile.niche || ""}
      onChange={(e) =>
        setProfile({
          ...profile,
          niche: e.target.value,
        })
      }
      className="border rounded-xl p-3"
    />

    <input
      placeholder="Website"
      value={profile.website || ""}
      onChange={(e) =>
        setProfile({
          ...profile,
          website: e.target.value,
        })
      }
      className="border rounded-xl p-3"
    />

  </div>
</div>

{/* Creator Statistics */}
<div className="bg-white rounded-2xl shadow border p-6">
  <h2 className="text-xl font-bold mb-5">
    Creator Statistics
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    <input
      type="number"
      placeholder="Followers"
      value={profile.followers ?? 0}
      onChange={(e) =>
        setProfile({
          ...profile,
          followers: Number(e.target.value),
        })
      }
      className="border rounded-xl p-3"
    />

    <input
      type="number"
      placeholder="Engagement Rate (%)"
      value={profile.engagement_rate ?? 0}
      onChange={(e) =>
        setProfile({
          ...profile,
          engagement_rate: Number(e.target.value),
        })
      }
      className="border rounded-xl p-3"
    />

    <input
      type="number"
      placeholder="Average Views"
      value={profile.avg_views ?? 0}
      onChange={(e) =>
        setProfile({
          ...profile,
          avg_views: Number(e.target.value),
        })
      }
      className="border rounded-xl p-3"
    />

    <input
      type="number"
      placeholder="Collaborations"
      value={profile.collaborations ?? 0}
      onChange={(e) =>
        setProfile({
          ...profile,
          collaborations: Number(e.target.value),
        })
      }
      className="border rounded-xl p-3"
    />

  </div>
</div>

<div className="bg-white rounded-2xl shadow border p-6">
  <h2 className="text-xl font-bold mb-5">
    Portfolio
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    <input
      placeholder="Portfolio URL"
      value={profile.portfolio_url || ""}
      onChange={(e) =>
        setProfile({
          ...profile,
          portfolio_url: e.target.value,
        })
      }
      className="border rounded-xl p-3"
    />

    <input
      placeholder="Media Kit URL"
      value={profile.media_kit_url || ""}
      onChange={(e) =>
        setProfile({
          ...profile,
          media_kit_url: e.target.value,
        })
      }
      className="border rounded-xl p-3"
    />

  </div>
</div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>

    </div>
  );
}