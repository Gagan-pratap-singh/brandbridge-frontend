import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: string;
  subtitle?: string;
  trend?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color = "bg-indigo-100 text-indigo-600",
  subtitle,
  trend,
}: StatCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-3">
            {value}
          </h2>

          {subtitle && (
            <p className="text-gray-500 text-sm mt-2">
              {subtitle}
            </p>
          )}

          {trend && (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              📈 {trend}
            </div>
          )}
        </div>

        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${color} group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}