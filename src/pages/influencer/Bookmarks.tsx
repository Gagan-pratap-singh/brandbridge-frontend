export default function Bookmarks() {
  const savedCampaigns = [
    {
      id: 1,
      brand: "Nike",
      title: "Running Shoes Launch",
      budget: "₹50,000",
      category: "Fitness",
    },
    {
      id: 2,
      brand: "Boat",
      title: "Audio Product Promotion",
      budget: "₹30,000",
      category: "Technology",
    },
    {
      id: 3,
      brand: "Mamaearth",
      title: "Skincare Collaboration",
      budget: "₹40,000",
      category: "Beauty",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Saved Campaigns
        </h1>

        <p className="text-gray-500 mt-2">
          Campaigns you've bookmarked for later.
        </p>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-2 gap-6">
        {savedCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-indigo-600 font-semibold">
                  {campaign.brand}
                </p>

                <h2 className="text-xl font-bold mt-1">
                  {campaign.title}
                </h2>
              </div>

              <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm">
                {campaign.category}
              </span>
            </div>

            <div className="space-y-2 text-gray-600">
              <p>💰 Budget: {campaign.budget}</p>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-xl hover:bg-indigo-50">
                View Details
              </button>

              <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {savedCampaigns.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border">
          <h2 className="text-xl font-semibold">
            No saved campaigns yet
          </h2>

          <p className="text-gray-500 mt-2">
            Bookmark campaigns to view them here later.
          </p>
        </div>
      )}
    </div>
  );
}