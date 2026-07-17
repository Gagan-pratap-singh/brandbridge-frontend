import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import { getCampaigns } from "../../services/campaign";
import {
  applyToCampaign,
  getMyApplications,
} from "../../services/application";

import {
  getBookmarks,
  addBookmark,
  removeBookmark,
} from "../../services/bookmark";

import ViewCampaignModal from "../../components/Campaign/ViewCampaignModal";

export default function Discover() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [applications, setApplications] = useState<number[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [viewOpen, setViewOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] =
    useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const campaignData = await getCampaigns();
      setCampaigns(campaignData);

      const applicationData = await getMyApplications();

      setApplications(
        applicationData.map(
          (app: any) => app.campaign_id
        )
      );

      const bookmarkData = await getBookmarks();

      setBookmarkedIds(
        bookmarkData.map(
          (bookmark: any) => bookmark.campaign_id
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = (campaign: any) => {
    setSelectedCampaign(campaign);
    setViewOpen(true);
  };

  const handleApply = async (campaignId: number) => {
    try {
      await applyToCampaign(
        campaignId,
        "I'm interested in this campaign."
      );

      alert("Application submitted successfully!");

      setApplications((prev) => [...prev, campaignId]);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const toggleBookmark = async (campaignId: number) => {
    try {
      if (bookmarkedIds.includes(campaignId)) {
        await removeBookmark(campaignId);

        setBookmarkedIds((prev) =>
          prev.filter((id) => id !== campaignId)
        );
      } else {
        await addBookmark(campaignId);

        setBookmarkedIds((prev) => [
          ...prev,
          campaignId,
        ]);
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      campaign.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">

      <ViewCampaignModal
        open={viewOpen}
        campaign={selectedCampaign}
        onClose={() => setViewOpen(false)}
      />

      <div>
        <h1 className="text-3xl font-bold">
          Discover Campaigns
        </h1>

        <p className="text-gray-500 mt-2">
          Browse campaigns and apply.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <div className="grid grid-cols-2 gap-4">

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-xl p-3"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="border rounded-xl p-3"
          >
            <option value="All">
              All Categories
            </option>

            <option value="Fitness">
              Fitness
            </option>

            <option value="Technology">
              Technology
            </option>

            <option value="Beauty">
              Beauty
            </option>

            <option value="Lifestyle">
              Lifestyle
            </option>
          </select>

        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">

        {filteredCampaigns.map((campaign) => (

          <div
            key={campaign.id}
            className="relative bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg transition"
          >

            {/* Bookmark */}
            <button
              onClick={() =>
                toggleBookmark(campaign.id)
              }
              className="absolute top-5 right-5 text-2xl text-indigo-600 hover:scale-110 transition"
            >
              {bookmarkedIds.includes(
                campaign.id
              ) ? (
                <FaBookmark />
              ) : (
                <FaRegBookmark />
              )}
            </button>

            {/* Category */}
            <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
              {campaign.category || "General"}
            </span>

            {/* Title */}
            <h2 className="text-xl font-bold mt-4">
              {campaign.title}
            </h2>

            {/* Description */}
            <p className="text-gray-500 mt-3 line-clamp-3">
              {campaign.description}
            </p>

            {/* Details */}
            <div className="mt-5 space-y-2">
              <p>
                💰 Budget: ₹{campaign.budget}
              </p>

              <p>
                📅 Deadline:{" "}
                {campaign.deadline || "N/A"}
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">

              <button
                onClick={() =>
                  handleView(campaign)
                }
                className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50"
              >
                View
              </button>

              {campaign.already_invited ? (

                <button
                  disabled
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl cursor-not-allowed font-semibold"
                >
                  📩 Invited
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
                  Apply
                </button>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}