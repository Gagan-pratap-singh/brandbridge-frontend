import { useEffect, useState } from "react";
import {
  getMyCampaigns,
  updateCampaignStatus,
} from "../../services/campaign";

import CreateCampaignModal from "../../components/Campaign/CreateCampaignModal";
import ViewCampaignModal from "../../components/Campaign/ViewCampaignModal";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
  "all" | "open" | "closed"
>("all");

  const [openModal, setOpenModal] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [selectedCampaign, setSelectedCampaign] =
    useState<any>(null);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    try {
      const data = await getMyCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load campaigns");
    }
  };

  const handleStatus = async (
  id: number,
  isActive: boolean
) => {
  try {
    await updateCampaignStatus(id, !isActive);
    loadCampaigns();
  } catch (error) {
    console.error(error);
    alert("Failed to update campaign");
  }
};

  const handleView = (campaign: any) => {
    setSelectedCampaign(campaign);
    setViewModalOpen(true);
  };

  const handleEdit = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsEdit(true);
    setOpenModal(true);
  };

  const handleCreate = () => {
    setSelectedCampaign(null);
    setIsEdit(false);
    setOpenModal(true);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
  const matchesSearch =
    campaign.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesStatus =
    filter === "all"
      ? true
      : filter === "open"
      ? campaign.is_active
      : !campaign.is_active;

  return matchesSearch && matchesStatus;
});

  return (
    <div>
      {/* Create / Edit Modal */}
      <CreateCampaignModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedCampaign(null);
          setIsEdit(false);
        }}
        onSuccess={loadCampaigns}
        campaign={selectedCampaign}
        isEdit={isEdit}
      />

      {/* View Modal */}
      <ViewCampaignModal
        open={viewModalOpen}
        campaign={selectedCampaign}
        onClose={() => setViewModalOpen(false)}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Campaigns
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your influencer campaigns
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold"
        >
          + Create Campaign
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border shadow-sm p-5 mb-6 flex gap-4">
        <input
  type="text"
  placeholder="Search Campaign..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
/>

<select
  value={filter}
  onChange={(e) =>
    setFilter(e.target.value as any)
  }
  className="border rounded-xl px-4"
>
  <option value="all">All</option>
  <option value="open">Open</option>
  <option value="closed">Closed</option>
</select>
      </div>

      {/* Table */}
      {/* Table */}
<div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
  <table className="w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="text-left p-5">Campaign</th>
        <th className="text-left">Category</th>
        <th className="text-left">Budget</th>
        <th className="text-left">Deadline</th>
        <th className="text-left">Status</th>
        <th className="text-left">Actions</th>
      </tr>
    </thead>

    <tbody>
      {filteredCampaigns.length === 0 ? (
        <tr>
          <td
            colSpan={6}
            className="text-center p-8 text-gray-500"
          >
            No campaigns found.
          </td>
        </tr>
      ) : (
        filteredCampaigns.map((campaign) => (
          <tr
            key={campaign.id}
            className="border-t hover:bg-gray-50"
          >
            <td className="p-5 font-semibold">
              {campaign.title}
            </td>

            <td>{campaign.category || "-"}</td>

            <td>₹{campaign.budget}</td>

            <td>{campaign.deadline || "-"}</td>

            <td>
              {campaign.is_active ? (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                  🟢 Open
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                  🔴 Closed
                </span>
              )}
            </td>

            <td>
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(campaign)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  👁 View
                </button>

                <button
                  onClick={() => handleEdit(campaign)}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() =>
                    handleStatus(
                      campaign.id,
                      campaign.is_active
                    )
                  }
                  className={`px-3 py-1 rounded-lg text-white ${
                    campaign.is_active
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {campaign.is_active
                    ? "🔒 Close"
                    : "🔓 Reopen"}
                </button>
              </div>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>
</div>
  );
}