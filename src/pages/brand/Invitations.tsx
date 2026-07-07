import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBrandInvitations } from "../../services/invitation";

interface Invitation {
  id: number;
  campaign_id: number;
  influencer_id: number;
  message: string;
  status: string;
  created_at: string;
}

export default function Invitations() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    loadInvitations();
  }, []);

  async function loadInvitations() {
    try {
      setLoading(true);

      const data = await getBrandInvitations();
      setInvitations(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load invitations");
    } finally {
      setLoading(false);
    }
  }

  const badge = (status: string) => {
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Sent Invitations
        </h1>

        <p className="text-gray-500 mt-2">
          Track invitations you've sent to influencers.
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border p-16 text-center">
          <p className="text-gray-500 text-lg">
            Loading invitations...
          </p>
        </div>
      ) : invitations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border p-16 text-center">
          <div className="text-6xl mb-6">
            📨
          </div>

          <h2 className="text-2xl font-bold">
            No Invitations Yet
          </h2>

          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            You haven't invited any influencers yet.
            Discover creators that match your campaign
            and send your first invitation.
          </p>

          <button
            onClick={() =>
              navigate("/dashboard/influencers")
            }
            className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition"
          >
            Discover Influencers
          </button>
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
                  Status
                </th>

                <th className="text-left">
                  Date
                </th>

                <th className="text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {invitations.map((invite) => (
                <tr
                  key={invite.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-5 font-medium">
                    Campaign #{invite.campaign_id}
                  </td>

                  <td>
                    Influencer #{invite.influencer_id}
                  </td>

                  <td className="max-w-sm truncate">
                    {invite.message || "-"}
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${badge(
                        invite.status
                      )}`}
                    >
                      {invite.status}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      invite.created_at
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {invite.status.toLowerCase() ===
                      "accepted" && (
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/messages/${invite.influencer_id}`
                          )
                        }
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                      >
                        Message
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}