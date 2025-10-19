import React, { useState, useEffect } from "react";
import StatCard from "../components/Cards";
import { FaUsers, FaRobot } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import ApexCharts from "react-apexcharts";
import { totalRecordApi } from "../services/totalRecordService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Dashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [fetchAnswer, { data: answer, isFetching: loadingAnswer }] =
    totalRecordApi.endpoints.totalAnswer.useLazyQuery();
  const [fetchUsers, { data: users, isFetching: loadingUsers }] =
    totalRecordApi.endpoints.totalUser.useLazyQuery();
  const [fetchLineUsers, { data: lineUsers, isFetching: loadingLineUsers }] =
    totalRecordApi.endpoints.totalLineUser.useLazyQuery();

  // Fetch overall default data on mount
  useEffect(() => {
    fetchAnswer({});
    fetchUsers({});
    fetchLineUsers({});
  }, []);

  const handleFilter = () => {
    fetchAnswer({ start_date: startDate, end_date: endDate });
    fetchUsers({ start_date: startDate, end_date: endDate });
    fetchLineUsers({ start_date: startDate, end_date: endDate });
  };

  const chartSeries = [
    {
      name: "Count",
      data: [
        users?.user_count || 0,
        answer?.answers_count || 0,
        lineUsers?.users_count || 0,
      ],
    },
  ];

  const chartOptions = {
    chart: { id: "user-stats", toolbar: { show: false } },
    plotOptions: { bar: { horizontal: false, columnWidth: "50%" } },
    dataLabels: { enabled: true },
    xaxis: { categories: ["総管理者数", "総GPT応答数", "総ユーザー数"] },
    yaxis: { title: { text: "Count" } },
    colors: ["#1799b1", "#f4b300", "#d83b3b"],
    title: {
      text: "Line Mini Stats Overview",
      align: "center",
      style: { fontSize: "18px", color: "#333" },
    },
  };

  return (
    <div className="min-h-screen bg-white p-5 md:p-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

      {/* Date Range Picker */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded w-full sm:w-auto"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer w-full sm:w-auto"
        >
          Filter
        </button>
      </div>

      {/* Stat Cards */}
      <div className="flex flex-wrap gap-6 justify-start">
        <StatCard
          label="総管理者数"
          color="#1799b1"
          icon={<FaUsers />}
          numbers={
            loadingUsers ? (
              <Skeleton width={80} style={{ filter: "blur(3px)" }} />
            ) : (
              users?.user_count || 0
            )
          }
        />
        <StatCard
          label="総GPT応答数"
          color="#f4b300"
          icon={<FaRobot />}
          numbers={
            loadingAnswer ? (
              <Skeleton width={80} style={{ filter: "blur(3px)" }} />
            ) : (
              answer?.answers_count || 0
            )
          }
        />
        <StatCard
          label="総ユーザー数"
          color="#d83b3b"
          icon={<FaUsersLine />}
          numbers={
            loadingLineUsers ? (
              <Skeleton width={80} style={{ filter: "blur(3px)" }} />
            ) : (
              lineUsers?.users_count || 0
            )
          }
        />
      </div>

      {/* Chart */}
      <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
        <ApexCharts
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={window.innerWidth > 768 ? 500 : 350} // taller on larger screens
        />
      </div>
    </div>
  );
}

export default Dashboard;
