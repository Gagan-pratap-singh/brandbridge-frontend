import {
  FaUsers,
  FaHeart,
  FaBullhorn,
  FaStar,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";

type Props = {
  profile: any;
};

export default function StatsCards({ profile }: Props) {
  const stats = [
    {
      title: "Followers",
      value: profile?.followers || 0,
      color: "bg-blue-100 text-blue-700",
      icon: <FaUsers />,
    },
    {
      title: "Engagement",
      value: `${profile?.engagement_rate || 0}%`,
      color: "bg-green-100 text-green-700",
      icon: <FaHeart />,
    },
    {
      title: "Campaigns",
      value: profile?.campaigns || 0,
      color: "bg-purple-100 text-purple-700",
      icon: <FaBullhorn />,
    },
    {
      title: "Completed",
      value: profile?.completed_campaigns || 0,
      color: "bg-orange-100 text-orange-700",
      icon: <FaHandshake />,
    },
    {
      title: "Rating",
      value: profile?.rating || "5.0",
      color: "bg-yellow-100 text-yellow-700",
      icon: <FaStar />,
    },
    {
      title: "Response Rate",
      value: `${profile?.response_rate || 100}%`,
      color: "bg-cyan-100 text-cyan-700",
      icon: <FaChartLine />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow border p-8">
      <h2 className="text-2xl font-bold mb-6">
        Creator Statistics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`${item.color} rounded-2xl p-6 shadow-sm hover:shadow-md transition`}
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl">
                {item.icon}
              </span>

              <span className="text-3xl font-bold">
                {item.value}
              </span>
            </div>

            <p className="mt-4 font-semibold text-lg">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}