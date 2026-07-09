import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getBrandApplications,
  updateApplicationStatus,
} from "../../services/application";

interface Application {
  id: number;
  campaign_id: number;
  influencer_id: number;
  status: string;
  message: string;
  created_at: string;

  campaign?: {
    id: number;
    title: string;
  };

  influencer?: {
    id: number;
    name: string;
    email: string;
  };

  can_message?: boolean;
}

export default function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);

      const data = await getBrandApplications();

      const sorted = [...data].sort((a, b) => {
        const order: Record<string, number> = {
          accepted: 1,
          pending: 2,
          rejected: 3,
        };

        const statusCompare =
          order[a.status] - order[b.status];

        if (statusCompare !== 0) {
          return statusCompare;
        }

        return (
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
        );
      });

      setApplications(sorted);
    } catch (err) {
      console.error(err);
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (
    id: number,
    action: "accept" | "reject"
  ) => {
    try {
      await updateApplicationStatus(id, action);
      load();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Applications
        </h1>

        <p className="text-gray-500 mt-2">
          Manage influencer applications
        </p>
      </div>

      {loading ? (
        <div className="text-gray-500">
          Loading...
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-5">
                  Campaign
                </th>

                <th className="text-left">
                  Influencer
                </th>

                <th className="text-left">
                  Message
                </th>

                <th className="text-left">
                  Applied On
                </th>

                <th className="text-left">
                  Status
                </th>

                <th className="text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center p-8 text-gray-500"
                  >
                    No applications found
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-5 font-medium">
                      {app.campaign?.title ||
                        `Campaign #${app.campaign_id}`}
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/influencers/${app.influencer?.id}`
                          )
                        }
                        className="text-indigo-600 hover:underline font-medium"
                      >
                        {app.influencer?.name ||
                          `Influencer #${app.influencer_id}`}
                      </button>
                    </td>

                    <td className="max-w-sm truncate">
                      {app.message || "-"}
                    </td>

                    <td>
                      {new Date(
                        app.created_at
                      ).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    <td>
                      {app.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              handleAction(
                                app.id,
                                "accept"
                              )
                            }
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                          >
                            Accept
                          </button>

                          <button
                            onClick={() =>
                              handleAction(
                                app.id,
                                "reject"
                              )
                            }
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                          >
                            Reject
                          </button>
                        </div>
                      )}

                      {app.status === "accepted" && (
                        <button
                          onClick={() =>
                            navigate(
                              `/dashboard/messages/${app.influencer_id}`
                            )
                          }
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          💬 Message
                        </button>
                      )}

                      {app.status === "rejected" && (
                        <span className="text-gray-400 font-medium">
                          Rejected
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}