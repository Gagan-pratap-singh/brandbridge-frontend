type Props = {
  companyName: string;
  industry: string;
  logo?: string | null;
};

export default function ProfileHeader({
  companyName,
  industry,
  logo,
}: Props) {
  const defaultLogo = "https://i.pravatar.cc/150?img=12";

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8">
      <div className="flex items-center gap-8">
        <img
          src={logo || defaultLogo}
          alt={companyName}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = defaultLogo;
          }}
          className="w-28 h-28 rounded-full object-cover border-4 border-indigo-100"
        />

        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {companyName || "Company Name"}
          </h1>

          <p className="text-gray-500 mt-2">
            {industry || "Industry"}
          </p>

          <button
            type="button"
            className="mt-5 px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Change Logo
          </button>
        </div>
      </div>
    </div>
  );
}