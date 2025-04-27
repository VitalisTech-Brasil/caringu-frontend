import React from "react";

const KPI = ({ title, value, description, icon, bgColor, iconColor }) => {
  return (
    <div className="bg-[var(--cor-secundaria)] rounded-xl shadow-sm p-6 flex justify-between items-center">
      <div>
        <p className="text-sm font-medium text-gray-700">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
      <div className={`${bgColor} p-4 rounded-full`}>
        <div className={`${iconColor} text-3xl`}>{icon}</div>
      </div>
    </div>
  );
};

export default KPI;