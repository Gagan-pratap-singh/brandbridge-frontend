import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
} from "react-icons/fa";

type Props = {
  profile: any;
};

export default function SocialLinks({ profile }: Props) {
  if (!profile) return null;

  return (
    <div className="bg-white rounded-2xl shadow border p-8">
      <h2 className="text-2xl font-bold mb-6">
        Social Links
      </h2>

      <div className="space-y-4">
        {profile.instagram_url && (
          <a
            href={profile.instagram_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-pink-600 hover:underline"
          >
            <FaInstagram />
            Instagram
          </a>
        )}

        {profile.youtube_url && (
          <a
            href={profile.youtube_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-red-600 hover:underline"
          >
            <FaYoutube />
            YouTube
          </a>
        )}

        {profile.twitter_url && (
          <a
            href={profile.twitter_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-sky-500 hover:underline"
          >
            <FaTwitter />
            X (Twitter)
          </a>
        )}

        {profile.linkedin_url && (
          <a
            href={profile.linkedin_url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-blue-700 hover:underline"
          >
            <FaLinkedin />
            LinkedIn
          </a>
        )}

        {profile.website && (
          <a
            href={profile.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 text-green-600 hover:underline"
          >
            <FaGlobe />
            Website
          </a>
        )}

        {!profile.instagram_url &&
          !profile.youtube_url &&
          !profile.twitter_url &&
          !profile.linkedin_url &&
          !profile.website && (
            <p className="text-gray-400">
              No social links available.
            </p>
          )}
      </div>
    </div>
  );
}