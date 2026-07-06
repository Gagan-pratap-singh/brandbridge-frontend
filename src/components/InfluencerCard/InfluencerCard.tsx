const influencers = [
  {
    name: "Rahul Sharma",
    niche: "Fitness",
    followers: "120K",
    engagement: "4.8%",
  },
  {
    name: "Priya Verma",
    niche: "Fashion",
    followers: "210K",
    engagement: "5.4%",
  },
  {
    name: "Aman Singh",
    niche: "Tech",
    followers: "88K",
    engagement: "6.1%",
  },
];

export default function InfluencerCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <h2 className="text-xl font-bold mb-6">
        Top Influencers
      </h2>

      <div className="space-y-5">

        {influencers.map((user, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-4"
          >

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                {user.name.charAt(0)}
              </div>

              <div>

                <h3 className="font-semibold">
                  {user.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user.niche}
                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="font-semibold">
                {user.followers}
              </p>

              <p className="text-sm text-green-600">
                {user.engagement}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}