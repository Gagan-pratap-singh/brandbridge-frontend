type Props = {
  profile: any;
};

export default function AboutCard({ profile }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow border p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">
          About Me
        </h2>

        <button className="text-indigo-600 font-medium hover:underline">
          Edit
        </button>
      </div>

      <p className="text-gray-600 leading-8 whitespace-pre-line">
        {profile?.bio ||
          "Tell brands who you are, what type of content you create, your audience, and why brands should collaborate with you."}
      </p>
    </div>
  );
}