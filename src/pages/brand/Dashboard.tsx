import Card from "../../components/Card/Card";
import Chart from "../../components/Chart/Chart";
import ApplicationTable from "../../components/ApplicationTable/ApplicationTable";
import InfluencerCard from "../../components/InfluencerCard/InfluencerCard";
import MessageList from "../../components/MessageList/MessageList";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Brand Dashboard
      </h1>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card
          title="Campaigns"
          value={12}
          icon="📢"
          color="bg-blue-100"
        />

        <Card
          title="Applications"
          value={87}
          icon="📄"
          color="bg-green-100"
        />

        <Card
          title="Influencers"
          value={234}
          icon="👥"
          color="bg-purple-100"
        />

        <Card
          title="Messages"
          value={19}
          icon="💬"
          color="bg-orange-100"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        <div className="xl:col-span-2">
          <Chart />
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            p-6
            hover:shadow-xl
            hover:-translate-y-1
            transition-all
            duration-300
          "
        >
          <h2 className="text-xl font-bold mb-6">
            Top Campaigns
          </h2>

          <div className="space-y-5">
            <div>
              <p className="font-semibold">
                Nike Running
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-indigo-600 h-2 rounded-full w-[85%]" />
              </div>
            </div>

            <div>
              <p className="font-semibold">
                Adidas Gym
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full w-[70%]" />
              </div>
            </div>

            <div>
              <p className="font-semibold">
                Puma Shoes
              </p>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-orange-500 h-2 rounded-full w-[60%]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
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