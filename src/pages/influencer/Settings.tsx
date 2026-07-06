export default function Settings() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your account preferences.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-8">
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg">
              Email Notifications
            </h2>

            <p className="text-gray-500 mt-1">
              Receive updates via email.
            </p>

            <input
              type="checkbox"
              defaultChecked
              className="mt-3 w-5 h-5"
            />
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              Push Notifications
            </h2>

            <p className="text-gray-500 mt-1">
              Receive notifications inside the app.
            </p>

            <input
              type="checkbox"
              defaultChecked
              className="mt-3 w-5 h-5"
            />
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              Dark Mode
            </h2>

            <p className="text-gray-500 mt-1">
              Enable dark theme.
            </p>

            <input
              type="checkbox"
              className="mt-3 w-5 h-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}