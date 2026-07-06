const messages = [
  {
    name: "Nike India",
    message: "We liked your profile.",
    time: "2 min ago",
  },
  {
    name: "Rahul Sharma",
    message: "Can we negotiate the budget?",
    time: "15 min ago",
  },
  {
    name: "Boat",
    message: "Campaign has been updated.",
    time: "1 hour ago",
  },
];

export default function MessageList() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <h2 className="text-xl font-bold mb-6">
        Recent Messages
      </h2>

      <div className="space-y-5">

        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex items-start gap-4 border-b pb-4 last:border-none"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
              {msg.name.charAt(0)}
            </div>

            <div className="flex-1">
              <h3 className="font-semibold">{msg.name}</h3>

              <p className="text-gray-500 text-sm">
                {msg.message}
              </p>
            </div>

            <span className="text-xs text-gray-400">
              {msg.time}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}
