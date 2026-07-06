interface Campaign {
  id: number;
  title: string;
  description: string;
  category: string;
  budget: number;
  requirements: string;
  deadline: string;
}

interface Props {
  open: boolean;
  campaign: Campaign | null;
  onClose: () => void;
}

export default function ViewCampaignModal({
  open,
  campaign,
  onClose,
}: Props) {
  if (!open || !campaign) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold mb-6">
          {campaign.title}
        </h2>

        <div className="grid grid-cols-2 gap-6 mb-6">

          <div>
            <p className="text-gray-500 text-sm">Category</p>
            <p className="font-semibold">
              {campaign.category || "-"}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Budget</p>
            <p className="font-semibold">
              ₹{campaign.budget}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Deadline</p>
            <p className="font-semibold">
              {campaign.deadline || "-"}
            </p>
          </div>

        </div>

        <div className="mb-6">
          <p className="text-gray-500 text-sm mb-2">
            Description
          </p>

          <div className="bg-gray-50 rounded-xl p-4">
            {campaign.description || "No description"}
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-2">
            Requirements
          </p>

          <div className="bg-gray-50 rounded-xl p-4">
            {campaign.requirements || "No requirements"}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}