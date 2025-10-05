import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaChevronDown, FaChevronUp, FaUserCircle, FaTimes } from "react-icons/fa";
import logo from "../../assets/logos/caringu-logotipo-light.svg";
import { logout } from "../../utils/authUtils";

const MenuLateral = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTreinosOpen, setIsTreinosOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const handleLogout = async () => {
    await logout();
  };

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const navLinks = [
    { label: "Home", section: "home" },
    { label: "Sobre nós", section: "sobre" },
    { label: "Serviços", section: "servicos" },
    { label: "Fale conosco", section: "fale" },
  ];

  if (!isMobile) return null;

  return (
    <>
      {/* Botão flutuante para abrir menu */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-4 left-4 z-50 bg-transparent p-2 rounded shadow-lg"
        >
          <FaBars className="text-white" size={24} />
        </button>
      )}

      {/* Menu lateral */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#0007] z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <img src={logo} alt="Logo" className="h-10" />
              <button onClick={() => setIsOpen(false)}>
                <FaTimes size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <button
                  key={item.section}
                  onClick={() => scrollToSection(item.section)}
                  className="w-full text-left px-4 py-2 rounded hover:bg-gray-200"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => { setIsOpen(false); navigate("/login"); }}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-200"
              >
                Entrar
              </button>
              <button
                onClick={() => { setIsOpen(false); navigate("/cadastro"); }}
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-200"
              >
                Inscreva-se
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
            >
              Sair
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default MenuLateral;