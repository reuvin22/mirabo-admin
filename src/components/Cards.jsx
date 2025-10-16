import React from "react";

function Cards({ label, icon, color, numbers }) {

  return (
    <div
      className="flex justify-between items-center h-[110px] w-full sm:w-[280px] rounded-[8px] p-[20px] shadow-lg transition-transform transform hover:scale-105"
      style={{ backgroundColor: color }}
    >
      <div>
        <h4 className="text-white text-lg font-semibold mb-2">{label}</h4>
        <h2 className="text-3xl font-bold text-white tracking-wide">
          {numbers ?? 0}
        </h2>
      </div>
      <div className="text-[50px] opacity-60 text-white">{icon}</div>
    </div>
  );
}

export default Cards;
