import { useEffect, useState } from "react";
import { getRecentApplications } from "../../services/dashboard";

export default function ApplicationTable() {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      const data = await getRecentApplications();
      setApplications(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">
          Recent Applications
        </h2>

        <span className="text-sm text-gray-500">
          Latest 5
        </span>
      </div>

      <table className="w-full">

        <thead>
          <tr className="border-b">
            <th className="text-left py-3">Influencer</th>
            <th className="text-left py-3">Campaign</th>
            <th className="text-left py-3">Status</th>
            <th className="text-left py-3">Applied</th>
          </tr>
        </thead>

        <tbody>

          {applications.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-8 text-center text-gray-500"
              >
                No applications found.
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr
                key={app.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-4 font-medium">
                  {app.name}
                </td>

                <td>
                  {app.campaign}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      app.status.toLowerCase() === "accepted"
                        ? "bg-green-100 text-green-700"
                        : app.status.toLowerCase() === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td>
                  {new Date(app.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}