interface Props {
  profile: any;
}

export default function ProfessionalInfo({
  profile,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border p-8 h-full">

      <h2 className="text-2xl font-bold mb-6">
        Professional Information
      </h2>

      <div className="space-y-6">

        <div>
          <h3 className="font-semibold text-gray-700">
            Portfolio
          </h3>

          {profile.portfolio_url ? (
            <a
              href={profile.portfolio_url}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline break-all"
            >
              {profile.portfolio_url}
            </a>
          ) : (
            <p className="text-gray-400">
              Not Available
            </p>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">
            Media Kit
          </h3>

          {profile.media_kit_url ? (
            <a
              href={profile.media_kit_url}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline break-all"
            >
              {profile.media_kit_url}
            </a>
          ) : (
            <p className="text-gray-400">
              Not Available
            </p>
          )}
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">
            Pricing
          </h3>

          <p className="text-lg font-semibold text-green-600 mt-2">
            {profile.pricing || "Negotiable"}
          </p>
        </div>

      </div>

    </div>
  );
}