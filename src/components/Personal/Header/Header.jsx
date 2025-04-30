import { Navbar, NavbarBrand } from "flowbite-react";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdOutlinePersonSearch } from "react-icons/md";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  // Define os ícones e textos com base na rota atual
  const pageConfig = {
    "/home": {
      icon: (
        <svg
          className="w-6 h-6 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      label: "Página Inicial",
    },
    "/gerenciar-alunos": {
      icon: <MdOutlinePersonSearch className="w-6 h-6 text-gray-800" />,
      label: "Gerenciar Alunos",
    },
    "/perfil": {
      icon: <HiOutlineUserCircle className="w-6 h-6 text-gray-800" />,
      label: "Perfil",
    },
  };

  const currentPage = pageConfig[location.pathname] || {
    icon: null,
    label: "Página Desconhecida",
  };

  return (
    <Navbar fluid className="navbar sticky top-0 z-10 bg-white">
      <NavbarBrand className="flex items-center gap-2">
        {currentPage.icon}
        <span className="self-center whitespace-nowrap text-xl font-semibold text-[#1D2D44]">
          {currentPage.label}
        </span>
      </NavbarBrand>
      {/* Notifications */}
      <div className="ml-auto flex items-center">
        <button
          type="button"
          className="p-2 text-gray-800 rounded-lg hover:text-gray-900 hover:bg-gray-200 mr-6"
        >
          <span className="sr-only">View notifications</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 14 20"
          >
            <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
          </svg>
        </button>
      </div>
    </Navbar>
  );
};

export default Header;