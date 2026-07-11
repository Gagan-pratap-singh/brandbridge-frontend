type Props = {
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
};

export default function CreatorInfo({
  profile,
  setProfile,
}: Props) {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow border p-8">

      <h2 className="text-2xl font-bold mb-8">
        About Creator
      </h2>

      {/* Bio */}

      <div className="mb-8">

        <label className="font-semibold">
          Bio
        </label>

        <textarea
          rows={5}
          name="bio"
          value={profile.bio || ""}
          onChange={handleChange}
          className="w-full mt-3 border rounded-xl p-4 resize-none"
          placeholder="Tell brands about yourself..."
        />

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>

          <label className="font-semibold">
            Niche
          </label>

          <input
            name="niche"
            value={profile.niche || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            placeholder="Technology"
          />

        </div>

        <div>

          <label className="font-semibold">
            Categories
          </label>

          <input
            name="categories"
            value={profile.categories || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            placeholder="AI, Coding, Startups"
          />

        </div>

        <div>

          <label className="font-semibold">
            Languages
          </label>

          <input
            name="languages"
            value={profile.languages || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            placeholder="English, Hindi"
          />

        </div>

        <div>

          <label className="font-semibold">
            Content Type
          </label>

          <input
            name="content_type"
            value={profile.content_type || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            placeholder="YouTube Videos"
          />

        </div>

        <div>

          <label className="font-semibold">
            Location
          </label>

          <input
            name="location"
            value={profile.location || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            placeholder="Greater Noida"
          />

        </div>

        <div>

          <label className="font-semibold">
            Pricing
          </label>

          <input
            name="pricing"
            value={profile.pricing || ""}
            onChange={handleChange}
            className="w-full mt-2 border rounded-xl p-3"
            placeholder="₹10,000 per Reel"
          />

        </div>

      </div>

      <div className="mt-8">

        <label className="font-semibold">
          Previous Collaborations
        </label>

        <textarea
          rows={4}
          name="previous_collaborations"
          value={
            profile.previous_collaborations || ""
          }
          onChange={handleChange}
          className="w-full mt-2 border rounded-xl p-4 resize-none"
          placeholder="Microsoft, Adobe, Amazon..."
        />

      </div>

    </div>
  );
}