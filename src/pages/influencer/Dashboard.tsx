import { useEffect, useState } from "react";
import {
  getInfluencerDashboard,
  getInfluencerChart,
  getAcceptanceRate,
  getRecentCampaigns,
} from "../../services/dashboard";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [chart, setChart] = useState<number[]>([]);
  const [rate, setRate] = useState(0);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [dashboardData, chartData, rateData, campaignData] =
        await Promise.all([
          getInfluencerDashboard(),
          getInfluencerChart(),
          getAcceptanceRate(),
          getRecentCampaigns(),
        ]);

      setDashboard(dashboardData);
      setChart(chartData);
      setRate(rateData.rate);
      setCampaigns(campaignData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !dashboard) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  const stats = [
    {
      title: "Applied Campaigns",
      value: dashboard.applications ?? 0,
    },
    {
      title: "Accepted",
      value: dashboard.accepted ?? 0,
    },
    {
      title: "Saved Campaigns",
      value: dashboard.saved_campaigns ?? 0,
    },
    {
      title: "Total Earnings",
      value: `₹${dashboard.total_earnings ?? 0}`,
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Welcome back 👋
        </h1>

        <p className="text-gray-500">
          Here's your influencer performance.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {stats.map((item) => (

          <div
            key={item.title}
            className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-xl transition"
          >
            <p className="text-gray-500">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {item.value}
            </h2>

          </div>

        ))}

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl p-6 border shadow-sm">

          <h2 className="text-xl font-bold mb-6">
            Monthly Applications
          </h2>

          <div className="flex justify-between items-end h-64">

            {chart.map((value, index) => (

              <div
                key={index}
                className="w-8 bg-indigo-600 rounded-t-xl"
                style={{
                  height: `${Math.max(value * 12, 10)}px`,
                }}
              />

            ))}

          </div>

        </div>

        <div className="bg-white rounded-2xl p-6 border shadow-sm">

          <h2 className="text-xl font-bold mb-6">
            Acceptance Rate
          </h2>

          <div className="flex justify-center items-center h-64">

            <div className="w-48 h-48 rounded-full border-[18px] border-green-500 flex items-center justify-center">

              <div className="text-center">

                <h1 className="text-5xl font-bold">
                  {rate}%
                </h1>

                <p className="text-gray-500 mt-2">
                  Accepted
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Recent Campaigns */}

      <div className="bg-white rounded-2xl border shadow-sm">

        <div className="p-6 border-b">

          <h2 className="text-xl font-bold">
            Recent Campaigns
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="text-left p-5">
                Brand
              </th>

              <th className="text-left">
                Campaign
              </th>

              <th className="text-left">
                Budget
              </th>

              <th className="text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {campaigns.length === 0 ? (

              <tr>

                <td
                  colSpan={4}
                  className="text-center py-8 text-gray-500"
                >
                  No Campaigns Found
                </td>

              </tr>

            ) : (

              campaigns.map((item: any) => (

                <tr
                  key={item.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-5 font-semibold">
                    {item.brand}
                  </td>

                  <td>
                    {item.campaign}
                  </td>

                  <td>
                    ₹{item.budget}
                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.status === "accepted"
                          ? "bg-green-100 text-green-700"
                          : item.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>

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