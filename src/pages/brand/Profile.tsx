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
  location?: string;
  instagram_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProfileHeader
        companyName={profile?.company_name || "Company Name"}
        industry={profile?.industry || "Industry"}
        logo={profile?.logo_url}
      />

      <CompanyStats />

      <CompanyInfo />

      <SocialLinks
        website={profile?.website}
        instagram={profile?.instagram_url}
        linkedin={profile?.linkedin_url}
        twitter={profile?.twitter_url}
      />
    </div>
  );
}