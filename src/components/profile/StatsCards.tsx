interface Props {
  profile: any;
}

export default function StatsCards({
  profile,
}: Props) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12 px-10">

      <div className="bg-white rounded-2xl shadow border p-6 text-center hover:shadow-xl transition">

        <p className="text-gray-500 uppercase text-sm">
          Followers
        </p>

        <h2 className="text-4xl font-bold text-indigo-600 mt-2">
          {(profile.followers || 0).toLocaleString()}
        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow border p-6 text-center hover:shadow-xl transition">

        <p className="text-gray-500 uppercase text-sm">
          Engagement
        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-2">
          {profile.engagement_rate || 0}%
        </h2>

      </div>

      <div className="bg-white rounded-2xl shadow border p-6 text-center hover:shadow-xl transition">

        <p className="text-gray-500 uppercase text-sm">
          Average Views
        </p>

        <h2 className="text-4xl font-bold text-orange-600 mt-2">
          {(profile.average_views || 0).toLocaleString()}
        </h2>

      </div>

    </div>
  );
}