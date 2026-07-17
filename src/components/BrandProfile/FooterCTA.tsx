import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

interface Props {
  onMessage?: () => void;
  onInvite?: () => void;
  showInvite?: boolean;
}

export default function FooterCTA({
  onMessage,
  onInvite,
  showInvite = false,
}: Props) {
  return (
    <div className="mt-12 rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl">

      <div className="px-10 py-12 flex flex-col lg:flex-row items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold">
            Interested in collaborating?
          </h2>

          <p className="text-indigo-100 mt-3 text-lg">
            Start a conversation and build your next successful campaign together.
          </p>
        </div>

        <div className="flex gap-4 mt-8 lg:mt-0">

          <button
            onClick={onMessage}
            className="flex items-center gap-3 bg-white text-indigo-700 px-7 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            <FaEnvelope />
            Message
          </button>

          {showInvite && (
            <button
              onClick={onInvite}
              className="flex items-center gap-3 bg-indigo-900 text-white px-7 py-3 rounded-xl font-semibold hover:scale-105 transition"
            >
              <FaPaperPlane />
              Invite to Campaign
            </button>
          )}

        </div>

      </div>

    </div>
  );
}