import { useEffect, useState } from "react";
import {
  getCampaigns,
  deleteCampaign,
} from "../../services/campaign";

import CreateCampaignModal from "../../components/Campaign/CreateCampaignModal";
import ViewCampaignModal from "../../components/Campaign/ViewCampaignModal";

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [search, setSearch] = useState("");

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
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load campaigns");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this campaign?")) return;

    try {
      await deleteCampaign(id);
      loadCampaigns();
    } catch (error) {
      console.error(error);
      alert("Failed to delete campaign");
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

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.title.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="bg-white rounded-2xl border shadow-sm p-5 mb-6">
        <input
          type="text"
          placeholder="Search Campaign..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-5">
                Campaign
              </th>

              <th className="text-left">
                Category
              </th>

              <th className="text-left">
                Budget
              </th>

              <th className="text-left">
                Deadline
              </th>

              <th className="text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCampaigns.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
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

                  <td>
                    {campaign.category || "-"}
                  </td>

                  <td>
                    ₹{campaign.budget}
                  </td>

                  <td>
                    {campaign.deadline || "-"}
                  </td>

                  <td>
                    <div className="flex gap-2">

                      <button
                        onClick={() => handleView(campaign)}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleEdit(campaign)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(campaign.id)
                        }
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                      >
                        Delete
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