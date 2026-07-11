import {
  FaGlobe,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

type Props = {
  website?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  youtube?: string;
};

export default function SocialLinks({
  website,
  instagram,
  linkedin,
  twitter,
  facebook,
  youtube,
}: Props) {
  const links = [
    {
      label: "Website",
      value: website,
      icon: <FaGlobe className="text-green-600 text-xl" />,
    },
    {
      label: "Instagram",
      value: instagram,
      icon: <FaInstagram className="text-pink-600 text-xl" />,
    },
    {
      label: "LinkedIn",
      value: linkedin,
      icon: <FaLinkedin className="text-blue-700 text-xl" />,
    },
    {
      label: "X (Twitter)",
      value: twitter,
      icon: <FaTwitter className="text-sky-500 text-xl" />,
    },
    {
      label: "Facebook",
      value: facebook,
      icon: <FaFacebook className="text-blue-600 text-xl" />,
    },
    {
      label: "YouTube",
      value: youtube,
      icon: <FaYoutube className="text-red-600 text-xl" />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow border p-8">
      <h2 className="text-2xl font-bold mb-8">
        Social Media
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {links.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between border rounded-xl p-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              {item.icon}

              <div>
                <p className="font-semibold">
                  {item.label}
                </p>

                <p className="text-sm text-gray-500">
                  {item.value ? "Connected" : "Not Added"}
                </p>
              </div>
            </div>

            {item.value ? (
              <a
                href={item.value}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline font-medium"
              >
                Visit
              </a>
            ) : (
              <span className="text-gray-400 text-sm">
                —
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}