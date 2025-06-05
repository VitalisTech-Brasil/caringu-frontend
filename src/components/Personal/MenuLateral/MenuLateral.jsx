import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaChevronDown, FaChevronUp, FaUserCircle, FaTimes } from "react-icons/fa";
import logo from "../../../../src/assets/logos/caringu-logotipo-light.svg";

const MenuLateral = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTreinosOpen, setIsTreinosOpen] = useState(false);
  const [nomePessoa, setNomePessoa] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const usuario = sessionStorage.getItem("usuario");
    const tipo = sessionStorage.getItem("tipo");
    if (usuario) {
      const partes = usuario.split(" ");
      let nomeFinal = `${partes[0]} ${partes[partes.length - 1]}`;
      if (nomeFinal.length > 13) {
        nomeFinal = `${partes[0]} ${partes[partes.length - 1][0]}.`;
      }
      setNomePessoa(nomeFinal);
      setTipoPessoa(tipo ?? "");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const menuItems = [
    {
      label: "Home",
      path: "/home",
    },
    {
      label: "Sobre nós",
      path: "/sobre",
    },
    {
      label: "Serviços",
      path: "/servicos",
    },
    {
      label: "Fale conosco",
      path: "/fale",
    },
     {
      label: "Inscreva-se",
      path: "/cadastro",
    },
     {
      label: "Entrar",
      path: "/login",
    },
  ];

  const renderMenuItems = () =>
    menuItems.map((item) => (
      <div key={item.label} className="mt-2">
        <button
          onClick={() =>
            item.children
              ? setIsTreinosOpen(!isTreinosOpen)
              : navigate(item.path)
          }
          className={`w-full text-left px-4 py-2 rounded hover:bg-gray-200 ${
            location.pathname === item.path ? "bg-gray-300" : ""
          }`}
        >
          {item.label}
          {item.children &&
            (isTreinosOpen ? <FaChevronUp className="inline ml-2" /> : <FaChevronDown className="inline ml-2" />)}
        </button>
        {item.children && isTreinosOpen && (
          <div className="ml-6 mt-1">
            {item.children.map((child) => (
              <button
                key={child.label}
                onClick={() => navigate(child.path)}
                className={`block w-full text-left px-4 py-1 text-sm hover:bg-gray-200 ${
                  location.pathname === child.path ? "bg-gray-300" : ""
                }`}
              >
                {child.label}
              </button>
            ))}
          </div>
        )}
      </div>
    ));

  if (!isMobile) return null; 

  return (
    <>
      {/* Botão flutuante para abrir menu */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 p-2"
        >
          <FaBars size={24} color="#fffdf6"/>
        </button>
      )}

      {/* Menu lateral */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <img src={logo} alt="Logo" className="h-10" />
            <button onClick={() => setIsOpen(false)}>
              <FaTimes size={24} />
            </button>
          </div>

          {renderMenuItems()}

        </div>
      )}
    </>
  );
};

export default MenuLateral;
