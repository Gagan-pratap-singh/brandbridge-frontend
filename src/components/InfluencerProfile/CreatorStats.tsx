import {
  FaUsers,
  FaChartLine,
  FaEye,
} from "react-icons/fa";

type Props = {
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
};

export default function CreatorStats({
  profile,
  setProfile,
}: Props) {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const Card = ({
    icon,
    title,
    name,
    value,
    suffix = "",
    placeholder,
  }: any) => (
    <div className="bg-white rounded-3xl shadow border p-8">

      <div className="flex items-center gap-3 mb-6">

        <div className="text-2xl text-indigo-600">
          {icon}
        </div>

        <h3 className="text-lg font-semibold">
          {title}
        </h3>

      </div>

      <input
        type="number"
        name={name}
        value={value ?? ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full border rounded-xl p-3 text-xl font-semibold"
      />

      {suffix && (
        <p className="mt-3 text-gray-500">
          {suffix}
        </p>
      )}

    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      <Card
        icon={<FaUsers />}
        title="Followers"
        name="followers"
        value={profile.followers}
        placeholder="12000"
      />

      <Card
        icon={<FaChartLine />}
        title="Engagement Rate"
        name="engagement_rate"
        value={profile.engagement_rate}
        suffix="%"
        placeholder="5.6"
      />

      <Card
        icon={<FaEye />}
        title="Average Views"
        name="average_views"
        value={profile.average_views}
        placeholder="45000"
      />

    </div>
  );
}