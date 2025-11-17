import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logos/caringu-logo-light.svg";
import { useFotoPerfil } from "../../../context/FotoPerfilContext"; // Consumir o contexto
import { caringuApi } from "../../../provider/caringuApi"; // Importar API

const MenuLateralAluno = React.forwardRef((props, ref) => {
  const { fotoPerfil, setFotoPerfil } = useFotoPerfil(); // <-- usar contexto
  const [isOpen, setIsOpen] = useState(false);
  const [isTreinosOpen, setIsTreinosOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [nomePessoa, setNomePessoa] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");
  const [imgErro, setImgErro] = useState(false);

  const alunoId = sessionStorage.getItem("pessoaId");

  React.useImperativeHandle(ref, () => ({
    toggleMenu: () => {
      setIsOpen((prev) => !prev);
    },
  }));

  useEffect(() => {
    // Buscar foto no backend e atualizar o contexto se necessário
    const fetchFotoPerfil = async () => {
      try {
        const response = await caringuApi.get(`/alunos/${alunoId}`);
        const novaFoto = response?.data?.urlFotoPerfil || "";
        if (novaFoto && novaFoto !== fotoPerfil) {
          setFotoPerfil(novaFoto);
        }
      } catch (error) {
        console.error("Erro ao buscar foto de perfil do aluno:", error);
      }
    };

    if (alunoId) {
      fetchFotoPerfil();
    }
  }, [alunoId, fotoPerfil, setFotoPerfil]);

  // Resetar flag de erro sempre que o contexto mudar
  useEffect(() => {
    setImgErro(false);
  }, [fotoPerfil]);

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
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.275 3.55L4.5375 8.8C3.4125 9.675 2.5 11.5375 2.5 12.95V22.2125C2.5 25.1125 4.8625 27.4875 7.7625 27.4875H22.2375C25.1375 27.4875 27.5 25.1125 27.5 22.225V13.125C27.5 11.6125 26.4875 9.675 25.25 8.8125L17.525 3.4C15.775 2.175 12.9625 2.2375 11.275 3.55Z"
            stroke="#020002"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 22.4875V18.7375"
            stroke="#020002"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      label: "Página Inicial",
      path: "/home-aluno",
    },
    {
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z"
            stroke="#020002"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.26245 27.5C4.26245 22.6625 9.07499 18.75 15 18.75"
            stroke="#020002"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22.75 26.75C24.9592 26.75 26.75 24.9592 26.75 22.75C26.75 20.5409 24.9592 18.75 22.75 18.75C20.5409 18.75 18.75 20.5409 18.75 22.75C18.75 24.9592 20.5409 26.75 22.75 26.75Z"
            stroke="#020002"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M27.5 27.5L26.25 26.25"
            stroke="#020002"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      label: "Buscar Personal",
      path: "/procurando-personal",
    },
    {
      icon: (
        <svg
          width="30"
          height="27"
          viewBox="0 0 30 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.375 6.00008H26.25C26.7675 6.00008 27.1875 6.56008 27.1875 7.25008V19.7501C27.1875 20.4401 26.7675 21.0001 26.25 21.0001H24.375C23.8575 21.0001 23.4375 20.4401 23.4375 19.7501V7.25008C23.4375 6.56008 23.8575 6.00008 24.375 6.00008Z"
            stroke="#020002"
            stroke-width="2"
          />
          <path
            d="M20.625 1H22.5C23.0175 1 23.4375 1.56 23.4375 2.25V24.75C23.4375 25.44 23.0175 26 22.5 26H20.625C20.1075 26 19.6875 25.44 19.6875 24.75V2.25C19.6875 1.56 20.1075 1 20.625 1Z"
            stroke="#020002"
            stroke-width="2"
          />
          <path
            d="M7.5 1H9.375C9.8925 1 10.3125 1.56 10.3125 2.25V24.75C10.3125 25.44 9.8925 26 9.375 26H7.5C6.9825 26 6.5625 25.44 6.5625 24.75V2.25C6.5625 1.56 6.9825 1 7.5 1Z"
            stroke="#020002"
            stroke-width="2"
          />
          <path
            d="M3.75 6.00018H5.625C6.1425 6.00018 6.5625 6.56018 6.5625 7.25018V19.7502C6.5625 20.4402 6.1425 21.0002 5.625 21.0002H3.75C3.2325 21.0002 2.8125 20.4402 2.8125 19.7502V7.25018C2.8125 6.56018 3.2325 6.00018 3.75 6.00018Z"
            stroke="#020002"
            stroke-width="2"
          />
          <path d="M27.1875 13.5H30" stroke="#020002" stroke-width="2" />
          <path d="M10.3125 13.5H19.6875" stroke="#020002" stroke-width="2" />
          <path d="M0 13.5H2.8125" stroke="#020002" stroke-width="2" />
        </svg>
      ),
      label: "Minhas Aulas",
      path: "/minhas-aulas",
    },
    {
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.37505 21.25H22.6126C24.9876 21.25 26.2375 20 26.2375 17.625V2.5H3.73755V17.625C3.75005 20 5.00005 21.25 7.37505 21.25Z"
            stroke="#020002"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.5 2.5H27.5"
            stroke="#020002"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 27.5L15 25V21.25"
            stroke="#020002"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M20 27.5L15 25"
            stroke="#020002"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9.375 13.75L13.3125 10.4625C13.625 10.2 14.0375 10.275 14.25 10.625L15.75 13.125C15.9625 13.475 16.375 13.5375 16.6875 13.2875L20.625 10"
            stroke="#020002"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      label: "Minha Evolução",
      path: "/minha-evolucao",
    },
    {
      icon: (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.44997 27.5H21.55C25 27.5 26.375 25.3875 26.5375 22.8125L27.1875 12.4875C27.3625 9.7875 25.2125 7.5 22.5 7.5C21.7375 7.5 21.0375 7.0625 20.6875 6.3875L19.7875 4.575C19.2125 3.4375 17.7125 2.5 16.4375 2.5H13.575C12.2875 2.5 10.7875 3.4375 10.2125 4.575L9.31246 6.3875C8.96246 7.0625 8.26247 7.5 7.49997 7.5C4.78747 7.5 2.63747 9.7875 2.81247 12.4875L3.46247 22.8125C3.61247 25.3875 4.99997 27.5 8.44997 27.5Z"
            stroke="#020002"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.125 10H16.875"
            stroke="#020002"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15 22.5C17.2375 22.5 19.0625 20.675 19.0625 18.4375C19.0625 16.2 17.2375 14.375 15 14.375C12.7625 14.375 10.9375 16.2 10.9375 18.4375C10.9375 20.675 12.7625 22.5 15 22.5Z"
            stroke="#020002"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
      label: "Progresso Corporal",
      path: "/progresso-corporal-aluno",
    },
    {
      icon: (
        <div className="relative flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M27.5 14.375V19.375C27.5 23.75 25 25.625 21.25 25.625H8.75C5 25.625 2.5 23.75 2.5 19.375V10.625C2.5 6.25 5 4.375 8.75 4.375H15" stroke="#020002" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.75 11.25L12.6625 14.375C13.95 15.4 16.0625 15.4 17.35 14.375" stroke="#020002" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M24.35 3.52499L24.7 4.23748C24.875 4.58748 25.3125 4.91249 25.7 4.98749L26.175 5.06248C27.6 5.29998 27.9375 6.34998 26.9125 7.38748L26.475 7.82497C26.1875 8.12497 26.025 8.69998 26.1125 9.09998L26.175 9.36249C26.5625 11.0875 25.65 11.75 24.15 10.85L23.825 10.6625C23.4375 10.4375 22.8125 10.4375 22.425 10.6625L22.1 10.85C20.5875 11.7625 19.675 11.0875 20.075 9.36249L20.1375 9.09998C20.225 8.69998 20.0625 8.12497 19.775 7.82497L19.3375 7.38748C18.3125 6.34998 18.65 5.29998 20.075 5.06248L20.55 4.98749C20.925 4.92499 21.375 4.58748 21.55 4.23748L21.9 3.52499C22.575 2.16249 23.675 2.16249 24.35 3.52499Z" stroke="#020002" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      ),
      label: "Feedback",
      path: "/feedback-aluno",
    },
    {
      icon: (
        <div className="relative flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-gray-800"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M27.4124 8.45001L23.1999 25.3625C22.8999 26.625 21.7749 27.5 20.4749 27.5H4.04992C2.16242 27.5 0.812438 25.6499 1.37494 23.8374L6.63743 6.93756C6.99993 5.76256 8.08745 4.94995 9.31245 4.94995H24.6874C25.8749 4.94995 26.8624 5.67496 27.2749 6.67496C27.5124 7.21246 27.5624 7.82501 27.4124 8.45001Z"
              stroke="#020002"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
            <path
              d="M20 27.5H25.975C27.5875 27.5 28.85 26.1375 28.7375 24.525L27.5 7.5"
              stroke="#020002"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.1001 7.97513L13.4001 2.5752"
              stroke="#020002"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.4751 7.98746L21.6501 2.5625"
              stroke="#020002"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="absolute text-xs font-bold text-200 rounded-full px-1 top-[30%] text-gray-800">
            {getCurrentDay()}
          </span>
        </div>
      ),
      label: "Agenda",
      path: "/agenda-aluno",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-gray-800"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            d="M27.5 15.0005V21.2505C27.5 25.0005 25 27.5005 21.25 27.5005H8.75C5 27.5005 2.5 25.0005 2.5 21.2505V15.0005C2.5 11.6005 4.55 9.22549 7.7375 8.82549C8.0625 8.77549 8.4 8.75049 8.75 8.75049H21.25C21.575 8.75049 21.8875 8.76297 22.1875 8.81297C25.4125 9.18797 27.5 11.5755 27.5 15.0005Z"
            stroke="#020002"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22.1893 8.81299C21.8893 8.76299 21.5768 8.7505 21.2518 8.7505H8.75176C8.40176 8.7505 8.06426 8.7755 7.73926 8.8255C7.91426 8.4755 8.16426 8.1505 8.46426 7.8505L12.5268 3.77549C14.2393 2.07549 17.0143 2.07549 18.7268 3.77549L20.9143 5.98801C21.7143 6.77551 22.1393 7.77549 22.1893 8.81299Z"
            stroke="#020002"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M27.5 15.6255H23.75C22.375 15.6255 21.25 16.7505 21.25 18.1255C21.25 19.5005 22.375 20.6255 23.75 20.6255H27.5"
            stroke="#020002"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Planos",
      path: "/aluno-planos",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7 text-gray-800"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            d="M15 15.0005C18.4518 15.0005 21.25 12.2023 21.25 8.75049C21.25 5.29871 18.4518 2.50049 15 2.50049C11.5482 2.50049 8.75 5.29871 8.75 8.75049C8.75 12.2023 11.5482 15.0005 15 15.0005Z"
            stroke="#020002"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M25.7374 27.5005C25.7374 22.663 20.9249 18.7505 14.9999 18.7505C9.07495 18.7505 4.26245 22.663 4.26245 27.5005"
            stroke="#020002"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Perfil",
      path: "/perfil-aluno",
    },
  ];

  const toggleMenu = () => {
    if (!isOpen) {
      setIsTreinosOpen(false);
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Menu lateral só aparece quando isOpen é true */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#000000] opacity-50 z-40"
            onClick={toggleMenu}
          />
          <aside className="fixed top-0 left-0 h-[100dvh] bg-[var(--cor-secundaria)] text-black transition-all duration-300 ease-in-out w-64 z-50 shadow-xl min-h-[16rem] flex flex-col">
            {/* Header do Menu */}
            <div
              className="flex items-center justify-between p-4 border-b border-gray-300"
              style={{ minHeight: "4.8rem" }}
            >
              <div className="flex items-center gap-2">
                <img src={logo} alt="Logo CaringU" className="h-10 w-10" />
                <h1 className="text-2xl font-bold whitespace-nowrap">
                  CaringU
                </h1>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 39 39"
                  fill="none"
                >
                  <path
                    d="M4.875 11.375H34.125"
                    stroke="#1D2D44"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.875 19.5H34.125"
                    stroke="#1D2D44"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4.875 27.625H34.125"
                    stroke="#1D2D44"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Informações do Usuário */}
            <div
              className="flex items-center gap-4 p-4 border border-gray-300 border-t-0 border-l-0"
              style={{ minHeight: "5rem" }}
            >
              {/* usar fotoPerfil do contexto */}
              {fotoPerfil && !imgErro ? (
                <img
                  src={fotoPerfil}
                  alt="Foto de perfil"
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                  onError={() => setImgErro(true)}
                />
              ) : (
                <FaUserCircle size={40} className="flex-shrink-0" />
              )}
              <div className="flex flex-col">
                <p className="text-lg font-bold">{nomePessoa}</p>
                <p className="text-sm">{tipoPessoa}</p>
              </div>
            </div>

            {/* Itens do Menu */}
            <ul className="flex flex-col gap-4 p-4 border border-gray-300 border-t-0 border-l-0 flex-grow">
              {menuItems.map((item, index) => (
                <li key={index} className="flex flex-col">
                  <div
                    className={`flex items-center justify-between gap-4 p-2 rounded cursor-pointer ${location.pathname === item.path
                      ? "bg-[var(--azul-escuro)] text-[var(--cor-secundaria)]"
                      : "hover:bg-[#1D2D4417]"
                      }`}
                    onClick={() => {
                      if (item.label === "Treinos") {
                        setIsTreinosOpen(!isTreinosOpen);
                      } else if (!item.children) {
                        navigate(item.path);
                        toggleMenu(); // Fecha o menu após navegação
                      }
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`${location.pathname === item.path ? "filter invert" : ""
                          }`}
                      >
                        {item.icon}
                      </div>
                      <span className="whitespace-nowrap">{item.label}</span>
                    </div>
                    {item.children &&
                      (isTreinosOpen ? (
                        <FaChevronUp size={16} />
                      ) : (
                        <FaChevronDown size={16} />
                      ))}
                  </div>
                  {item.children && (
                    <ul
                      className={`ml-6 mt-2 overflow-hidden transition-[max-height] duration-300 ease-in-out ${isTreinosOpen ? "max-h-40" : "max-h-0"
                        }`}
                    >
                      {item.children.map((child, childIndex) => (
                        <li
                          key={childIndex}
                          className={`flex items-center p-2 rounded cursor-pointer ${location.pathname === child.path
                            ? "bg-[var(--azul-escuro)] text-[var(--cor-secundaria)]"
                            : "hover:bg-[#1D2D4417]"
                            }`}
                          onClick={() => {
                            navigate(child.path);
                            toggleMenu(); // Fecha o menu após navegação
                          }}
                        >
                          <div className="flex items-center gap-2">
                            {React.cloneElement(child.icon, {
                              className: `${child.icon.props.className ?? ""} ${location.pathname === child.path
                                ? "filter invert"
                                : ""
                                }`,
                            })}
                            <span className="flex-grow whitespace-nowrap text-left">
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 35 35"
                  fill="none"
                >
                  <path
                    d="M25.4331 21.3207L29.1664 17.5873L25.4331 13.854"
                    stroke="#FFFDF6"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.2334 17.5874H29.0646"
                    stroke="#FFFDF6"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.1501 29.1668C10.7042 29.1668 5.4834 24.7918 5.4834 17.5002C5.4834 10.2085 10.7042 5.8335 17.1501 5.8335"
                    stroke="#FFFDF6"
                    strokeWidth="3"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="whitespace-nowrap">Sair</span>
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
});

export default MenuLateralAluno;
