const applications = [
  {
    name: "Rahul Sharma",
    campaign: "Nike Fitness",
    followers: "120K",
    status: "Pending",
  },
  {
    name: "Priya Verma",
    campaign: "Adidas Gym",
    followers: "85K",
    status: "Accepted",
  },
  {
    name: "Aman Singh",
    campaign: "Puma Shoes",
    followers: "56K",
    status: "Rejected",
  },
  {
    name: "Sneha Gupta",
    campaign: "Boat Audio",
    followers: "230K",
    status: "Pending",
  },
];

export default function ApplicationTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <h2 className="text-xl font-bold mb-6">
        Recent Applications
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="text-left py-3">Influencer</th>

            <th className="text-left py-3">Campaign</th>

            <th className="text-left py-3">Followers</th>

            <th className="text-left py-3">Status</th>

          </tr>

        </thead>

        <tbody>

          {applications.map((app, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-4">{app.name}</td>

              <td>{app.campaign}</td>

              <td>{app.followers}</td>

              <td>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                  ${
                    app.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : app.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {app.status}
                </span>

              </td>

            </tr>
          ))
          }
        </tbody>

      </table>

    </div>
  );
}