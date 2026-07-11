import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getBrandByUserId } from "../../services/brandService";
import API_BASE_URL from "../../services/api";

export default function BrandProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [brand, setBrand] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrand();
  }, [userId]);

  async function loadBrand() {
    try {
      const data = await getBrandByUserId(Number(userId));
      setBrand(data);
    } catch (err) {
      console.error(err);
      alert("Brand not found");
      navigate(-1);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading Brand...
      </div>
    );
  }

  if (!brand) return null;

  return (
    <div className="max-w-6xl mx-auto pb-10">

      {/* Cover */}
      <div className="relative">

        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600"
          className="w-full h-72 object-cover rounded-t-3xl"
          alt="Cover"
        />

        <img
          src={
            brand.logo_url
              ? `${API_BASE_URL}${brand.logo_url}`
              : "https://via.placeholder.com/180"
          }
          alt="Logo"
          className="absolute left-10 -bottom-16 w-36 h-36 rounded-full border-8 border-white bg-white object-cover shadow-xl"
        />

      </div>

      {/* Content */}
      <div className="bg-white rounded-b-3xl shadow-lg pt-20 px-10 pb-10">

        <div className="flex justify-between items-start">

          <div>

            <h1 className="text-4xl font-bold">
              {brand.company_name}
            </h1>

            <p className="text-indigo-600 text-lg mt-2">
              {brand.industry}
            </p>

            <div className="flex gap-3 mt-4 flex-wrap">

              <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full">
                📍 {brand.location || "Unknown"}
              </span>

              <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full">
                👥 {brand.company_size || "Company"}
              </span>

            </div>

          </div>

          <button
            onClick={() =>
              navigate(`/influencer/messages/${brand.user_id}`)
            }
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700"
          >
            Message Brand
          </button>

        </div>

        {/* About */}
        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-4">
            About
          </h2>

          <p className="text-gray-600 leading-8">
            {brand.description || "No description provided."}
          </p>

        </div>

        {/* Links */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="bg-gray-50 rounded-2xl p-5">

            <h3 className="font-bold mb-3">
              Website
            </h3>

            <a
              href={brand.website}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 break-all"
            >
              {brand.website || "-"}
            </a>

          </div>

          <div className="bg-gray-50 rounded-2xl p-5">

            <h3 className="font-bold mb-3">
              Social Links
            </h3>

            <div className="space-y-2">

              <p>{brand.instagram_url || "-"}</p>

              <p>{brand.linkedin_url || "-"}</p>

              <p>{brand.twitter_url || "-"}</p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}