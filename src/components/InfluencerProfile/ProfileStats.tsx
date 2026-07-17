import {
  FaUsers,
  FaHeart,
  FaEye,
  FaHandshake,
  
} from "react-icons/fa";
import { Link } from "react-router-dom";


interface Props {
  profile: any;
}

const stats = (profile: any) => [
  {
    icon: <FaUsers />,
    title: "Followers",
    value: profile?.followers?.toLocaleString() || "0",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: <FaHeart />,
    title: "Engagement",
    value: `${profile?.engagement_rate || 0}%`,
    color: "from-pink-500 to-red-500",
  },
  {
    icon: <FaEye />,
    title: "Avg. Views",
    value: profile?.average_views?.toLocaleString() || "0",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: <FaHandshake />,
    title: "Collaborations",
    value: profile?.collaborations || "0",
    color: "from-orange-500 to-yellow-500",
  },
];

export default function ProfileStats({ profile }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border p-8">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">
          Creator Statistics
        </h2>

        <Link
  to="/influencer/profile/edit"
  className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2"
>
  Edit
</Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        {stats(profile).map((item) => (
          <div
            key={item.title}
            className={`bg-gradient-to-r ${item.color} rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition duration-300`}
          >
            <div className="text-3xl mb-4">
              {item.icon}
            </div>

            <h3 className="text-sm opacity-90">
              {item.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {item.value}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}