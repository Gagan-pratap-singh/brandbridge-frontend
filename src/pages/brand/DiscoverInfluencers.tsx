import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyCampaigns } from "../../services/campaign";

import { discoverInfluencers } from "../../services/influencer";
import {
  sendInvitation,
  getBrandInvitations,
} from "../../services/invitation";

export default function DiscoverInfluencers() {
  const navigate = useNavigate();

  const [influencers, setInfluencers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("");
  const [location, setLocation] = useState("");

  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");

  const [sentInvitations, setSentInvitations] =
    useState<any[]>([]);

  useEffect(() => {
  loadInfluencers();
  loadSentInvitations();
  loadCampaigns();
}, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadInfluencers();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, niche, location]);

  async function loadInfluencers() {
    try {
      setLoading(true);

      const data = await discoverInfluencers({
        search,
        niche,
        location,
      });

      setInfluencers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  async function loadCampaigns() {
  try {
    const data = await getMyCampaigns();
    setCampaigns(data);
    } 
  catch (err) {
    console.error(err);
    }
  }

  async function loadSentInvitations() {
    try {
      const data = await getBrandInvitations();
      setSentInvitations(data);
    } catch (err) {
      console.error(err);
    }
  }

  const alreadyInvited = (userId: number) => {
  if (!selectedCampaign) return false;

  return sentInvitations.some(
    (invite) =>
      invite.influencer_id === userId &&
      invite.campaign_id === Number(selectedCampaign) &&
      invite.status === "pending"
  );
};

  const handleInvite = async (influencer: any) => {
    try {
      if (!selectedCampaign) {
  alert(
    "Please select a campaign first."
  );
  return;
}

const campaignId = Number(
  selectedCampaign
);
      if (!campaignId) {
        return;
      }

      await sendInvitation(
        campaignId,
        influencer.user_id,
        "I'd like to collaborate with you."
      );

      await loadSentInvitations();

      alert(
        `Invitation sent to ${influencer.name}`
      );
    } catch (err: any) {
      alert(
        err.message ||
          "Failed to send invitation"
      );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Discover Influencers
        </h1>

        <p className="text-gray-500 mt-2">
          Search and invite influencers for your campaigns.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            placeholder="Niche"
            value={niche}
            onChange={(e) =>
              setNiche(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <input
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            className="border rounded-xl p-3"
          />
          <select
  value={selectedCampaign}
  onChange={(e) =>
    setSelectedCampaign(e.target.value)
  }
  className="border rounded-xl p-3 mt-4 w-full"
>
  <option value="">
    Select Campaign
  </option>

  {campaigns.map((campaign) => (
    <option
      key={campaign.id}
      value={campaign.id}
    >
      {campaign.title}
    </option>
  ))}
</select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">
          Loading influencers...
        </div>
      ) : influencers.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
          No influencers found.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {influencers.map((item) => (
            <div
              key={item.user_id}
              className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                  {item.name
                    ? item.name
                        .charAt(0)
                        .toUpperCase()
                    : "U"}
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-indigo-600">
                    {item.niche || "No niche"}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2 text-gray-600">
                <p>
                  📍{" "}
                  {item.location ||
                    "Not specified"}
                </p>

                <p>
                  👥{" "}
                  {(
                    item.followers || 0
                  ).toLocaleString()}{" "}
                  Followers
                </p>

                <p>
                  ⭐{" "}
                  {item.engagement_rate || 0}
                  % Engagement
                </p>

                <p>
                  🌐{" "}
                  {item.categories ||
                    "General"}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  disabled={alreadyInvited(
                    item.user_id
                  )}
                  onClick={() =>
                    handleInvite(item)
                  }
                  className={`flex-1 py-3 rounded-xl text-white ${
                    alreadyInvited(
                      item.user_id
                    )
                      ? "bg-green-600 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {alreadyInvited(
                    item.user_id
                  )
                    ? "Invitation Sent"
                    : "Invite"}
                </button>

                <button
                  className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50"
                  onClick={() =>
                    navigate(
                      `/dashboard/influencers/${item.user_id}`
                    )
                  }
                >
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}