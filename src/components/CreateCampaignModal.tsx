type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CreateCampaignModal({
  open,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-[700px] p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-2xl font-bold">
            Create Campaign
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ✕
          </button>

        </div>

        <div className="grid grid-cols-2 gap-5">

          <input
            placeholder="Campaign Title"
            className="border rounded-xl p-3"
          />

          <input
            placeholder="Budget"
            className="border rounded-xl p-3"
          />

          <input
            placeholder="Platform"
            className="border rounded-xl p-3"
          />

          <input
            placeholder="Niche"
            className="border rounded-xl p-3"
          />

          <input
            placeholder="Location"
            className="border rounded-xl p-3"
          />

          <input
            placeholder="Deadline"
            type="date"
            className="border rounded-xl p-3"
          />

        </div>

        <textarea
          placeholder="Campaign Description"
          rows={5}
          className="border rounded-xl p-3 w-full mt-5"
        />

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="border px-6 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
            Publish Campaign
          </button>

        </div>

      </div>

    </div>
  );
}