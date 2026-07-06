import { useEffect, useState } from "react";
import {
  getInfluencerInvitations,
  updateInvitation,
} from "../../services/invitation";

interface Invitation {
  id: number;
  campaign_id: number;
  brand_id: number;
  message: string;
  status: string;
  created_at: string;
}

export default function InfluencerInvitations() {
  const [loading, setLoading] = useState(true);
  const [invitations, setInvitations] = useState<Invitation[]>([]);

  useEffect(() => {
    loadInvitations();
  }, []);

  async function loadInvitations() {
    try {
      setLoading(true);

      const data = await getInfluencerInvitations();

      setInvitations(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load invitations");
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(
    id: number,
    status: "accepted" | "rejected"
  ) {
    try {
      await updateInvitation(id, status);

      loadInvitations();
    } catch (err: any) {
      alert(err.message);
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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Invitations
        </h1>

        <p className="text-gray-500 mt-2">
          Campaign invitations from brands
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left p-5">
                Campaign
              </th>

              <th className="text-left">
                Brand
              </th>

              <th className="text-left">
                Message
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

            {loading ? (

              <tr>
                <td colSpan={5} className="text-center p-8">
                  Loading...
                </td>
              </tr>

            ) : invitations.length === 0 ? (

              <tr>
                <td
                  colSpan={5}
                  className="text-center p-8 text-gray-500"
                >
                  No invitations
                </td>
              </tr>

            ) : (

              invitations.map((invite) => (

                <tr
                  key={invite.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-5">
                    #{invite.campaign_id}
                  </td>

                  <td>
                    #{invite.brand_id}
                  </td>

                  <td>
                    {invite.message || "-"}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${badge(
                        invite.status
                      )}`}
                    >
                      {invite.status}
                    </span>

                  </td>

                  <td>

                    {invite.status === "pending" ? (

                      <div className="flex gap-2">

                        <button
                          onClick={() =>
                            handleAction(
                              invite.id,
                              "accepted"
                            )
                          }
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleAction(
                              invite.id,
                              "rejected"
                            )
                          }
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                        >
                          Reject
                        </button>

                      </div>

                    ) : (

                      <span className="text-gray-400">
                        Completed
                      </span>

                    )}

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