import { useEffect, useState } from "react";
import { getTopInfluencers } from "../../services/dashboard";

export default function InfluencerCard() {
  const [influencers, setInfluencers] = useState<any[]>([]);

  useEffect(() => {
    loadInfluencers();
  }, []);

  async function loadInfluencers() {
    try {
      const data = await getTopInfluencers();
      setInfluencers(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold">
          Top Influencers
        </h2>

        <span className="text-sm text-gray-500">
          Top 5
        </span>

      </div>

      <div className="space-y-5">

        {influencers.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No influencers found.
          </p>
        ) : (
          influencers.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div className="flex items-center gap-4">

                {user.profile_image ? (
                  <img
                    src={`http://127.0.0.1:8000${user.profile_image}`}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>

                  <h3 className="font-semibold">
                    {user.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {user.niche || "Creator"}
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="font-semibold">
                  {Number(user.followers).toLocaleString()}
                </p>

                <p className="text-sm text-indigo-600">
                  Followers
                </p>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}