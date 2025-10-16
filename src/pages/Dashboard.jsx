import React from "react";
import StatCard from "../components/Cards";
import { FaUsers, FaRobot } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import { FaUsersLine } from "react-icons/fa6";
import ApexCharts from "react-apexcharts";

function Dashboard() {
  const chartOptions = {
    chart: { id: "sales-chart", toolbar: { show: true } },
    title: {
      text: "Monthly Sales Overview",
      align: "center",
      style: { fontSize: "18px", color: "#333" },
    },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    yaxis: { title: { text: "Sales (in USD)" } },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#2563eb"],
    series: [{ name: "Sales", data: [1200, 1900, 3000, 2500, 3200, 4000] }],
  };

  return (
    <div className="min-h-screen bg-white p-5 md:p-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Dashboard
      </h1>

      <div className="flex flex-wrap gap-6 justify-start">
        <StatCard
          label="総管理者数"
          color="#1799b1"
          icon={<FaUsers />}
          numbers={5}
        />
        <StatCard
          label="総広告再生数"
          color="#23974a"
          icon={<RiAdvertisementFill />}
          numbers={5}
        />
        <StatCard
          label="総GPT応答数"
          color="#f4b300"
          icon={<FaRobot />}
          numbers={5}
        />
        <StatCard
          label="総ユーザー数"
          color="#d83b3b"
          icon={<FaUsersLine />}
          numbers={5}
        />
      </div>

      <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
        <ApexCharts
          options={chartOptions}
          series={chartOptions.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
}

export default Dashboard;
