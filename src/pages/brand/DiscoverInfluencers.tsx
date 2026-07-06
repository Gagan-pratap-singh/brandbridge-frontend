import { useEffect, useState } from "react";
import { discoverInfluencers } from "../../services/influencer";

export default function DiscoverInfluencers() {

  const [influencers, setInfluencers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    loadInfluencers();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadInfluencers();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, niche, location]);

  async function loadInfluencers() {
    try {
      setLoading(true);

      const data = await discoverInfluencers({
        search,
        niche,
        location,
      });

      setInfluencers(data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleInvite = (influencer: any) => {

    const invites = JSON.parse(
      localStorage.getItem("invites") || "[]"
    );

    const exists = invites.find(
      (item: any) =>
        item.user_id === influencer.user_id
    );

    if (exists) {
      alert("Invitation already sent.");
      return;
    }

    invites.push({
      id: Date.now(),
      user_id: influencer.user_id,
      influencer: influencer.name,
      campaign: "Campaign",
      status: "Pending",
    });

    localStorage.setItem(
      "invites",
      JSON.stringify(invites)
    );

    alert(`Invitation sent to ${influencer.name}`);
  };
  return (
  <div className="space-y-8">

    <div>
      <h1 className="text-3xl font-bold">
        Discover Influencers
      </h1>

      <p className="text-gray-500 mt-2">
        Search and invite influencers for your campaigns.
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="grid md:grid-cols-3 gap-4">

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl p-3"
        />

        <input
          placeholder="Niche"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          className="border rounded-xl p-3"
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border rounded-xl p-3"
        />

      </div>

    </div>

    {loading ? (

      <div className="text-center py-20 text-gray-500">
        Loading influencers...
      </div>

    ) : influencers.length === 0 ? (

      <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
        No influencers found.
      </div>

    ) : (

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {influencers.map((item) => (

          <div
            key={item.user_id}
            className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition"
          >

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold">
                {item.name
                  ? item.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div>

                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p className="text-indigo-600">
                  {item.niche || "No niche"}
                </p>

              </div>

            </div>

            <div className="mt-6 space-y-2 text-gray-600">

              <p>
                📍 {item.location || "Not specified"}
              </p>

              <p>
                👥 {(item.followers || 0).toLocaleString()} Followers
              </p>

              <p>
                ⭐ {item.engagement_rate || 0}% Engagement
              </p>

              <p>
                🌐 {item.categories || "General"}
              </p>

            </div>

            <div className="mt-6 flex gap-3">

              <button
                className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700"
                onClick={() => handleInvite(item)}
              >
                Invite
              </button>

              <button
                className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50"
              >
                View Profile
              </button>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
);
}