import React from "react";
import { useNavigate } from "react-router-dom";

const KPI = ({ title, value, description, icon, bgColor, iconColor, rota }) => {

  const navigate = useNavigate();

  const redirecionarPorKPI = () => {
    if (rota) {

      if (title == "Anamneses Pendentes") {
        sessionStorage.setItem("KPI_ALUNO_SELECIONADA", true);
      }

      navigate(rota);
    }
  }

  return (
    <div className="bg-[var(--cor-secundaria)] rounded-xl shadow-sm p-6 flex justify-between items-center cursor-pointer hover:bg-[#eaeaea]" onClick={redirecionarPorKPI}>
      <div>
        <p className="text-[23px] font-medium text-gray-700">{title}</p>
        <p className="text-[23px] font-bold text-gray-900">{value}</p>
        <p className="text-[23px] text-gray-500 mt-1">{description}</p>
      </div>
      <div className={`${bgColor} p-4 rounded-full`}>
        <div className={`${iconColor} text-[28px]`}>{icon}</div>
      </div>
    </div>
  );
};

export default KPI;