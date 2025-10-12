import React from "react";
import ApexCharts from "react-apexcharts";

function Dashboard() {
  // Dummy chart data
  const chartOptions = {
    chart: {
      id: "sales-chart",
      toolbar: {
        show: true, // enables the built-in download/export toolbar
      },
    },
    title: {
      text: "Monthly Sales Overview",
      align: "center",
      style: { fontSize: "18px", color: "#333" },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      title: { text: "Month" },
    },
    yaxis: {
      title: { text: "Sales (in USD)" },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#2563eb"],
    series: [
      {
        name: "Sales",
        data: [1200, 1900, 3000, 2500, 3200, 4000],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5 md:p-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>

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
