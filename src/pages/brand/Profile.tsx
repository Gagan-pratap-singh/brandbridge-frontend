import { useEffect, useState } from "react";

import ProfileHeader from "../../components/profile/ProfileHeader";
import CompanyInfo from "../../components/profile/CompanyInfo";
import CompanyStats from "../../components/profile/CompanyStats";
import SocialLinks from "../../components/profile/SocialLinks";

import API_BASE_URL from "../../services/api";

interface BrandProfile {
  company_name: string;
  industry?: string;
  website?: string;
  description?: string;

  logo_url?: string;
  cover_url?: string;

  phone?: string;
  email?: string;
  location?: string;

  instagram_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  youtube_url?: string;

  company_size?: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<BrandProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/brands/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16 text-lg">
        Loading Brand Profile...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Profile Header */}
      <ProfileHeader
        companyName={profile?.company_name || "Company Name"}
        industry={profile?.industry || "Industry"}
        logo={profile?.logo_url}
        cover={profile?.cover_url}
        phone={profile?.phone}
        email={profile?.email}
        location={profile?.location}
      />

      {/* About */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-3">
          About
        </h2>

        <p className="text-gray-600 leading-7">
          {profile?.description ||
            "No company description added yet."}
        </p>
      </div>

      {/* Statistics */}
      <CompanyStats />

      {/* Company Details */}
      <CompanyInfo />

      {/* Social Links */}
      <SocialLinks
        website={profile?.website}
        instagram={profile?.instagram_url}
        linkedin={profile?.linkedin_url}
        twitter={profile?.twitter_url}
        facebook={profile?.facebook_url}
        youtube={profile?.youtube_url}
      />
    </div>
  );
}