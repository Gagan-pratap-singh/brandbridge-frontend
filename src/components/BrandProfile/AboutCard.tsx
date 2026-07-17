interface Props {
  profile: any;
}

export default function AboutCard({
  profile,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border p-8 h-full">

      <h2 className="text-2xl font-bold mb-5">
        About Creator
      </h2>

      <p className="text-gray-600 leading-8">
        {profile.bio || "No biography added yet."}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <div>
          <h3 className="font-semibold text-gray-800">
            Languages
          </h3>

          <p className="text-gray-600 mt-2">
            {profile.languages || "Not specified"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">
            Content Type
          </h3>

          <p className="text-gray-600 mt-2">
            {profile.content_type || "Not specified"}
          </p>
        </div>

      </div>

    </div>
  );
}