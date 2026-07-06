export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-10">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mt-3 mb-8">
          Enter your email and we'll send you a reset link.
        </p>

        <input
          type="email"
          placeholder="you@example.com"
          className="
            w-full
            border
            rounded-xl
            p-3
            outline-none
            focus:ring-2
            focus:ring-indigo-500
            mb-6
          "
        />

        <button
          className="
            w-full
            bg-indigo-600
            text-white
            py-3
            rounded-xl
            hover:bg-indigo-700
            transition
          "
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
}