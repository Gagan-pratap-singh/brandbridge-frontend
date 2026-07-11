import { useEffect, useState } from "react";
import { getMonthlyApplications } from "../../services/dashboard";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Chart() {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    loadChart();
  }, []);

  async function loadChart() {
    try {
      const data = await getMonthlyApplications();
      setBars(data);
    } catch (err) {
      console.error(err);
    }
  }

  const max = Math.max(...bars, 1);

  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold">
          Monthly Applications
        </h2>

        <span className="text-sm text-gray-500">
          This Year
        </span>

      </div>

      <div className="flex items-end justify-between h-72">

        {months.map((month, index) => {

          const value = bars[index] || 0;

          const height = (value / max) * 100;

          return (
            <div
              key={month}
              className="flex flex-col items-center flex-1"
            >

              <span className="text-xs mb-2 font-semibold">
                {value}
              </span>

              <div
                className="w-8 bg-indigo-600 rounded-t-xl hover:bg-indigo-700 transition"
                style={{
                  height: `${height}%`,
                  minHeight: value ? "12px" : "4px",
                }}
              />

              <span className="text-xs mt-3 text-gray-500">
                {month}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
}