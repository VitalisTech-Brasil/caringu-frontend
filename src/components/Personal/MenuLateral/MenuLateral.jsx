import React, { useState, useEffect } from "react";
import { FaUserCircle, FaRegFileAlt } from "react-icons/fa";
import { IoHomeOutline, IoWalletOutline } from "react-icons/io5";
import { MdOutlinePersonSearch } from "react-icons/md";
import { CiDumbbell, CiFileOn } from "react-icons/ci";
import { BsCalendar } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import logo from "../../../assets/logos/caringu-logo-light.svg";

const MenuLateral = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTreinosOpen, setIsTreinosOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [nomePessoa, setNomePessoa] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");

  useEffect(() => {
    return () => {
      const usuario = sessionStorage.getItem("usuario");

      if (usuario) {
        const nomeSeparado = usuario.split(' ');
        
        const nome = nomeSeparado[0];
        const nomeFormatado = nome[0].toUpperCase() + nome.slice(1);
        
        const ultimoNome = nomeSeparado[nomeSeparado.length - 1];
        const ultimoNomeFormatado = ultimoNome[0].toUpperCase() + ultimoNome.slice(1);

        const tipo = sessionStorage.getItem("tipo");

        let nomeFinal = nomeFormatado + " " + ultimoNomeFormatado;

        if (nomeFinal.length > 13) {
          nomeFinal = nomeFormatado + " " + ultimoNomeFormatado[0] + ".";
        }

        setNomePessoa(nomeFinal);
        setTipoPessoa(tipo);
      }
    }
  }, [])


  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const getCurrentDay = () => {
    const today = new Date();
    return today.getDate(); // Retorna o dia atual
  };

  const menuItems = [
    { icon: <IoHomeOutline size={24} />, label: "Página Inicial", path: "/home" },
    { icon: <MdOutlinePersonSearch size={24} />, label: "Gerenciar Alunos", path: "/gerenciar-alunos" },
    {
      icon: <CiDumbbell size={24} />,
      label: "Treinos",
      path: "/treinos",
      children: [
        { icon: <CiFileOn size={20} />, label: "Gerenciar Treinos", path: "/gerenciar-treinos" },
        { icon: <FaRegFileAlt size={20} />, label: "Gerenciar Exercícios", path: "/gerenciar-exercicios" },
      ],
    },
    {
      icon: (
        <div className="relative flex items-center justify-center">
          <BsCalendar size={24} />
          <span className="absolute text-xs rounded-full px-1">
            {getCurrentDay()}
          </span>
        </div>
      ),
      label: "Agenda",
      path: "/agenda",
    },
    { icon: <IoWalletOutline size={24} />, label: "Planos", path: "/planos" },
    { icon: <CgProfile size={24} />, label: "Perfil", path: "/perfil" },
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
        style={{ minHeight: "4rem" }} // Adiciona uma altura mínima consistente
      >
        <div className="flex items-center gap-2">
          {isOpen && <img src={logo} alt="Logo CaringU" className="h-10 w-10" />}
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
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h14M1 6h14M1 11h7"
            />
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
                  : "hover:bg-[var(--azul-claro)]"
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
                {item.icon}
                <span className={`${!isOpen && "hidden"} whitespace-nowrap`}>
                  {item.label}
                </span>
              </div>
              {item.children && isOpen && (
                isTreinosOpen ? (
                  <FaChevronUp size={16} />
                ) : (
                  <FaChevronDown size={16} />
                )
              )}
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
                        : "hover:bg-[var(--azul-claro)]"
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
      <div className="mt-auto p-4">
        <button
          className="flex items-center gap-4 text-red-600 hover:bg-red-100 p-2 w-full rounded"
          onClick={handleLogout}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 6H3"
            />
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