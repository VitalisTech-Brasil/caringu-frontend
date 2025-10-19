import { useState, useRef, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';
import { LucideCheckCheck } from 'lucide-react';
import { caringuApi } from '../../../provider/caringuApi';

const Header = ({
  menuRef,
  title = "Página inicial",
  icon = <svg className="sm:w-[34px] sm:h-[30px] w-7 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 34 31" fill="none">
            <path d="M17.3586 23.0883V19.0883" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.6245 2.84834L4.80703 10.2483C3.70203 11.075 2.99369 12.8217 3.23453 14.1283L5.11869 24.7417C5.45869 26.635 7.38536 28.1683 9.42536 28.1683H25.292C27.3179 28.1683 29.2587 26.6217 29.5987 24.7417L31.4829 14.1283C31.7095 12.8217 31.0012 11.075 29.9104 10.2483L20.0929 2.86167C18.577 1.71501 16.1262 1.71501 14.6245 2.84834Z" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificacoesGeral, setNotificacoesGeral] = useState([]);
  const notificationRef = useRef(null);
  const alunoId = sessionStorage.getItem("pessoaId");


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notifications = await caringuApi.get(`/notificacoes/pessoas/${alunoId}`);
        const notificacoesOrdenadas = ordenarNotificacoes(notifications.data);
        setNotificacoesGeral(notificacoesOrdenadas);
        console.log("Notificações:", notificacoesOrdenadas);
      } catch (error) {
        console.error("Erro ao buscar notificações:", error);
      }
    };

    if (alunoId) {
      fetchNotifications();
    }
  }, [alunoId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function ordenarNotificacoes(lista) {
    return [...lista].sort((a, b) => {
      if (a.visualizada === b.visualizada) {
        return new Date(b.dataCriacao) - new Date(a.dataCriacao);
      }
      return a.visualizada ? 1 : -1;
    });
  }

  const atualizarNotificacoesVisualizadas = (ids = []) => {
    setNotificacoesGeral((prev) =>
      ordenarNotificacoes(
        prev.map((n) =>
          ids.length === 0 || ids.includes(n.id)
            ? { ...n, visualizada: true }
            : n
        )
      )
    );
  };

  const marcarNotificacaoComoLida = async (notificacaoId) => {
    try {
      await caringuApi.patch(`notificacoes/${notificacaoId}/visualizada`, {
        visualizada: true
      });

      atualizarNotificacoesVisualizadas([notificacaoId]);
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  }

  const marcarTodasNotificacoesComoLidas = async () => {
    const existeNaoVisualizada = notificacoesGeral.some(n => !n.visualizada);
    if (!existeNaoVisualizada) return;

    try {
      await caringuApi.patch(`notificacoes/visualizar-todas/${alunoId}`)
      atualizarNotificacoesVisualizadas();
    } catch (error) {
      console.error("Erro ao marcar todas as notificações como lidas:", error);
    }
  }

  const redirecionarPorTipo = (tipo) => {
    // Implemente a lógica de redirecionamento baseada no tipo
    console.log("Redirecionando para tipo:", tipo);
    setShowNotifications(false);

    // Exemplo de implementação:
    // switch(tipo) {
    //   case 'agendamento':
    //     navigate('/agendamentos');
    //     break;
    //   case 'mensagem':
    //     navigate('/mensagens');
    //     break;
    //   default:
    //     break;
    // }
  }

  // Calcular tempo decorrido
  const tempoDecorrido = (dataCriacao) => {
    const data = new Date(dataCriacao);
    const agora = new Date();
    const diffMs = agora - data;
    const diffMinutos = Math.floor(diffMs / 60000);

    if (diffMinutos < 1) return 'Agora';
    if (diffMinutos < 60) return `${diffMinutos} min atrás`;

    const diffHoras = Math.floor(diffMinutos / 60);
    if (diffHoras < 24) return `${diffHoras} h atrás`;

    const diffDias = Math.floor(diffHoras / 24);
    return `${diffDias} dias atrás`;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
      {/* Mobile */}
      <div className="flex items-center justify-between max-w-md mx-auto lg:hidden">
        <button
          className="p-2 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
          onClick={() => menuRef.current?.toggleMenu()}
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

        <div className="flex items-center space-x-2 flex-1 justify-center">
          {icon}
          <h1
            className="font-bold text-base sm:text-2xl"
            style={{
              fontFamily: "Inter",
              color: "#1D2D44",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Notificação Mobile */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            type="button"
            className="p-2 text-gray-800 rounded-lg hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
          >
            <span className="sr-only">View notifications</span>
            {notificacoesGeral.length > 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 45 47" fill="none">
                <path d="M22.5374 5.69922C16.3311 5.69922 11.2874 10.9671 11.2874 17.4492V23.1088C11.2874 24.3034 10.7999 26.1246 10.2186 27.143L8.06236 30.8834C6.73111 33.1942 7.64986 35.7596 10.0874 36.6213C18.1686 39.4413 26.8874 39.4413 34.9686 36.6213C37.2374 35.838 38.2311 33.0376 36.9936 30.8834L34.8374 27.143C34.2749 26.1246 33.7874 24.3034 33.7874 23.1088V17.4492C33.7874 10.9867 28.7249 5.69922 22.5374 5.69922Z" fill="#1D2D44" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M26.0059 6.26633C25.4246 6.09008 24.8246 5.95299 24.2059 5.87466C22.4059 5.63966 20.6809 5.77674 19.0684 6.26633C19.6121 4.81716 20.9621 3.79883 22.5371 3.79883C24.1121 3.79883 25.4621 4.81716 26.0059 6.26633Z" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M28.1621 37.3262C28.1621 40.5574 25.6309 43.2012 22.5371 43.2012C20.9996 43.2012 19.5746 42.5353 18.5621 41.4778C17.5496 40.4203 16.9121 38.932 16.9121 37.3262" fill="#1D2D44" />
                <path d="M28.1621 37.3262C28.1621 40.5574 25.6309 43.2012 22.5371 43.2012C20.9996 43.2012 19.5746 42.5353 18.5621 41.4778C17.5496 40.4203 16.9121 38.932 16.9121 37.3262" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 45 47" fill="none">
                <path d="M22.5374 5.69873C16.3311 5.69873 11.2874 10.9666 11.2874 17.4487V23.1083C11.2874 24.3029 10.7999 26.1241 10.2186 27.1425L8.06236 30.8829C6.73111 33.1937 7.64986 35.7591 10.0874 36.6208C18.1686 39.4408 26.8874 39.4408 34.9686 36.6208C37.2374 35.8375 38.2311 33.0371 36.9936 30.8829L34.8374 27.1425C34.2749 26.1241 33.7874 24.3029 33.7874 23.1083V17.4487C33.7874 10.9862 28.7249 5.69873 22.5374 5.69873Z" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M26.0063 6.26682C25.4251 6.09057 24.8251 5.95348 24.2063 5.87515C22.4063 5.64015 20.6813 5.77723 19.0688 6.26682C19.6126 4.81765 20.9626 3.79932 22.5376 3.79932C24.1126 3.79932 25.4626 4.81765 26.0063 6.26682Z" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M28.1626 37.3257C28.1626 40.5569 25.6313 43.2007 22.5376 43.2007C21.0001 43.2007 19.5751 42.5349 18.5626 41.4774C17.5501 40.4199 16.9126 38.9315 16.9126 37.3257" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" />
              </svg>
            )}
          </button>

          {/* Dropdown Mobile */}
          <div
            className={`z-50 ${showNotifications ? "block" : "hidden"} absolute right-0 top-12 w-80 max-w-[90vw] bg-white rounded-lg border-2 border-gray-200 shadow-xl`}
          >
            <div className="flex flex-row justify-between items-center px-4 py-3 font-medium text-gray-900 text-lg border-b border-gray-200">
              <span>Notificações</span>
              <LucideCheckCheck
                onClick={marcarTodasNotificacoesComoLidas}
                className="cursor-pointer transition-colors hover:bg-gray-200 rounded-full p-1 w-7 h-7 sm:h-9 sm:w-9"
              />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notificacoesGeral.length > 0 ? (
                notificacoesGeral.map((notification, index) => (
                  <div
                    key={index}
                    onClick={() => redirecionarPorTipo(notification.tipo)}
                    className={`flex px-4 py-3 cursor-pointer hover:bg-gray-50 transition ${notification.visualizada ? "bg-gray-50" : "bg-white"
                      }`}
                  >
                    <div className="w-full flex flex-row items-center">
                      <div className="flex flex-col flex-1 min-w-0">
                        <div className="text-xs sm:text-base md:text-xl text-[var(--cor-primaria)] font-bold">
                          {notification.titulo}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {tempoDecorrido(notification.dataCriacao)}
                        </div>
                      </div>
                      {!notification.visualizada && (
                        <FaCheck
                          onClick={(e) => {
                            e.stopPropagation();
                            marcarNotificacaoComoLida(notification.id);
                          }}
                          className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 cursor-pointer transition-colors hover:bg-gray-200 rounded-full p-1"
                        />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex px-4 py-6 justify-center">
                  <div className="text-sm text-gray-500 text-center">
                    Nenhuma notificação nova
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            className="p-2 text-gray-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
            onClick={() => menuRef.current?.toggleMenu()}
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
          {icon}
          <h1
            className="font-bold text-base sm:text-2xl"
            style={{
              fontFamily: "Inter",
              color: "#1D2D44",
            }}
          >
            {title}
          </h1>
        </div>

        {/* Notificação Desktop */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            type="button"
            className="p-2 text-gray-800 rounded-lg hover:text-gray-900 hover:bg-gray-200 cursor-pointer"
          >
            <span className="sr-only">View notifications</span>
            {notificacoesGeral.length > 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 45 47" fill="none">
                <path d="M22.5374 5.69922C16.3311 5.69922 11.2874 10.9671 11.2874 17.4492V23.1088C11.2874 24.3034 10.7999 26.1246 10.2186 27.143L8.06236 30.8834C6.73111 33.1942 7.64986 35.7596 10.0874 36.6213C18.1686 39.4413 26.8874 39.4413 34.9686 36.6213C37.2374 35.838 38.2311 33.0376 36.9936 30.8834L34.8374 27.143C34.2749 26.1246 33.7874 24.3034 33.7874 23.1088V17.4492C33.7874 10.9867 28.7249 5.69922 22.5374 5.69922Z" fill="#1D2D44" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M26.0059 6.26633C25.4246 6.09008 24.8246 5.95299 24.2059 5.87466C22.4059 5.63966 20.6809 5.77674 19.0684 6.26633C19.6121 4.81716 20.9621 3.79883 22.5371 3.79883C24.1121 3.79883 25.4621 4.81716 26.0059 6.26633Z" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M28.1621 37.3262C28.1621 40.5574 25.6309 43.2012 22.5371 43.2012C20.9996 43.2012 19.5746 42.5353 18.5621 41.4778C17.5496 40.4203 16.9121 38.932 16.9121 37.3262" fill="#1D2D44" />
                <path d="M28.1621 37.3262C28.1621 40.5574 25.6309 43.2012 22.5371 43.2012C20.9996 43.2012 19.5746 42.5353 18.5621 41.4778C17.5496 40.4203 16.9121 38.932 16.9121 37.3262" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 45 47" fill="none">
                <path d="M22.5374 5.69873C16.3311 5.69873 11.2874 10.9666 11.2874 17.4487V23.1083C11.2874 24.3029 10.7999 26.1241 10.2186 27.1425L8.06236 30.8829C6.73111 33.1937 7.64986 35.7591 10.0874 36.6208C18.1686 39.4408 26.8874 39.4408 34.9686 36.6208C37.2374 35.8375 38.2311 33.0371 36.9936 30.8829L34.8374 27.1425C34.2749 26.1241 33.7874 24.3029 33.7874 23.1083V17.4487C33.7874 10.9862 28.7249 5.69873 22.5374 5.69873Z" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M26.0063 6.26682C25.4251 6.09057 24.8251 5.95348 24.2063 5.87515C22.4063 5.64015 20.6813 5.77723 19.0688 6.26682C19.6126 4.81765 20.9626 3.79932 22.5376 3.79932C24.1126 3.79932 25.4626 4.81765 26.0063 6.26682Z" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M28.1626 37.3257C28.1626 40.5569 25.6313 43.2007 22.5376 43.2007C21.0001 43.2007 19.5751 42.5349 18.5626 41.4774C17.5501 40.4199 16.9126 38.9315 16.9126 37.3257" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" />
              </svg>
            )}
          </button>

          {/* Dropdown Desktop */}
          <div
            className={`z-50 ${showNotifications ? "block" : "hidden"} absolute right-0 top-12 w-96 bg-white rounded-lg border-2 border-gray-200 shadow-xl`}
          >
            <div className="flex flex-row justify-between items-center px-6 py-4 font-semibold text-gray-900 text-xl border-b border-gray-200">
              <span>Notificações</span>
              <LucideCheckCheck
                onClick={marcarTodasNotificacoesComoLidas}
                className="cursor-pointer transition-colors hover:bg-gray-200 rounded-full p-1 w-7 h-7 sm:h-9 sm:w-9"
              />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notificacoesGeral.length > 0 ? (
                notificacoesGeral.map((notification, index) => (
                  <div
                    key={index}
                    onClick={() => redirecionarPorTipo(notification.tipo)}
                    className={`flex px-6 py-4 cursor-pointer hover:bg-gray-50 transition ${notification.visualizada ? "bg-gray-50" : "bg-white"
                      }`}
                  >
                    <div className="w-full flex flex-row items-center">
                      <div className="flex flex-col flex-1">
                        <div className="text-xs sm:text-base md:text-xl text-[var(--cor-primaria)] font-bold">
                          {notification.titulo}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {tempoDecorrido(notification.dataCriacao)}
                        </div>
                      </div>
                      {!notification.visualizada && (
                        <FaCheck
                          onClick={(e) => {
                            e.stopPropagation();
                            marcarNotificacaoComoLida(notification.id);
                          }}
                          className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 cursor-pointer transition-colors hover:bg-gray-200 rounded-full p-1"
                        />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex px-6 py-8 justify-center">
                  <div className="text-xs sm:text-base md:text-xl text-[var(--cor-primaria)] font-bold">
                    Nenhuma notificação nova
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;