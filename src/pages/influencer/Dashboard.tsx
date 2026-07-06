export default function Dashboard() {
  const stats = [
    {
      title: "Applied Campaigns",
      value: "24",
    },
    {
      title: "Accepted",
      value: "8",
    },
    {
      title: "Saved Campaigns",
      value: "15",
    },
    {
      title: "Total Earnings",
      value: "₹45K",
    },
  ];

  const campaigns = [
    {
      brand: "Nike",
      campaign: "Running Shoes Launch",
      status: "Accepted",
    },
    {
      brand: "Boat",
      campaign: "Audio Promotion",
      status: "Pending",
    },
    {
      brand: "Adidas",
      campaign: "Gym Collection",
      status: "Completed",
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

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="
              bg-white
              rounded-2xl
              p-6
              border
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-300
              cursor-pointer
            "
          >
            <p className="text-gray-500">
              {item.title}
            </p>

            <h2 className="text-4xl font-bold mt-4">
              {item.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div
          className="
            bg-white
            rounded-2xl
            p-6
            border
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          <h2 className="text-xl font-bold mb-6">
            Monthly Applications
          </h2>

          <div className="flex items-end justify-between h-64">
            {[30, 60, 45, 80, 70, 95, 65].map(
              (height, index) => (
                <div
                  key={index}
                  className="
                    w-10
                    bg-indigo-600
                    rounded-t-xl
                    hover:bg-indigo-700
                    transition
                  "
                  style={{
                    height: `${height * 2}px`,
                  }}
                />
              )
            )}
          </div>
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            p-6
            border
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          <h2 className="text-xl font-bold mb-6">
            Acceptance Rate
          </h2>

          <div className="flex justify-center items-center h-64">
            <div className="w-48 h-48 rounded-full border-[20px] border-green-500 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold">
                  68%
                </h2>

                <p className="text-gray-500">
                  Accepted
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div
        className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          hover:shadow-xl
          transition-all
          duration-300
        "
      >
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
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {campaigns.map((item, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-5 font-semibold">
                  {item.brand}
                </td>

                <td>
                  {item.campaign}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "Accepted"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}