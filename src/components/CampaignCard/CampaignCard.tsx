type Props = {
  company: string;
  title: string;
  budget: string;
  applicants: number;
  status: string;
};

export default function CampaignCard({
  company,
  title,
  budget,
  applicants,
  status,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition p-6">

      <div className="flex justify-between items-center">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {company}
          </h2>

          <p className="text-gray-500">
            {title}
          </p>
        </div>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {status}
        </span>

      </div>

      <div className="mt-6 space-y-2">

        <p>
          💰 <strong>Budget:</strong> {budget}
        </p>

        <p>
          👥 <strong>Applicants:</strong> {applicants}
        </p>

      </div>

      <button className="mt-6 w-full bg-indigo-600 text-white rounded-lg py-3 hover:bg-indigo-700">
        View Campaign
      </button>

    </div>
  );
}