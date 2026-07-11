import { useEffect, useState } from "react";

import Card from "../../components/Card/Card";
import Chart from "../../components/Chart/Chart";
import ApplicationTable from "../../components/ApplicationTable/ApplicationTable";
import InfluencerCard from "../../components/InfluencerCard/InfluencerCard";
import MessageList from "../../components/MessageList/MessageList";

import { getBrandProfile } from "../../services/brandService";
import { getBrandDashboard } from "../../services/dashboard";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [profileData, dashboardData] = await Promise.all([
        getBrandProfile(),
        getBrandDashboard(),
      ]);

      setProfile(profileData);
      setStats(dashboardData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div>

      {/* Header */}

      <div className="bg-white rounded-2xl shadow border p-8 mb-8">

        <div className="flex items-center gap-5">

          <img
            src={
              profile?.logo_url ||
              "https://i.pravatar.cc/150?img=12"
            }
            className="w-20 h-20 rounded-full object-cover border"
          />

          <div>

            <h1 className="text-4xl font-bold">
              👋 Welcome back,
              <span className="text-indigo-600">
                {" "}
                {profile?.company_name}
              </span>
            </h1>

            <p className="text-gray-500 mt-2 text-lg">
              {profile?.industry}
            </p>

            <p className="text-gray-500">
              📍 {profile?.location || "Not specified"}
            </p>

          </div>

        </div>

      </div>

      {/* KPI */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card
          title="Campaigns"
          value={stats?.campaigns || 0}
          icon="📢"
          color="bg-blue-100"
        />

        <Card
          title="Applications"
          value={stats?.applications || 0}
          icon="📄"
          color="bg-green-100"
        />

        <Card
          title="Active Campaigns"
          value={stats?.active_campaigns || 0}
          icon="🟢"
          color="bg-purple-100"
        />

        <Card
          title="Accepted"
          value={stats?.accepted || 0}
          icon="🤝"
          color="bg-orange-100"
        />

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <div className="xl:col-span-2">
          <Chart />
        </div>

        <div className="bg-white rounded-2xl shadow border p-6">

          <h2 className="text-xl font-bold mb-6">
            Company Information
          </h2>

          <div className="space-y-4">

            <div>
              <span className="font-semibold">
                Website
              </span>

              <p className="text-gray-600">
                {profile?.website || "-"}
              </p>
            </div>

            <div>
              <span className="font-semibold">
                Company Size
              </span>

              <p className="text-gray-600">
                {profile?.company_size || "-"}
              </p>
            </div>

            <div>
              <span className="font-semibold">
                Industry
              </span>

              <p className="text-gray-600">
                {profile?.industry || "-"}
              </p>
            </div>

            <div>
              <span className="font-semibold">
                Location
              </span>

              <p className="text-gray-600">
                {profile?.location || "-"}
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* Applications */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <div className="xl:col-span-2">
          <ApplicationTable />
        </div>

        <InfluencerCard />

      </div>

      {/* Messages */}

      <div className="mt-8">
        <MessageList />
      </div>

    </div>
  );
}