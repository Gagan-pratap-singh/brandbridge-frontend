import { Star } from "lucide-react";
import type { Review } from "../../types/influencer";

interface ReviewCardProps {
  reviews: Review[];
}

export default function ReviewCard({
  reviews,
}: ReviewCardProps) {
  return (
    <div className="rounded-2xl bg-white shadow-sm p-6">
      <h2 className="text-base font-semibold text-slate-900 mb-4">
        Reviews
      </h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-xl border border-slate-100 p-4"
          >
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < review.rating
                      ? "text-amber-400"
                      : "text-slate-200"
                  }`}
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              "{review.comment}"
            </p>

            <div className="mt-3 flex justify-between items-center">
              <p className="text-xs font-medium text-slate-400">
                {review.brand}
              </p>

              <p className="text-xs text-slate-400">
                {review.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}