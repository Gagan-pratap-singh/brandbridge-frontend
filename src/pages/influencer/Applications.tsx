import { useEffect, useState } from "react";
import { getMyApplications } from "../../services/application";

export default function Applications() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const data = await getMyApplications();

      const sorted = data.sort((a: any, b: any) => {
        const order: any = {
          accepted: 1,
          pending: 2,
          rejected: 3,
        };

        return order[a.status] - order[b.status];
      });

      setApplications(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const handleMessage = (brandName: string) => {
    const msg = prompt(`Message to ${brandName}:`);

    if (!msg) return;

    alert(`Message sent to ${brandName}:\n\n${msg}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          My Applications
        </h1>

        <button
          onClick={load}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">
          Loading...
        </p>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white border rounded-2xl p-5 shadow-sm"
            >
              <div className="flex justify-between items-start">
                {/* Left */}
                <div>
                  <p className="font-bold text-lg">
                    {app.campaign?.title || "Campaign"}
                  </p>

                  <p className="text-gray-500 text-sm">
                    Brand: {app.brand?.name || "Unknown"}
                  </p>

                  <p className="text-gray-500 text-sm mt-2">
                    {app.campaign?.description}
                  </p>
                </div>

                {/* Right */}
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>

                  <button
                    onClick={() =>
                      alert(
                        `Title: ${app.campaign?.title}\nBrand: ${app.brand?.name}\nBudget: ₹${app.campaign?.budget}\nStatus: ${app.status}`
                      )
                    }
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                  >
                    View
                  </button>

                  {app.status === "accepted" && (
                    <button
                      onClick={() =>
                        handleMessage(app.brand?.name)
                      }
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                    >
                      Message
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}