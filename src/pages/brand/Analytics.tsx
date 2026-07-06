import { useEffect, useState } from "react";
import { getBrandDashboard } from "../../services/dashboard";

interface DashboardData {
  campaigns: number;
  active_campaigns: number;
  applications: number;
  accepted: number;
  pending: number;
  rejected: number;
  invitations_sent: number;
  accepted_invitations: number;
}

export default function Analytics() {
  const [stats, setStats] = useState<DashboardData>({
    campaigns: 0,
    active_campaigns: 0,
    applications: 0,
    accepted: 0,
    pending: 0,
    rejected: 0,
    invitations_sent: 0,
    accepted_invitations: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getBrandDashboard();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const topCards = [
    {
      title: "Campaigns",
      value: stats.campaigns,
    },
    {
      title: "Applications",
      value: stats.applications,
    },
    {
      title: "Invitations Sent",
      value: stats.invitations_sent,
    },
    {
      title: "Accepted Invitations",
      value: stats.accepted_invitations,
    },
  ];

  const chartData = [
    stats.accepted,
    stats.pending,
    stats.rejected,
    stats.active_campaigns,
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Track your campaign performance.
        </p>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-10 text-center">
          Loading...
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            {topCards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-2xl border shadow-sm p-6"
              >
                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-4">
                  {card.value}
                </h2>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-bold mb-8">
                Application Status
              </h2>

              <div className="flex items-end justify-around h-64">
                {chartData.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="w-14 bg-indigo-600 rounded-t-xl"
                      style={{
                        height: `${Math.max(
                          value * 25,
                          20
                        )}px`,
                      }}
                    />

                    <p className="text-sm mt-3">
                      {[
                        "Accepted",
                        "Pending",
                        "Rejected",
                        "Active",
                      ][index]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm p-6">
              <h2 className="text-xl font-bold mb-8">
                Success Rate
              </h2>

              <div className="flex justify-center items-center h-64">
                <div className="w-56 h-56 rounded-full border-[20px] border-indigo-600 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-5xl font-bold">
                      {stats.applications === 0
                        ? 0
                        : Math.round(
                            (stats.accepted /
                              stats.applications) *
                              100
                          )}
                      %
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Acceptance Rate
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Table */}
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">
                Detailed Statistics
              </h2>
            </div>

            <table className="w-full">
              <tbody>
                <tr className="border-t">
                  <td className="p-5 font-medium">
                    Active Campaigns
                  </td>

                  <td className="p-5">
                    {stats.active_campaigns}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-5 font-medium">
                    Accepted Applications
                  </td>

                  <td className="p-5">
                    {stats.accepted}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-5 font-medium">
                    Pending Applications
                  </td>

                  <td className="p-5">
                    {stats.pending}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-5 font-medium">
                    Rejected Applications
                  </td>

                  <td className="p-5">
                    {stats.rejected}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-5 font-medium">
                    Invitations Sent
                  </td>

                  <td className="p-5">
                    {stats.invitations_sent}
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="p-5 font-medium">
                    Accepted Invitations
                  </td>

                  <td className="p-5">
                    {stats.accepted_invitations}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}