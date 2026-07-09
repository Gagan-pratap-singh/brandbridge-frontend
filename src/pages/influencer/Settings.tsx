import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getSettings,
  updateSettings,
  changePassword,
  deleteAccount,
} from "../../services/settingsService";

export default function InfluencerSettings() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    id: 0,
  });

  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();

      setProfile({
        name: data.name,
        email: data.email,
        role: data.role,
        id: data.id,
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSave = async () => {
    try {
      await updateSettings({
        name: profile.name,
        email: profile.email,
      });

      localStorage.setItem("user_name", profile.name);
      localStorage.setItem("user_email", profile.email);

      alert("Profile updated successfully.");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.new_password !== passwords.confirm_password) {
      alert("New passwords do not match.");
      return;
    }

    try {
      await changePassword({
        current_password: passwords.current_password,
        new_password: passwords.new_password,
      });

      alert("Password updated successfully.");

      setPasswords({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await deleteAccount();

      localStorage.clear();

      alert("Account deleted successfully.");

      navigate("/");
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">
        Loading Settings...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your account details and preferences.
        </p>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-6">
          Account Settings
        </h2>

        <div className="space-y-5">

          <div>
            <label className="font-medium">
              Name
            </label>

            <input
              type="text"
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label className="font-medium">
              Email
            </label>

            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  email: e.target.value,
                })
              }
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <button
            onClick={handleProfileSave}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700"
          >
            Save Changes
          </button>

        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-6">
          Change Password
        </h2>

        <div className="space-y-5">

          <input
            type="password"
            placeholder="Current Password"
            value={passwords.current_password}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                current_password: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwords.new_password}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                new_password: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={passwords.confirm_password}
            onChange={(e) =>
              setPasswords({
                ...passwords,
                confirm_password: e.target.value,
              })
            }
            className="w-full border rounded-xl p-3"
          />

          <button
            onClick={handlePasswordChange}
            className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700"
          >
            Update Password
          </button>

        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <h2 className="text-2xl font-bold mb-6">
          Account Information
        </h2>

        <p>
          <strong>User ID:</strong> {profile.id}
        </p>

        <p className="mt-2">
          <strong>Role:</strong> {profile.role}
        </p>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-300 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Danger Zone
        </h2>

        <p className="text-gray-700 mb-6">
          Deleting your account is permanent and cannot be undone.
        </p>

        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>

    </div>
  );
}