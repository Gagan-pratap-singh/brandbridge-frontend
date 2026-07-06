type Props = {
  title: string;
  value: string | number;
  icon: string;
  color: string;
};

export default function Card({
  title,
  value,
  icon,
  color,
}: Props) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        p-6
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
      "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {value}
          </h2>
        </div>

        <div
          className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            text-3xl
            shadow-sm
            ${color}
          `}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}