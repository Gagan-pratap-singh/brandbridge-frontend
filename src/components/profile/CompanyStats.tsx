type Stat = {
  title: string;
  value: number | string;
  color: string;
};

export default function CompanyStats() {
  const stats: Stat[] = [
    {
      title: "Campaigns",
      value: 12,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Applications",
      value: 187,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Active Campaigns",
      value: 5,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Accepted",
      value: 51,
      color: "bg-orange-100 text-orange-700",
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
            className={`rounded-2xl p-6 ${stat.color} hover:scale-105 transition-transform`}
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