import { Navbar, NavbarBrand } from "flowbite-react";
import { useLocation } from "react-router-dom";



const Header = () => {
  const location = useLocation();

  // Define os ícones e textos com base na rota atual
  const pageConfig = {
    "/home": {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 31 30" fill="none">
          <path d="M11.89 3.55069L5.03834 8.80069C3.89427 9.67569 2.96631 11.5382 2.96631 12.9507V22.2132C2.96631 25.1132 5.36885 27.4882 8.318 27.4882H23.0383C25.9875 27.4882 28.39 25.1132 28.39 22.2257V13.1257C28.39 11.6132 27.3604 9.67569 26.1019 8.81319L18.246 3.40069C16.4663 2.17569 13.6061 2.23819 11.89 3.55069Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.678 22.4878V18.7378" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: "Página Inicial",
    },
    "/gerenciar-alunos": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 31 30" fill="none">
        <path d="M15.678 15.0005C19.1882 15.0005 22.0339 12.2023 22.0339 8.75049C22.0339 5.29871 19.1882 2.50049 15.678 2.50049C12.1677 2.50049 9.32202 5.29871 9.32202 8.75049C9.32202 12.2023 12.1677 15.0005 15.678 15.0005Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.75854 27.5005C4.75854 22.663 9.65265 18.7505 15.6781 18.7505" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23.5595 26.7505C25.8061 26.7505 27.6273 24.9596 27.6273 22.7505C27.6273 20.5414 25.8061 18.7505 23.5595 18.7505C21.3129 18.7505 19.4917 20.5414 19.4917 22.7505C19.4917 24.9596 21.3129 26.7505 23.5595 26.7505Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28.3901 27.5005L27.1189 26.2505" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Gerenciar Alunos",
    },
    "/gerenciar-treinos": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 30 31" fill="none">
        <path d="M27.5 14.25V21.75C27.5 26.75 26.25 28 21.25 28H8.75C3.75 28 2.5 26.75 2.5 21.75V9.25C2.5 4.25 3.75 3 8.75 3H10.625C12.5 3 12.9125 3.55 13.625 4.5L15.5 7C15.975 7.625 16.25 8 17.5 8H21.25C26.25 8 27.5 9.25 27.5 14.25Z" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" />
        <path d="M10 3H21.25C23.75 3 25 4.25 25 6.75V8.475" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Gerenciar Treinos",
    },
    "/gerenciar-exercicios": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 30 31" fill="none">
        <path d="M25 10.8125V23C25 26.75 22.7625 28 20 28H10C7.2375 28 5 26.75 5 23V10.8125C5 6.75 7.2375 5.8125 10 5.8125C10 6.5875 10.3125 7.2875 10.825 7.8C11.3375 8.3125 12.0375 8.625 12.8125 8.625H17.1875C18.7375 8.625 20 7.3625 20 5.8125C22.7625 5.8125 25 6.75 25 10.8125Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 5.8125C20 7.3625 18.7375 8.625 17.1875 8.625H12.8125C12.0375 8.625 11.3375 8.3125 10.825 7.8C10.3125 7.2875 10 6.5875 10 5.8125C10 4.2625 11.2625 3 12.8125 3H17.1875C17.9625 3 18.6625 3.3125 19.175 3.825C19.6875 4.3375 20 5.0375 20 5.8125Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 16.75H15" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 21.75H20" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Gerenciar Exercícios",
    },
    "/agenda": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 30 30" fill="none">
        <path d="M27.4124 8.45001L23.1999 25.3625C22.8999 26.625 21.7749 27.5 20.4749 27.5H4.04992C2.16242 27.5 0.812438 25.6499 1.37494 23.8374L6.63743 6.93756C6.99993 5.76256 8.08745 4.94995 9.31245 4.94995H24.6874C25.8749 4.94995 26.8624 5.67496 27.2749 6.67496C27.5124 7.21246 27.5624 7.82501 27.4124 8.45001Z" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" />
        <path d="M20 27.5H25.975C27.5875 27.5 28.85 26.1375 28.7375 24.525L27.5 7.5" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12.1001 7.97513L13.4001 2.5752" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20.4751 7.98746L21.6501 2.5625" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Agenda",
    },
    "/planos": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 30 30" fill="none">
        <path d="M27.5 15.0005V21.2505C27.5 25.0005 25 27.5005 21.25 27.5005H8.75C5 27.5005 2.5 25.0005 2.5 21.2505V15.0005C2.5 11.6005 4.55 9.22549 7.7375 8.82549C8.0625 8.77549 8.4 8.75049 8.75 8.75049H21.25C21.575 8.75049 21.8875 8.76297 22.1875 8.81297C25.4125 9.18797 27.5 11.5755 27.5 15.0005Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.1893 8.81299C21.8893 8.76299 21.5768 8.7505 21.2518 8.7505H8.75176C8.40176 8.7505 8.06426 8.7755 7.73926 8.8255C7.91426 8.4755 8.16426 8.1505 8.46426 7.8505L12.5268 3.77549C14.2393 2.07549 17.0143 2.07549 18.7268 3.77549L20.9143 5.98801C21.7143 6.77551 22.1393 7.77549 22.1893 8.81299Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27.5 15.6255H23.75C22.375 15.6255 21.25 16.7505 21.25 18.1255C21.25 19.5005 22.375 20.6255 23.75 20.6255H27.5" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Planos",
    },
    "/procurando-personal": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 45 45" fill="none">
        <path d="M22.5 22.5C27.6777 22.5 31.875 18.3027 31.875 13.125C31.875 7.94733 27.6777 3.75 22.5 3.75C17.3223 3.75 13.125 7.94733 13.125 13.125C13.125 18.3027 17.3223 22.5 22.5 22.5Z" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.39453 41.25C6.39453 33.9938 13.6133 28.125 22.5008 28.125" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34.125 40.125C37.4387 40.125 40.125 37.4387 40.125 34.125C40.125 30.8113 37.4387 28.125 34.125 28.125C30.8113 28.125 28.125 30.8113 28.125 34.125C28.125 37.4387 30.8113 40.125 34.125 40.125Z" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M41.25 41.25L39.375 39.375" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label:"Personal Trainers",

    },
    "/perfil-personal": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 30 30" fill="none">
        <path d="M27.5 15.0005V21.2505C27.5 25.0005 25 27.5005 21.25 27.5005H8.75C5 27.5005 2.5 25.0005 2.5 21.2505V15.0005C2.5 11.6005 4.55 9.22549 7.7375 8.82549C8.0625 8.77549 8.4 8.75049 8.75 8.75049H21.25C21.575 8.75049 21.8875 8.76297 22.1875 8.81297C25.4125 9.18797 27.5 11.5755 27.5 15.0005Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.1893 8.81299C21.8893 8.76299 21.5768 8.7505 21.2518 8.7505H8.75176C8.40176 8.7505 8.06426 8.7755 7.73926 8.8255C7.91426 8.4755 8.16426 8.1505 8.46426 7.8505L12.5268 3.77549C14.2393 2.07549 17.0143 2.07549 18.7268 3.77549L20.9143 5.98801C21.7143 6.77551 22.1393 7.77549 22.1893 8.81299Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27.5 15.6255H23.75C22.375 15.6255 21.25 16.7505 21.25 18.1255C21.25 19.5005 22.375 20.6255 23.75 20.6255H27.5" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Planos",
    },
    "/solicitacoes-pendentes": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 30 30" fill="none">
        <path d="M27.5 15.0005V21.2505C27.5 25.0005 25 27.5005 21.25 27.5005H8.75C5 27.5005 2.5 25.0005 2.5 21.2505V15.0005C2.5 11.6005 4.55 9.22549 7.7375 8.82549C8.0625 8.77549 8.4 8.75049 8.75 8.75049H21.25C21.575 8.75049 21.8875 8.76297 22.1875 8.81297C25.4125 9.18797 27.5 11.5755 27.5 15.0005Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.1893 8.81299C21.8893 8.76299 21.5768 8.7505 21.2518 8.7505H8.75176C8.40176 8.7505 8.06426 8.7755 7.73926 8.8255C7.91426 8.4755 8.16426 8.1505 8.46426 7.8505L12.5268 3.77549C14.2393 2.07549 17.0143 2.07549 18.7268 3.77549L20.9143 5.98801C21.7143 6.77551 22.1393 7.77549 22.1893 8.81299Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27.5 15.6255H23.75C22.375 15.6255 21.25 16.7505 21.25 18.1255C21.25 19.5005 22.375 20.6255 23.75 20.6255H27.5" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Planos",
    },
    "/perfil": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 30 30" fill="none">
        <path d="M15 15.0005C18.4518 15.0005 21.25 12.2023 21.25 8.75049C21.25 5.29871 18.4518 2.50049 15 2.50049C11.5482 2.50049 8.75 5.29871 8.75 8.75049C8.75 12.2023 11.5482 15.0005 15 15.0005Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M25.7374 27.5005C25.7374 22.663 20.9249 18.7505 14.9999 18.7505C9.07495 18.7505 4.26245 22.663 4.26245 27.5005" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Perfil",
    },
    "/relatorio-treino/*": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 45 45" fill="none">
        <path d="M30.9375 17.8125L23.0625 25.6875L20.0625 21.1875L14.0625 27.1875" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27.1875 17.8125H30.9375V21.5625" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.875 41.25H28.125C37.5 41.25 41.25 37.5 41.25 28.125V16.875C41.25 7.5 37.5 3.75 28.125 3.75H16.875C7.5 3.75 3.75 7.5 3.75 16.875V28.125C3.75 37.5 7.5 41.25 16.875 41.25Z" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Relatórios",
    },
    "/dashboard/*": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 45 45" fill="none">
        <path d="M30.9375 17.8125L23.0625 25.6875L20.0625 21.1875L14.0625 27.1875" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27.1875 17.8125H30.9375V21.5625" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.875 41.25H28.125C37.5 41.25 41.25 37.5 41.25 28.125V16.875C41.25 7.5 37.5 3.75 28.125 3.75H16.875C7.5 3.75 3.75 7.5 3.75 16.875V28.125C3.75 37.5 7.5 41.25 16.875 41.25Z" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Relatórios",
    },
    "/relatorios/registro-corporal/*": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 45 45" fill="none">
        <path d="M30.9375 17.8125L23.0625 25.6875L20.0625 21.1875L14.0625 27.1875" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27.1875 17.8125H30.9375V21.5625" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.875 41.25H28.125C37.5 41.25 41.25 37.5 41.25 28.125V16.875C41.25 7.5 37.5 3.75 28.125 3.75H16.875C7.5 3.75 3.75 7.5 3.75 16.875V28.125C3.75 37.5 7.5 41.25 16.875 41.25Z" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Relatórios",
    },
    "/perfil-aluno/*": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 31 30" fill="none">
        <path d="M15.678 15.0005C19.1882 15.0005 22.0339 12.2023 22.0339 8.75049C22.0339 5.29871 19.1882 2.50049 15.678 2.50049C12.1677 2.50049 9.32202 5.29871 9.32202 8.75049C9.32202 12.2023 12.1677 15.0005 15.678 15.0005Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.75854 27.5005C4.75854 22.663 9.65265 18.7505 15.6781 18.7505" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23.5595 26.7505C25.8061 26.7505 27.6273 24.9596 27.6273 22.7505C27.6273 20.5414 25.8061 18.7505 23.5595 18.7505C21.3129 18.7505 19.4917 20.5414 19.4917 22.7505C19.4917 24.9596 21.3129 26.7505 23.5595 26.7505Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28.3901 27.5005L27.1189 26.2505" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Gerenciar Alunos",
    },
    "/criar-treino": {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 30 31" fill="none">
        <path d="M27.5 14.25V21.75C27.5 26.75 26.25 28 21.25 28H8.75C3.75 28 2.5 26.75 2.5 21.75V9.25C2.5 4.25 3.75 3 8.75 3H10.625C12.5 3 12.9125 3.55 13.625 4.5L15.5 7C15.975 7.625 16.25 8 17.5 8H21.25C26.25 8 27.5 9.25 27.5 14.25Z" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" />
        <path d="M10 3H21.25C23.75 3 25 4.25 25 6.75V8.475" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      </svg>,
      label: "Gerenciar Alunos",
    },
  };

  // Função auxiliar para encontrar a rota correspondente
  const getCurrentPage = () => {
    const path = location.pathname;

    // Tenta encontrar uma correspondência exata
    if (pageConfig[path]) return pageConfig[path];

    // Tenta encontrar por prefixo (para rotas com parâmetros dinâmicos)
    const matchKey = Object.keys(pageConfig).find((key) =>
      key.endsWith("/*") && path.startsWith(key.replace("/*", ""))
    );

    return matchKey ? pageConfig[matchKey] : { icon: null, label: "Página Desconhecida" };
  };

  const currentPage = getCurrentPage();


  return (
    <Navbar fluid className="navbar sticky h-[4.8rem] z-10 bg-white border-b-[1px] dark:border-gray-300 pt-4.5">
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
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 45 47" fill="none">
            <path d="M22.5374 5.69922C16.3311 5.69922 11.2874 10.9671 11.2874 17.4492V23.1088C11.2874 24.3034 10.7999 26.1246 10.2186 27.143L8.06236 30.8834C6.73111 33.1942 7.64986 35.7596 10.0874 36.6213C18.1686 39.4413 26.8874 39.4413 34.9686 36.6213C37.2374 35.838 38.2311 33.0376 36.9936 30.8834L34.8374 27.143C34.2749 26.1246 33.7874 24.3034 33.7874 23.1088V17.4492C33.7874 10.9867 28.7249 5.69922 22.5374 5.69922Z" fill="#1D2D44" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M26.0059 6.26633C25.4246 6.09008 24.8246 5.95299 24.2059 5.87466C22.4059 5.63966 20.6809 5.77674 19.0684 6.26633C19.6121 4.81716 20.9621 3.79883 22.5371 3.79883C24.1121 3.79883 25.4621 4.81716 26.0059 6.26633Z" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M28.1621 37.3262C28.1621 40.5574 25.6309 43.2012 22.5371 43.2012C20.9996 43.2012 19.5746 42.5353 18.5621 41.4778C17.5496 40.4203 16.9121 38.932 16.9121 37.3262" fill="#1D2D44" />
            <path d="M28.1621 37.3262C28.1621 40.5574 25.6309 43.2012 22.5371 43.2012C20.9996 43.2012 19.5746 42.5353 18.5621 41.4778C17.5496 40.4203 16.9121 38.932 16.9121 37.3262" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" />
          </svg>
        </button>
      </div>
    </Navbar>
  );
};

export default Header;