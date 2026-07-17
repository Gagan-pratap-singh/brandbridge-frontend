import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import type { AudienceSlice } from "../../types/influencer";

interface AnalyticsCardProps {
  followerGrowth: {
    month: string;
    followers: number;
  }[];

  engagement: {
    month: string;
    rate: number;
  }[];

  age: AudienceSlice[];
  countries: AudienceSlice[];
  gender: AudienceSlice[];
}

function AudienceBar({
  label,
  value,
}: AudienceSlice) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-600 mb-1">
        <span>{label}</span>
        <span className="font-medium">{value}%</span>
      </div>

      <div className="h-1.5 w-full rounded-full bg-slate-100">
        <div
          className="h-1.5 rounded-full bg-indigo-500"
          style={{
            width: `${value}%`,
          }}
        />
      </div>
    </div>
  );
}

export default function AnalyticsCard({
  followerGrowth,
  engagement,
  age,
 countries,
  gender,
}: AnalyticsCardProps) {
  return (
    <div className="rounded-2xl bg-white shadow-sm p-6">
      <h2 className="text-base font-semibold text-slate-900 mb-4">
        Analytics
      </h2>

      <div className="grid sm:grid-cols-2 gap-6 mb-6">

        <div>
          <p className="text-xs font-medium text-slate-500 mb-2">
            Follower Growth
          </p>

          <ResponsiveContainer
            width="100%"
            height={160}
          >
            <LineChart data={followerGrowth}>
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis hide />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="followers"
                stroke="#6366F1"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500 mb-2">
            Engagement Rate
          </p>

          <ResponsiveContainer
            width="100%"
            height={160}
          >
            <BarChart data={engagement}>
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis hide />

              <Tooltip />

              <Bar
                dataKey="rate"
                fill="#6366F1"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      <div className="grid sm:grid-cols-3 gap-6">

        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-500">
            Audience Age
          </p>

          {age.map((item) => (
            <AudienceBar
              key={item.label}
              {...item}
            />
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-500">
            Countries
          </p>

          {countries.map((item) => (
            <AudienceBar
              key={item.label}
              {...item}
            />
          ))}
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-500">
            Gender
          </p>

          {gender.map((item) => (
            <AudienceBar
              key={item.label}
              {...item}
            />
          ))}
        </div>

      </div>
    </div>
  );
}