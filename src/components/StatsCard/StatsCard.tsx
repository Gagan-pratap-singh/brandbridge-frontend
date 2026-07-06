type Props = {
  title: string;
  value: string;
};

export default function StatsCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-6">

      <p className="text-gray-500 mb-2">
        {title}
      </p>

      <h2 className="text-4xl font-bold">
        {value}
      </h2>

    </div>
  );
}