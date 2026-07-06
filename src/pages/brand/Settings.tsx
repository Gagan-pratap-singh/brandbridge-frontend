export default function Settings() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Settings
      </h1>

      <div className="space-y-6">

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">
            Account Information
          </h2>

          <div className="grid grid-cols-2 gap-6">

            <input
              className="border rounded-xl p-3"
              placeholder="Company Name"
              defaultValue="Nike India"
            />

            <input
              className="border rounded-xl p-3"
              placeholder="Email"
              defaultValue="nike@gmail.com"
            />

          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-4">
            Change Password
          </h2>

          <div className="space-y-4">

            <input
              type="password"
              className="border rounded-xl p-3 w-full"
              placeholder="Current Password"
            />

            <input
              type="password"
              className="border rounded-xl p-3 w-full"
              placeholder="New Password"
            />

            <input
              type="password"
              className="border rounded-xl p-3 w-full"
              placeholder="Confirm Password"
            />

          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">

          <h2 className="text-xl font-bold mb-4">
            Preferences
          </h2>

          <div className="flex items-center justify-between">

            <span>Email Notifications</span>

            <input type="checkbox" defaultChecked />

          </div>

        </div>

        <div className="flex justify-end gap-4">

          <button className="border px-6 py-3 rounded-xl">
            Cancel
          </button>

          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}