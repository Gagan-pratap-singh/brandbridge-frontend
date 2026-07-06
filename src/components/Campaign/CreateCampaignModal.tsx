import { useEffect, useState } from "react";
import {
  createCampaign,
  updateCampaign,
} from "../../services/campaign";

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
  onClose: () => void;
  onSuccess: () => void;
  campaign?: Campaign | null;
  isEdit?: boolean;
}

export default function CreateCampaignModal({
  open,
  onClose,
  onSuccess,
  campaign,
  isEdit = false,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    requirements: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      if (isEdit && campaign) {
        setForm({
          title: campaign.title || "",
          description: campaign.description || "",
          category: campaign.category || "",
          budget: campaign.budget?.toString() || "",
          requirements: campaign.requirements || "",
          deadline: campaign.deadline || "",
        });
      } else {
        setForm({
          title: "",
          description: "",
          category: "",
          budget: "",
          requirements: "",
          deadline: "",
        });
      }
    }
  }, [open, campaign, isEdit]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        budget: Number(form.budget),
      };

      if (isEdit && campaign) {
        await updateCampaign(campaign.id, payload);
        alert("Campaign updated successfully!");
      } else {
        await createCampaign(payload);
        alert("Campaign created successfully!");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? "Edit Campaign" : "Create Campaign"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="title"
            placeholder="Campaign Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <input
            name="budget"
            type="number"
            placeholder="Budget"
            value={form.budget}
            onChange={handleChange}
            required
            className="w-full border rounded-xl p-3"
          />

          <input
            name="deadline"
            placeholder="Deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
          />

          <textarea
            name="requirements"
            placeholder="Requirements"
            value={form.requirements}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded-xl p-3"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-xl p-3"
          />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
            >
              {loading
                ? isEdit
                  ? "Updating..."
                  : "Creating..."
                : isEdit
                ? "Update Campaign"
                : "Create Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}