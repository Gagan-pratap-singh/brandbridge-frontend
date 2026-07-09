type Props = {
  website?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
};

export default function SocialLinks({
  website,
  instagram,
  linkedin,
  twitter,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-8 mt-8">
      <h2 className="text-2xl font-bold mb-8">
        Social Links
      </h2>

      <div className="space-y-6">
        <div>
          <label className="font-medium">
            Website
          </label>

          <input
            type="text"
            value={website || ""}
            readOnly
            className="w-full mt-2 border rounded-xl p-3 bg-gray-50"
          />
        </div>

        <div>
          <label className="font-medium">
            Instagram
          </label>

          <input
            type="text"
            value={instagram || ""}
            readOnly
            className="w-full mt-2 border rounded-xl p-3 bg-gray-50"
          />
        </div>

        <div>
          <label className="font-medium">
            LinkedIn
          </label>

          <input
            type="text"
            value={linkedin || ""}
            readOnly
            className="w-full mt-2 border rounded-xl p-3 bg-gray-50"
          />
        </div>

        <div>
          <label className="font-medium">
            X (Twitter)
          </label>

          <input
            type="text"
            value={twitter || ""}
            readOnly
            className="w-full mt-2 border rounded-xl p-3 bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
}