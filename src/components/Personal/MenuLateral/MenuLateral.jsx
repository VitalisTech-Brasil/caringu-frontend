import React, { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaChevronUp,
  FaUserCircle,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logos/caringu-logo-light.svg";



const MenuLateral = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTreinosOpen, setIsTreinosOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [nomePessoa, setNomePessoa] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");

  useEffect(() => {
    const usuario = sessionStorage.getItem("usuario");

    if (usuario) {
      const nomeSeparado = usuario.split(" ");

      const nome = nomeSeparado[0];
      const nomeFormatado = nome[0].toUpperCase() + nome.slice(1);

      const ultimoNome = nomeSeparado[nomeSeparado.length - 1];
      const ultimoNomeFormatado =
        ultimoNome[0].toUpperCase() + ultimoNome.slice(1);

      const tipo = sessionStorage.getItem("tipo");

      let nomeFinal = nomeFormatado + " " + ultimoNomeFormatado;

      if (nomeFinal.length > 13) {
        nomeFinal = nomeFormatado + " " + ultimoNomeFormatado[0] + ".";
      }

      setNomePessoa(nomeFinal);
      setTipoPessoa(tipo);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const getCurrentDay = () => {
    const today = new Date();
    return today.getDate(); // Retorna o dia atual
  };

  const menuItems = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-800" viewBox="0 0 31 30" fill="none">
        <path d="M11.89 3.55069L5.03834 8.80069C3.89427 9.67569 2.96631 11.5382 2.96631 12.9507V22.2132C2.96631 25.1132 5.36885 27.4882 8.318 27.4882H23.0383C25.9875 27.4882 28.39 25.1132 28.39 22.2257V13.1257C28.39 11.6132 27.3604 9.67569 26.1019 8.81319L18.246 3.40069C16.4663 2.17569 13.6061 2.23819 11.89 3.55069Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.678 22.4878V18.7378" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Página Inicial",
      path: "/home",
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-800" viewBox="0 0 31 30" fill="none">
        <path d="M15.678 15.0005C19.1882 15.0005 22.0339 12.2023 22.0339 8.75049C22.0339 5.29871 19.1882 2.50049 15.678 2.50049C12.1677 2.50049 9.32202 5.29871 9.32202 8.75049C9.32202 12.2023 12.1677 15.0005 15.678 15.0005Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.75854 27.5005C4.75854 22.663 9.65265 18.7505 15.6781 18.7505" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23.5595 26.7505C25.8061 26.7505 27.6273 24.9596 27.6273 22.7505C27.6273 20.5414 25.8061 18.7505 23.5595 18.7505C21.3129 18.7505 19.4917 20.5414 19.4917 22.7505C19.4917 24.9596 21.3129 26.7505 23.5595 26.7505Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28.3901 27.5005L27.1189 26.2505" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Gerenciar Alunos",
      path: "/gerenciar-alunos",
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-800" viewBox="0 0 30 27" fill="none">
        <path d="M24.375 6.00049H26.25C26.7675 6.00049 27.1875 6.56049 27.1875 7.25049V19.7505C27.1875 20.4405 26.7675 21.0005 26.25 21.0005H24.375C23.8575 21.0005 23.4375 20.4405 23.4375 19.7505V7.25049C23.4375 6.56049 23.8575 6.00049 24.375 6.00049Z" stroke="#1D2D44" strokeWidth="2" />
        <path d="M20.625 1.00049H22.5C23.0175 1.00049 23.4375 1.56049 23.4375 2.25049V24.7505C23.4375 25.4405 23.0175 26.0005 22.5 26.0005H20.625C20.1075 26.0005 19.6875 25.4405 19.6875 24.7505V2.25049C19.6875 1.56049 20.1075 1.00049 20.625 1.00049Z" stroke="#1D2D44" strokeWidth="2" />
        <path d="M7.5 1.00049H9.375C9.8925 1.00049 10.3125 1.56049 10.3125 2.25049V24.7505C10.3125 25.4405 9.8925 26.0005 9.375 26.0005H7.5C6.9825 26.0005 6.5625 25.4405 6.5625 24.7505V2.25049C6.5625 1.56049 6.9825 1.00049 7.5 1.00049Z" stroke="#1D2D44" strokeWidth="2" />
        <path d="M3.75 6.00049H5.625C6.1425 6.00049 6.5625 6.56049 6.5625 7.25049V19.7505C6.5625 20.4405 6.1425 21.0005 5.625 21.0005H3.75C3.2325 21.0005 2.8125 20.4405 2.8125 19.7505V7.25049C2.8125 6.56049 3.2325 6.00049 3.75 6.00049Z" stroke="#1D2D44" strokeWidth="2" />
        <path d="M27.1875 13.5005H30" stroke="#1D2D44" strokeWidth="2" />
        <path d="M10.3125 13.5005H19.6875" stroke="#1D2D44" strokeWidth="2" />
        <path d="M0 13.5005H2.8125" stroke="#1D2D44" strokeWidth="2" />
      </svg>,
      label: "Treinos",
      path: "/treinos",
      children: [
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-800" viewBox="0 0 30 31" fill="none">
            <path d="M27.5 14.25V21.75C27.5 26.75 26.25 28 21.25 28H8.75C3.75 28 2.5 26.75 2.5 21.75V9.25C2.5 4.25 3.75 3 8.75 3H10.625C12.5 3 12.9125 3.55 13.625 4.5L15.5 7C15.975 7.625 16.25 8 17.5 8H21.25C26.25 8 27.5 9.25 27.5 14.25Z" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" />
            <path d="M10 3H21.25C23.75 3 25 4.25 25 6.75V8.475" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>,
          label: "Gerenciar Treinos",
          path: "/gerenciar-treinos",
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-800" viewBox="0 0 30 31" fill="none">
            <path d="M25 10.8125V23C25 26.75 22.7625 28 20 28H10C7.2375 28 5 26.75 5 23V10.8125C5 6.75 7.2375 5.8125 10 5.8125C10 6.5875 10.3125 7.2875 10.825 7.8C11.3375 8.3125 12.0375 8.625 12.8125 8.625H17.1875C18.7375 8.625 20 7.3625 20 5.8125C22.7625 5.8125 25 6.75 25 10.8125Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 5.8125C20 7.3625 18.7375 8.625 17.1875 8.625H12.8125C12.0375 8.625 11.3375 8.3125 10.825 7.8C10.3125 7.2875 10 6.5875 10 5.8125C10 4.2625 11.2625 3 12.8125 3H17.1875C17.9625 3 18.6625 3.3125 19.175 3.825C19.6875 4.3375 20 5.0375 20 5.8125Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 16.75H15" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 21.75H20" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>,
          label: "Gerenciar Exercícios",
          path: "/gerenciar-exercicios",
        },
      ],
    },
    {
      icon: (
        <div className="relative flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-800" viewBox="0 0 30 30" fill="none">
            <path d="M27.4124 8.45001L23.1999 25.3625C22.8999 26.625 21.7749 27.5 20.4749 27.5H4.04992C2.16242 27.5 0.812438 25.6499 1.37494 23.8374L6.63743 6.93756C6.99993 5.76256 8.08745 4.94995 9.31245 4.94995H24.6874C25.8749 4.94995 26.8624 5.67496 27.2749 6.67496C27.5124 7.21246 27.5624 7.82501 27.4124 8.45001Z" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" />
            <path d="M20 27.5H25.975C27.5875 27.5 28.85 26.1375 28.7375 24.525L27.5 7.5" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.1001 7.97513L13.4001 2.5752" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20.4751 7.98746L21.6501 2.5625" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="absolute text-xs font-bold text-200 rounded-full px-1 top-[30%] text-gray-800">
            {getCurrentDay()}
          </span>
        </div>
      ),
      label: "Agenda",
      path: "/agenda",
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-800" viewBox="0 0 30 30" fill="none">
        <path d="M27.5 15.0005V21.2505C27.5 25.0005 25 27.5005 21.25 27.5005H8.75C5 27.5005 2.5 25.0005 2.5 21.2505V15.0005C2.5 11.6005 4.55 9.22549 7.7375 8.82549C8.0625 8.77549 8.4 8.75049 8.75 8.75049H21.25C21.575 8.75049 21.8875 8.76297 22.1875 8.81297C25.4125 9.18797 27.5 11.5755 27.5 15.0005Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.1893 8.81299C21.8893 8.76299 21.5768 8.7505 21.2518 8.7505H8.75176C8.40176 8.7505 8.06426 8.7755 7.73926 8.8255C7.91426 8.4755 8.16426 8.1505 8.46426 7.8505L12.5268 3.77549C14.2393 2.07549 17.0143 2.07549 18.7268 3.77549L20.9143 5.98801C21.7143 6.77551 22.1393 7.77549 22.1893 8.81299Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27.5 15.6255H23.75C22.375 15.6255 21.25 16.7505 21.25 18.1255C21.25 19.5005 22.375 20.6255 23.75 20.6255H27.5" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>, label: "Planos", path: "/planos"
    },
    { icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-800" viewBox="0 0 30 30" fill="none">
      <path d="M15 15.0005C18.4518 15.0005 21.25 12.2023 21.25 8.75049C21.25 5.29871 18.4518 2.50049 15 2.50049C11.5482 2.50049 8.75 5.29871 8.75 8.75049C8.75 12.2023 11.5482 15.0005 15 15.0005Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M25.7374 27.5005C25.7374 22.663 20.9249 18.7505 14.9999 18.7505C9.07495 18.7505 4.26245 22.663 4.26245 27.5005" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>, label: "Perfil", path: "/perfil" },
  ];

  const toggleMenu = () => {
    if (!isOpen) {
      setIsTreinosOpen(false);
    }
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`sticky top-0 h-screen bg-[var(--cor-secundaria)] text-black transition-width duration-300 ${isOpen ? "w-64" : "w-18"
        } flex flex-col`}
      style={{
        minWidth: isOpen ? "16rem" : "4.5rem",
      }}
    >
      {/* Header do Menu */}
      <div
        className="flex items-center justify-between p-4 border-b border-gray-300"
        style={{ minHeight: "4.8rem" }} // Adiciona uma altura mínima consistente
      >
        <div className="flex items-center gap-2">
          {isOpen && (
            <img src={logo} alt="Logo CaringU" className="h-10 w-10" />
          )}
          <h1
            className={`text-2xl font-bold whitespace-nowrap ${!isOpen && "hidden"
              }`}
          >
            CaringU
          </h1>
        </div>
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 39 39" fill="none">
            <path d="M4.875 11.375H34.125" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M4.875 19.5H34.125" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M4.875 27.625H34.125" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Informações do Usuário */}
      <div
        className="flex items-center gap-4 p-4 border-b border-gray-300"
        style={{ minHeight: "5rem" }}
      >
        <FaUserCircle size={40} className="flex-shrink-0" />
        <div className={`${!isOpen && "hidden"} flex flex-col`}>
          <p className="text-lg font-bold">{nomePessoa}</p>
          <p className="text-sm">{tipoPessoa}</p>
        </div>
      </div>

      {/* Itens do Menu */}
      <ul className="flex flex-col gap-4 p-4 border-b border-gray-300 flex-grow">
        {menuItems.map((item, index) => (
          <li key={index} className="flex flex-col">
            <div
              className={`flex items-center justify-between gap-4 p-2 rounded cursor-pointer ${location.pathname === item.path
                ? "bg-[var(--azul-escuro)] text-[var(--cor-secundaria)]"
                : "hover:bg-[#1D2D4417]"
                }`}
              onClick={() => {
                if (item.label === "Treinos") {
                  if (!isOpen) {
                    setIsOpen(true); // Abre o menu lateral
                    setIsTreinosOpen(true); // Abre o dropdown de Treinos
                  } else {
                    setIsTreinosOpen(!isTreinosOpen); // Alterna o estado do dropdown
                  }
                } else if (!item.children) {
                  navigate(item.path);
                }
              }}
              title={!isOpen ? item.label : ""}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`${location.pathname === item.path ? "filter invert" : ""
                    }`}
                >
                  {item.icon}
                </div>
                <span className={`${!isOpen && "hidden"} whitespace-nowrap`}>
                  {item.label}
                </span>
              </div>
              {item.children &&
                isOpen &&
                (isTreinosOpen ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                ))}
            </div>
            {item.children && (
              <ul
                className={`ml-6 mt-2 overflow-hidden transition-[max-height] duration-300 ease-in-out ${isTreinosOpen && isOpen ? "max-h-40" : "max-h-0"
                  }`}
              >
                {item.children.map((child, childIndex) => (
                  <li
                    key={childIndex}
                    className={`flex items-center p-2 rounded cursor-pointer ${location.pathname === child.path
                      ? "bg-[var(--azul-escuro)] text-[var(--cor-secundaria)]"
                      : "hover:bg-[#1D2D4417]"
                      }`}
                    onClick={() => navigate(child.path)}
                    title={!isOpen ? child.label : ""}
                  >
                    <div className="flex items-center gap-2">
                      {child.icon}
                      <span
                        className={`flex-grow ${!isOpen && "hidden"
                          } whitespace-nowrap text-left`}
                      >
                        {child.label}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Footer - Sair */}
      <div className="mt-auto p-2 bg-[#B41F1F]">
        <button
          className="flex items-center gap-4 text-white p-2 w-full rounded cursor-pointer"
          onClick={handleLogout}
        >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 35 35" fill="none">
          <path d="M25.4331 21.3207L29.1664 17.5873L25.4331 13.854" stroke="#FFFDF6" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14.2334 17.5874H29.0646" stroke="#FFFDF6" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17.1501 29.1668C10.7042 29.1668 5.4834 24.7918 5.4834 17.5002C5.4834 10.2085 10.7042 5.8335 17.1501 5.8335" stroke="#FFFDF6" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
          <span className={`${!isOpen && "hidden"} whitespace-nowrap`}>
            Sair
          </span>
        </button>
      </div>
    </aside>
  );
};

export default MenuLateral;