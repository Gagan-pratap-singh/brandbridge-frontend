import { useEffect, useState } from "react";
import { FaBookmark } from "react-icons/fa";

import {
  getBookmarks,
  removeBookmark,
} from "../../services/bookmark";

import { getCampaigns } from "../../services/campaign";

import {
  applyToCampaign,
  getMyApplications,
} from "../../services/application";

import ViewCampaignModal from "../../components/Campaign/ViewCampaignModal";

export default function Bookmarks() {
  const [savedCampaigns, setSavedCampaigns] = useState<any[]>([]);
  const [applications, setApplications] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] =
    useState<any>(null);

  useEffect(() => {
    loadBookmarks();
  }, []);

  async function loadBookmarks() {
    try {
      setLoading(true);

      const bookmarks = await getBookmarks();
      const campaigns = await getCampaigns();
      const applicationData =
        await getMyApplications();

      const appliedIds = applicationData.map(
        (app: any) => app.campaign_id
      );

      setApplications(appliedIds);

      const bookmarkIds = bookmarks.map(
        (b: any) => b.campaign_id
      );

      const saved = campaigns.filter((c: any) =>
        bookmarkIds.includes(c.id)
      );

      setSavedCampaigns(saved);
    } catch (err) {
      console.error(err);
      alert("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  }

  async function handleRemove(campaignId: number) {
    try {
      await removeBookmark(campaignId);

      setSavedCampaigns((prev) =>
        prev.filter((c) => c.id !== campaignId)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to remove bookmark");
    }
  }

  async function handleApply(campaignId: number) {
    try {
      await applyToCampaign(
        campaignId,
        "I'm interested in this campaign."
      );

      alert("Application submitted successfully!");

      setApplications((prev) => [
        ...prev,
        campaignId,
      ]);
    } catch (err: any) {
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading bookmarks...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ViewCampaignModal
        open={viewOpen}
        campaign={selectedCampaign}
        onClose={() => setViewOpen(false)}
      />

      <div>
        <h1 className="text-3xl font-bold">
          Saved Campaigns
        </h1>

        <p className="text-gray-500 mt-2">
          Campaigns you've bookmarked for later.
        </p>
      </div>

      {savedCampaigns.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border">
          <h2 className="text-xl font-semibold">
            No saved campaigns yet
          </h2>

          <p className="text-gray-500 mt-2">
            Bookmark campaigns to view them here later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {savedCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="relative bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg transition"
            >
              <button
                onClick={() =>
                  handleRemove(campaign.id)
                }
                className="absolute top-5 right-5 text-indigo-600 text-2xl hover:text-red-500"
              >
                <FaBookmark />
              </button>

              <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                {campaign.category || "General"}
              </span>

              <h2 className="text-xl font-bold mt-4">
                {campaign.title}
              </h2>

              <p className="text-gray-500 mt-3 line-clamp-3">
                {campaign.description}
              </p>

              <div className="mt-5 space-y-2">
                <p>
                  💰 Budget: ₹{campaign.budget}
                </p>

                <p>
                  📅 Deadline:{" "}
                  {campaign.deadline || "N/A"}
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedCampaign(campaign);
                    setViewOpen(true);
                  }}
                  className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50"
                >
                  View Details
                </button>

                {campaign.already_invited ? (
                  <button
                    disabled
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl cursor-not-allowed"
                  >
                    📩 You were Invited
                  </button>
                ) : campaign.already_applied ||
                  applications.includes(campaign.id) ? (
                  <button
                    disabled
                    className="flex-1 bg-green-600 text-white py-3 rounded-xl cursor-not-allowed"
                  >
                    Applied ✓
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleApply(campaign.id)
                    }
                    className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}