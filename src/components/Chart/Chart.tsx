export default function Chart() {
  const bars = [40, 75, 55, 90, 60, 80, 50];

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        p-6
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <h2 className="text-xl font-bold mb-6">
        Monthly Applications
      </h2>

      <div className="flex items-end justify-between h-64">
        {bars.map((height, index) => (
          <div
            key={index}
            className="
              w-10
              bg-indigo-600
              rounded-t-xl
              hover:bg-indigo-700
              transition
            "
            style={{
              height: `${height}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}