import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";

const CardPlano = ({
  onEditar,
  onDeletar,
  onModalContratar,
  nome,
  periodo,
  quantidadeAulas,
  valorAulas,
  valorPlano,
  onAvaliarPersonal,
  ativo = true,
  showContratarPlano = true,
  disabled = false,
  nomePersonal,
  emailPersonal,
  experienciaPersonal,
  locaisAtendimento,
  dataFim

}) => {

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [expandido, setExpandido] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <div className={`w-full flex flex-col justify-start items-center relative ${ativo ? '' : 'opacity-50 pointer-events-none'}`}>
        {!ativo && <div className="absolute inset-0 bg-white opacity-40 rounded-md z-10"></div>}

        <div className="relative z-20 w-full sm:w-[450px] 2xl:w-[560px] h-auto rounded-t-md border-t-[2px] border-r-[2px] border-l-[2px] border-[#1D2D441C] sm:p-4 sm:pl-6 p-6 flex flex-col justify-center">
          <div className="h-auto flex flex-row items-end justify-between mb-4">
            <h5 className="break-all text-sm sm:text-2xl font-extrabold text-[var(--cor-primaria)] w-auto h-full flex flex-row items-center">
              {nome}
            </h5>
            <div className="h-full flex flex-col justify-end w-auto gap-[0.3rem]">
              {ativo && (
                <span className="text-[var(--cor-primaria)] text-xs sm:text-sm mt-1 flex items-center gap-1 justify-center w-auto">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="5" r="5" fill="#46982B" />
                  </svg>
                  <span>Plano Ativo</span>
                </span>
              )}
              {!ativo && (
                <span className="text-gray-500 text-xs sm:text-sm mt-1 flex items-center gap-1 justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="5" cy="5" r="5" fill="#B41F1F" />
                  </svg>
                  Plano Inativo
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center w-full gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
              <path d="M8 2V5" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2V5" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.5 9.09H20.5" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.6947 13.7H15.7037" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.6947 16.7H15.7037" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.9955 13.7H12.0045" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.9955 16.7H12.0045" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.29431 13.7H8.30329" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.29431 16.7H8.30329" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm sm:text-base font-normal text-[var(--cor-primaria)]">
              Válido até: <span className="font-semibold">{dataFim ? new Date(dataFim).toLocaleDateString('pt-BR') : "Data não informada"}</span>
            </span>
          </div>

          <div className="flex sm:flex-row flex-col justify-between text-base sm:text-xl font-normal text-[var(--cor-primaria)]">
            <ul role="list" className="space-y-4 my-2">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-[22px] sm:h-[22px]" viewBox="0 0 30 30" fill="none">
                  <path d="M15.0002 0.833008C7.19433 0.833008 0.833496 7.19384 0.833496 14.9997C0.833496 22.8055 7.19433 29.1663 15.0002 29.1663C22.806 29.1663 29.1668 22.8055 29.1668 14.9997C29.1668 7.19384 22.806 0.833008 15.0002 0.833008ZM21.1627 20.0572C20.9643 20.3972 20.6102 20.5813 20.2418 20.5813C20.0577 20.5813 19.8735 20.5388 19.7035 20.4255L15.3118 17.8047C14.221 17.153 13.4135 15.7222 13.4135 14.4613V8.65301C13.4135 8.07217 13.8952 7.59051 14.476 7.59051C15.0568 7.59051 15.5385 8.07217 15.5385 8.65301V14.4613C15.5385 14.9713 15.9635 15.7222 16.4027 15.9772L20.7943 18.598C21.3043 18.8955 21.4743 19.5472 21.1627 20.0572Z" fill="#1D2D44" />
                </svg>
                <span className="leading-tight ms-2">60 min por aula</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-[26px] sm:h-[26px]" viewBox="0 0 34 34" fill="none">
                  <path d="M12.9766 15.3988C12.835 15.3847 12.665 15.3847 12.5091 15.3988C9.13746 15.2855 6.45996 12.523 6.45996 9.12301C6.45996 5.65217 9.26496 2.83301 12.75 2.83301C16.2208 2.83301 19.04 5.65217 19.04 9.12301C19.0258 12.523 16.3483 15.2855 12.9766 15.3988Z"
                    stroke="#1D2D44"
                    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M23.2476 5.66699C25.996 5.66699 28.206 7.89116 28.206 10.6253C28.206 13.3028 26.081 15.4845 23.4318 15.5837C23.3185 15.5695 23.191 15.5695 23.0635 15.5837"
                    stroke="#1D2D44"
                    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.89352 20.627C2.46518 22.922 2.46518 26.662 5.89352 28.9428C9.78935 31.5495 16.1785 31.5495 20.0743 28.9428C23.5027 26.6478 23.5027 22.9078 20.0743 20.627C16.1927 18.0345 9.80352 18.0345 5.89352 20.627Z"
                    stroke="#1D2D44"
                    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M25.9814 28.333C27.0014 28.1205 27.9648 27.7097 28.7581 27.1005C30.9681 25.443 30.9681 22.7088 28.7581 21.0513C27.9789 20.4563 27.0298 20.0597 26.0239 19.833"
                    stroke="#1D2D44"
                    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="leading-tight ms-2">
                  {quantidadeAulas} {quantidadeAulas < 2 ? "aula" : "aulas"}
                </span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-[26px] sm:h-[26px]" viewBox="0 0 34 34" fill="none">
                  <path d="M17 0C7.61702 0 0 7.61702 0 17C0 26.383 7.61702 34 17 34C26.383 34 34 26.383 34 17C33.9787 7.61702 26.383 0 17 0ZM15 14.617L20.1277 16.4043C21.9787 17.0638 22.8723 18.3617 22.8723 20.3617C22.8723 22.6596 21.0426 24.5532 18.8085 24.5532H18.617V24.6596C18.617 25.5319 17.8936 26.2553 17.0213 26.2553C16.1489 26.2553 15.4255 25.5319 15.4255 24.6596V24.5319C13.0638 24.4255 11.1702 22.4468 11.1702 19.9787C11.1702 19.1064 11.8936 18.383 12.766 18.383C13.6383 18.383 14.3617 19.1064 14.3617 19.9787C14.3617 20.7447 14.9149 21.3617 15.5957 21.3617H18.7872C19.2766 21.3617 19.6596 20.9149 19.6596 20.3617C19.6596 19.617 19.5319 19.5745 19.0426 19.4043L13.9149 17.617C12.0851 16.9787 11.1702 15.6809 11.1702 13.6596C11.1702 11.3617 13 9.46808 15.234 9.46808H15.4255V9.38298C15.4255 8.51064 16.1489 7.78723 17.0213 7.78723C17.8936 7.78723 18.617 8.51064 18.617 9.38298V9.51064C20.9787 9.61702 22.8723 11.5957 22.8723 14.0638C22.8723 14.9362 22.1489 15.6596 21.2766 15.6596C20.4043 15.6596 19.6809 14.9362 19.6809 14.0638C19.6809 13.2979 19.1277 12.6809 18.4468 12.6809H15.2553C14.766 12.6809 14.383 13.1277 14.383 13.6809C14.3617 14.4043 14.4894 14.4468 15 14.617Z" fill="#1D2D44" />
                </svg>
                <span className="text-base sm:text-xl font-semibold text-[var(--cor-primaria)] leading-tight ms-2">R${valorAulas?.toFixed(2)}</span>
                <span className="leading-tight ms-2">por aula</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-[2px] border-[#1D2D441C] h-auto flex flex-col w-full sm:w-[450px] 2xl:w-[560px] py-4 px-6 gap-3">
          {expandido && (
            <>
              <span className="text-sm sm:text-base font-light text-[var(--cor-primaria)] leading-tight flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_7159_6834)">
                    <path d="M8.8761 5.19969H10.9811C11.0143 5.14381 11.0344 5.08117 11.04 5.01643C11.0455 4.95169 11.0364 4.88653 11.0133 4.8258L8.87665 2.21191L8.8761 5.19969Z" fill="#FCFCFC" />
                    <path d="M7.11337 12.3761C7.085 12.194 7.0468 12.0135 6.99893 11.8356C6.65448 10.6006 6.36559 10.0778 6.48893 8.78333C6.65004 7.90333 6.64059 6.13722 8.97948 6.41222C9.59726 6.48499 10.5589 6.92722 11.1095 6.91777C11.4245 6.91222 11.6539 6.275 11.6745 6.06277C11.7028 5.77055 11.1939 5.27388 10.9811 5.19944C10.487 5.03948 9.99042 4.88687 9.4917 4.74166C8.91448 4.57444 8.94448 3.79444 8.90781 3.51666C8.89974 3.45194 8.91092 3.38627 8.93998 3.32787C8.96903 3.26947 9.01465 3.22093 9.07115 3.18833C9.18781 3.11944 9.27948 3.18388 9.39281 3.25777L9.88448 3.61777C10.1606 3.85444 9.39892 4.30666 9.60504 4.38222C9.60504 4.38222 10.58 4.74833 10.9978 4.82444C11.2267 4.86611 12.0167 3.975 12.0628 3.45222C12.0989 3.04111 10.175 1.18388 8.80337 0.462773C8.32115 0.20944 8.03837 0.0622177 7.72059 0.0772177C7.34115 0.0949955 7.2217 0.244996 6.74948 0.64944C4.61226 2.47777 2.53781 6.43166 2.23337 7.30666C0.985593 10.8961 0.790593 12.7872 0.746148 13.8556C0.718602 14.1804 0.704516 14.5062 0.703926 14.8322C0.740037 14.8322 0.148371 17.61 0.703926 18.1656C1.25948 18.7211 3.66281 18.7211 3.66281 18.7211C9.21837 20.9372 19.535 20.3589 19.535 14.7028C19.535 7.94055 9.08337 8.83777 7.11337 12.3761Z" fill="#1D2D44" />
                    <path d="M11.4612 17.8215C9.70563 17.6371 8.33452 16.7765 8.2573 16.7271C8.13302 16.6479 8.04529 16.5225 8.0134 16.3787C7.98152 16.2348 8.0081 16.0841 8.0873 15.9598C8.1665 15.8356 8.29182 15.7478 8.4357 15.7159C8.57959 15.6841 8.73024 15.7106 8.85452 15.7898C8.87675 15.8037 11.0784 17.1743 13.2134 16.6048C14.394 16.2904 15.3617 15.4298 16.0895 14.0487C16.1582 13.9183 16.2758 13.8205 16.4166 13.7769C16.5573 13.7332 16.7097 13.7473 16.8401 13.8159C16.9705 13.8846 17.0683 14.0023 17.1119 14.143C17.1556 14.2838 17.1415 14.4361 17.0729 14.5665C16.1923 16.2365 14.9873 17.2848 13.4912 17.6809C12.7929 17.8654 12.1012 17.8887 11.4612 17.8215Z" fill="#FCFCFC" />
                  </g>
                  <defs>
                    <clipPath id="clip0_7159_6834">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className=" font-extrabold">Personal:</span>
                {nomePersonal || "Nome não informado"}
              </span>
              <span className="text-sm sm:text-base font-light text-[var(--cor-primaria)] leading-tight flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.3333 10.0003C18.3333 14.6003 14.6 18.3337 9.99996 18.3337C5.39996 18.3337 1.66663 14.6003 1.66663 10.0003C1.66663 5.40033 5.39996 1.66699 9.99996 1.66699C14.6 1.66699 18.3333 5.40033 18.3333 10.0003Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M13.0917 12.6505L10.5083 11.1088C10.0583 10.8421 9.69165 10.2005 9.69165 9.67546V6.25879" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {experienciaPersonal ? `${experienciaPersonal} anos de experiência` : "Experiência não informada"}
              </span>
              <span className="text-sm sm:text-base font-light text-[var(--cor-primaria)] leading-tight flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.1666 17.0837H5.83329C3.33329 17.0837 1.66663 15.8337 1.66663 12.917V7.08366C1.66663 4.16699 3.33329 2.91699 5.83329 2.91699H14.1666C16.6666 2.91699 18.3333 4.16699 18.3333 7.08366V12.917C18.3333 15.8337 16.6666 17.0837 14.1666 17.0837Z" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14.1667 7.5L11.5584 9.58333C10.7 10.2667 9.2917 10.2667 8.43337 9.58333L5.83337 7.5" stroke="#1D2D44" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {emailPersonal || "Email não informado"}
              </span>
              <span className="text-sm sm:text-base font-light text-[var(--cor-primaria)] leading-tight flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.01773 7.07533C4.65939 -0.141339 15.3511 -0.133006 16.9844 7.08366C17.9427 11.317 15.3094 14.9003 13.0011 17.117C11.3261 18.7337 8.67606 18.7337 6.99273 17.117C4.69273 14.9003 2.05939 11.3087 3.01773 7.07533Z" fill="#FDFCFA" stroke="#1D2D44" strokeWidth="2" />
                  <path d="M10.0004 11.1912C11.4363 11.1912 12.6004 10.0272 12.6004 8.59121C12.6004 7.15527 11.4363 5.99121 10.0004 5.99121C8.56445 5.99121 7.40039 7.15527 7.40039 8.59121C7.40039 10.0272 8.56445 11.1912 10.0004 11.1912Z" stroke="#1D2D44" strokeWidth="2" />
                </svg>
                {locaisAtendimento || "Locais não informados"}
              </span>
            </>
          )}
          <div className="w-full h-auto flex flex-row justify-between items-center">
            <Button
              texto="Avaliar Personal"
              cor={ativo ? "#748CAB" : "#B0B0B0"}
              corTexto="#FFFFFF"
              width="140px"
              height="30px"
              fontSize="12px"
              classNameExtra="mt-2"
              onClick={ativo ? onAvaliarPersonal : undefined}
            />
            <button
              aria-expanded={expandido}
              aria-label={expandido ? "Recolher detalhes do personal" : "Expandir detalhes do personal"}
              onClick={() => setExpandido(!expandido)}
              className="text-sm text-[var(--laranja)] hover:underline w-full flex flex-row justify-end items-center h-full"
            >
              {expandido ? (
                <svg width="24" height="8" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1314 6.25233C16.6049 5.92615 16.6049 5.39725 16.1314 5.07107L10.1997 0.988732C9.25253 0.336881 7.71778 0.337131 6.77108 0.989233L0.841705 5.07408C0.368113 5.40026 0.368113 5.92916 0.841705 6.25535C1.31518 6.58155 2.08292 6.58155 2.55639 6.25535L7.63133 2.75919C8.1048 2.43293 8.87254 2.43301 9.34601 2.75919L14.4167 6.25233C14.8902 6.57854 15.6579 6.57854 16.1314 6.25233Z" fill="#1D2D44" />
                </svg>
              ) : (
                <svg width="24" height="8" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.355131 0.247666C-0.118377 0.573851 -0.118377 1.10275 0.355131 1.42893L6.28679 5.51127C7.23398 6.16312 8.76873 6.16287 9.71543 5.51077L15.6448 1.42592C16.1184 1.09974 16.1184 0.570844 15.6448 0.244651C15.1713 -0.0815504 14.4036 -0.0815504 13.9301 0.244651L8.85518 3.74081C8.38171 4.06707 7.61397 4.06699 7.1405 3.74081L2.06983 0.247666C1.59633 -0.0785353 0.828627 -0.0785353 0.355131 0.247666Z" fill="#1D2D44" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>
    </>
  )
};

export default CardPlano;