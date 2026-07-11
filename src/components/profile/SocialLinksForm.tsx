import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaBriefcase,
  FaFilePdf,
} from "react-icons/fa";

interface Props {
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
}

export default function SocialLinksForm({
  profile,
  setProfile,
}: Props) {
  if (!profile) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const Input = ({
    icon,
    label,
    name,
    placeholder,
  }: {
    icon: React.ReactNode;
    label: string;
    name: string;
    placeholder: string;
  }) => (
    <div>
      <label className="flex items-center gap-2 font-semibold mb-2">
        {icon}
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={profile[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow border p-8">
      <h2 className="text-2xl font-bold mb-8">
        Social Links
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          icon={<FaInstagram className="text-pink-600" />}
          label="Instagram"
          name="instagram_url"
          placeholder="https://instagram.com/username"
        />

        <Input
          icon={<FaYoutube className="text-red-600" />}
          label="YouTube"
          name="youtube_url"
          placeholder="https://youtube.com/@channel"
        />

        <Input
          icon={<FaLinkedin className="text-blue-700" />}
          label="LinkedIn"
          name="linkedin_url"
          placeholder="https://linkedin.com/in/username"
        />

        <Input
          icon={<FaTwitter className="text-sky-500" />}
          label="Twitter / X"
          name="twitter_url"
          placeholder="https://x.com/username"
        />

        <Input
          icon={<FaGlobe className="text-green-600" />}
          label="Website"
          name="website"
          placeholder="https://yourwebsite.com"
        />

        <Input
          icon={<FaBriefcase className="text-indigo-600" />}
          label="Portfolio"
          name="portfolio_url"
          placeholder="https://portfolio.com"
        />
      </div>

      <div className="mt-8">
        <label className="flex items-center gap-2 font-semibold mb-2">
          <FaFilePdf className="text-red-600" />
          Media Kit (PDF URL)
        </label>

        <input
          type="text"
          name="media_kit_url"
          value={profile.media_kit_url || ""}
          onChange={handleChange}
          placeholder="https://example.com/media-kit.pdf"
          className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}