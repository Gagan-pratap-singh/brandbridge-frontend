interface Props {
  profile: any;
}

export default function Collaborations({
  profile,
}: Props) {
  const collaborations =
    profile.previous_collaborations
      ?.split(",")
      .map((item: string) => item.trim())
      .filter(Boolean) || [];

  return (
    <div className="bg-white rounded-2xl shadow border p-8 h-full">
      <h2 className="text-2xl font-bold mb-6">
        Previous Collaborations
      </h2>

      {collaborations.length === 0 ? (
        <p className="text-gray-400">
          No collaborations available.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {collaborations.map(
            (company: string, index: number) => (
              <span
                key={index}
                className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-medium hover:bg-indigo-200 transition"
              >
                {company}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}