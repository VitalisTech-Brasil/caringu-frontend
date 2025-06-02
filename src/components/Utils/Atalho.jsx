import React from "react";

const Atalho = ({ icon, label, onClick }) => {
  return (
    <div
      className="group border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-[var(--azul-claro)] hover:text-white transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="text-[28px] mb-2 [&_svg]:text-gray-800 group-hover:[&_svg]:text-white transition-colors">
        {icon}
        </div>
      <span className="text-[23px] font-semibold text-center">
        {label}
      </span>{" "}
    </div>
  );
};

export default Atalho;