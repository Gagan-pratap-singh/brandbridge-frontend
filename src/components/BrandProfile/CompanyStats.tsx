import { useEffect, useState } from "react";
import API_BASE_URL from "../../services/api";

type DashboardData = {
  campaigns: number;
  active_campaigns: number;
  applications: number;
  accepted: number;
  pending: number;
  rejected: number;
  invitations_sent: number;
  accepted_invitations: number;
};

type Stat = {
  title: string;
  value: number;
  color: string;
};

export default function CompanyStats() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/dashboard/brand`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to load dashboard");
      }

      const data = await response.json();
      setDashboard(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">
          Company Statistics
        </h2>

        <p className="text-gray-500">Loading statistics...</p>
      </div>
    );
  }

  const stats: Stat[] = [
    {
      title: "Campaigns",
      value: dashboard?.campaigns ?? 0,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Applications",
      value: dashboard?.applications ?? 0,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Active Campaigns",
      value: dashboard?.active_campaigns ?? 0,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Accepted",
      value: dashboard?.accepted ?? 0,
      color: "bg-orange-100 text-orange-700",
    },
    {
      title: "Pending",
      value: dashboard?.pending ?? 0,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Rejected",
      value: dashboard?.rejected ?? 0,
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Invitations",
      value: dashboard?.invitations_sent ?? 0,
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      title: "Accepted Invites",
      value: dashboard?.accepted_invitations ?? 0,
      color: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8 mt-8">
      <h2 className="text-2xl font-bold mb-8">
        Company Statistics
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`rounded-2xl p-6 ${stat.color} hover:scale-105 transition-transform duration-300`}
          >
            <p className="text-sm font-medium">
              {stat.title}
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}