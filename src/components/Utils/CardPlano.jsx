import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";

const CardPlano = ({ onEditar, onDeletar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); 
  const buttonRef = useRef(null); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleEdit = () => {
    setMenuOpen(false);
    onEditar && onEditar();
  };

  const handleDelete = () => {
    setMenuOpen(false);
    onDeletar && onDeletar();
  };


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
      <div className="w-[250px] sm:w-[450px] 2xl:w-[560px] h-auto rounded-md border-[2px] border-[#1D2D441C] sm:p-4 sm:pl-10 p-6 relative flex flex-col justify-center ">
        <div className="h-auto  flex flex-row items-end justify-between">
          <h5 className=" text-sm sm:text-[32px] 2xl:text-[40px] font-medium text-[var(--cor-primaria)] ">Plano Basic</h5>
          <div className="h-full flex flex-row justify-end w-[12rem] gap-[0.3rem]">
            <div className="h-full  flex flex-row items-end ">
              <span className="font-light text-sm sm:text-xl 2xl:text-2xl bg-[#748CAB36] h-[2.75rem] pl-2 pr-2 sm:pl-6 sm:pr-6 w-auto rounded-[15px] flex flex-row items-center justify-center text-[var(--azul-claro)]">Mensal</span>
            </div>
            {menuOpen && (
              // <div className="absolute  mt-10 w-37 h-19 bg-[var(--cor-secundaria)] rounded-md flex flex-col justify-center border-[#1D2D441A] border-solid border-[2px]">
              <div ref={menuRef} className="absolute mr-10 w-37 h-19 bg-[var(--cor-secundaria)] rounded-md flex flex-col justify-center border-[#1D2D441A] border-solid border-[2px]">
                <div className="py-1 pl-1 pr-1">
                  <div className="flex flex-row items-center w-full hover:bg-[#1D2D4417] h-8 rounded-md cursor-pointer"
                    onClick={handleEdit}>
                      <Button
                      texto="Editar"
                      width="110px"
                      fontSize="16px"
                      fontWeight="400"
                      color="var(--cor-primaria)"
                      >
                      </Button>

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2">
                      <path d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z" fill="#738CAB" />
                      <path d="M19.0201 3.47967C17.0801 1.53967 15.1801 1.48967 13.1901 3.47967L11.9801 4.68967C11.8801 4.78967 11.8401 4.94967 11.8801 5.08967C12.6401 7.73967 14.7601 9.85967 17.4101 10.6197C17.4501 10.6297 17.4901 10.6397 17.5301 10.6397C17.6401 10.6397 17.7401 10.5997 17.8201 10.5197L19.0201 9.30967C20.0101 8.32967 20.4901 7.37967 20.4901 6.41967C20.5001 5.42967 20.0201 4.46967 19.0201 3.47967Z" fill="#738CAB" />
                      <path d="M15.6101 11.5298C15.3201 11.3898 15.0401 11.2498 14.7701 11.0898C14.5501 10.9598 14.3401 10.8198 14.1301 10.6698C13.9601 10.5598 13.7601 10.3998 13.5701 10.2398C13.5501 10.2298 13.4801 10.1698 13.4001 10.0898C13.0701 9.8098 12.7001 9.4498 12.3701 9.0498C12.3401 9.0298 12.2901 8.9598 12.2201 8.8698C12.1201 8.7498 11.9501 8.5498 11.8001 8.3198C11.6801 8.1698 11.5401 7.9498 11.4101 7.7298C11.2501 7.4598 11.1101 7.1898 10.9701 6.9098C10.9489 6.86441 10.9284 6.81924 10.9085 6.77434C10.7609 6.44102 10.3263 6.34358 10.0685 6.60133L4.34007 12.3298C4.21007 12.4598 4.09007 12.7098 4.06007 12.8798L3.52007 16.7098C3.42007 17.3898 3.61007 18.0298 4.03007 18.4598C4.39007 18.8098 4.89007 18.9998 5.43007 18.9998C5.55007 18.9998 5.67007 18.9898 5.79007 18.9698L9.63007 18.4298C9.81007 18.3998 10.0601 18.2798 10.1801 18.1498L15.9014 12.4285C16.1609 12.1689 16.063 11.7235 15.7254 11.5794C15.6874 11.5632 15.649 11.5467 15.6101 11.5298Z" fill="#738CAB" />
                    </svg>
                  </div>
                  <div className="flex w-full hover:bg-[#1D2D4417] flex-row items-center h-8 rounded-md cursor-pointer"
                        onClick={handleDelete}>

                  <Button
                  texto="Deletar"
                  width="110px"
                  fontSize="16px"
                  fontWeight="400"
                  color="var(--cor-primaria)"
                  >
                  </Button>

                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-2">
                      <path d="M21.0699 5.23C19.4599 5.07 17.8499 4.95 16.2299 4.86V4.85L16.0099 3.55C15.8599 2.63 15.6399 1.25 13.2999 1.25H10.6799C8.34991 1.25 8.12991 2.57 7.96991 3.54L7.75991 4.82C6.82991 4.88 5.89991 4.94 4.96991 5.03L2.92991 5.23C2.50991 5.27 2.20991 5.64 2.24991 6.05C2.28991 6.46 2.64991 6.76 3.06991 6.72L5.10991 6.52C10.3499 6 15.6299 6.2 20.9299 6.73C20.9599 6.73 20.9799 6.73 21.0099 6.73C21.3899 6.73 21.7199 6.44 21.7599 6.05C21.7899 5.64 21.4899 5.27 21.0699 5.23Z" fill="#B41F1F" />
                      <path d="M19.23 8.14C18.99 7.89 18.66 7.75 18.32 7.75H5.67999C5.33999 7.75 4.99999 7.89 4.76999 8.14C4.53999 8.39 4.40999 8.73 4.42999 9.08L5.04999 19.34C5.15999 20.86 5.29999 22.76 8.78999 22.76H15.21C18.7 22.76 18.84 20.87 18.95 19.34L19.57 9.09C19.59 8.73 19.46 8.39 19.23 8.14ZM13.66 17.75H10.33C9.91999 17.75 9.57999 17.41 9.57999 17C9.57999 16.59 9.91999 16.25 10.33 16.25H13.66C14.07 16.25 14.41 16.59 14.41 17C14.41 17.41 14.07 17.75 13.66 17.75ZM14.5 13.75H9.49999C9.08999 13.75 8.74999 13.41 8.74999 13C8.74999 12.59 9.08999 12.25 9.49999 12.25H14.5C14.91 12.25 15.25 12.59 15.25 13C15.25 13.41 14.91 13.75 14.5 13.75Z" fill="#B41F1F" />
                    </svg>
                  </div>


                </div>
              </div>
            )}
            <div className="h-full"  ref={buttonRef}>
              <span className="group">
                <svg xmlns="http://www.w3.org/2000/svg"
                  onClick={toggleMenu}
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  role="button" aria-label="Mais opções do plano"
                  className="group-hover:[&_rect]:fill-[#1D2D4417] cursor-pointer"
                >
                  <rect width="38" height="38" rx="6" fill="#FFFDF6" className="transition-colors duration-20" />
                  <path d="M21 12C21 10.9 20.1 10 19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12Z" fill="#15171B" />
                  <path d="M21 19C21 17.9 20.1 17 19 17C17.9 17 17 17.9 17 19C17 20.1 17.9 21 19 21C20.1 21 21 20.1 21 19Z" fill="#15171B" />
                  <path d="M21 26C21 24.9 20.1 24 19 24C17.9 24 17 24.9 17 26C17 27.1 17.9 28 19 28C20.1 28 21 27.1 21 26Z" fill="#15171B" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 sm:mt-0 flex items-baseline w-full gap-3">
          <span className=" text-base sm:text-2xl 2xl:text-[32px] font-extrabold text-[var(--azul-claro)]">R$</span>
          <span className="text-base sm:text-2xl 2xl:text-[32px] font-extrabold text-[var(--cor-primaria)]">500,00</span>
        </div>
        <ul role="list" className="space-y-7 my-4">
          <li className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-[30px] sm:h-[30px]" viewBox="0 0 30 30" fill="none">
              <path d="M15.0002 0.833008C7.19433 0.833008 0.833496 7.19384 0.833496 14.9997C0.833496 22.8055 7.19433 29.1663 15.0002 29.1663C22.806 29.1663 29.1668 22.8055 29.1668 14.9997C29.1668 7.19384 22.806 0.833008 15.0002 0.833008ZM21.1627 20.0572C20.9643 20.3972 20.6102 20.5813 20.2418 20.5813C20.0577 20.5813 19.8735 20.5388 19.7035 20.4255L15.3118 17.8047C14.221 17.153 13.4135 15.7222 13.4135 14.4613V8.65301C13.4135 8.07217 13.8952 7.59051 14.476 7.59051C15.0568 7.59051 15.5385 8.07217 15.5385 8.65301V14.4613C15.5385 14.9713 15.9635 15.7222 16.4027 15.9772L20.7943 18.598C21.3043 18.8955 21.4743 19.5472 21.1627 20.0572Z" fill="#1D2D44" />
            </svg>
            <span className="text-base sm:text-xl 2xl:text-2xl font-light text-[var(--cor-primaria)] leading-tight ms-6">60 min por aula</span>
          </li>
          <li className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-[34px] sm:h-[34px]" viewBox="0 0 34 34" fill="none">
              <path d="M12.9766 15.3988C12.835 15.3847 12.665 15.3847 12.5091 15.3988C9.13746 15.2855 6.45996 12.523 6.45996 9.12301C6.45996 5.65217 9.26496 2.83301 12.75 2.83301C16.2208 2.83301 19.04 5.65217 19.04 9.12301C19.0258 12.523 16.3483 15.2855 12.9766 15.3988Z" stroke="#748CAB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M23.2476 5.66699C25.996 5.66699 28.206 7.89116 28.206 10.6253C28.206 13.3028 26.081 15.4845 23.4318 15.5837C23.3185 15.5695 23.191 15.5695 23.0635 15.5837" stroke="#748CAB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M5.89352 20.627C2.46518 22.922 2.46518 26.662 5.89352 28.9428C9.78935 31.5495 16.1785 31.5495 20.0743 28.9428C23.5027 26.6478 23.5027 22.9078 20.0743 20.627C16.1927 18.0345 9.80352 18.0345 5.89352 20.627Z" stroke="#748CAB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M25.9814 28.333C27.0014 28.1205 27.9648 27.7097 28.7581 27.1005C30.9681 25.443 30.9681 22.7088 28.7581 21.0513C27.9789 20.4563 27.0298 20.0597 26.0239 19.833" stroke="#748CAB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span className="text-base sm:text-xl 2xl:text-2xl font-light text-[var(--cor-primaria)] leading-tight  ms-6">5 aulas</span>
          </li>
          <li className="flex">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-[34px] sm:h-[34px]" viewBox="0 0 34 34" fill="none">
              <path d="M17 0C7.61702 0 0 7.61702 0 17C0 26.383 7.61702 34 17 34C26.383 34 34 26.383 34 17C33.9787 7.61702 26.383 0 17 0ZM15 14.617L20.1277 16.4043C21.9787 17.0638 22.8723 18.3617 22.8723 20.3617C22.8723 22.6596 21.0426 24.5532 18.8085 24.5532H18.617V24.6596C18.617 25.5319 17.8936 26.2553 17.0213 26.2553C16.1489 26.2553 15.4255 25.5319 15.4255 24.6596V24.5319C13.0638 24.4255 11.1702 22.4468 11.1702 19.9787C11.1702 19.1064 11.8936 18.383 12.766 18.383C13.6383 18.383 14.3617 19.1064 14.3617 19.9787C14.3617 20.7447 14.9149 21.3617 15.5957 21.3617H18.7872C19.2766 21.3617 19.6596 20.9149 19.6596 20.3617C19.6596 19.617 19.5319 19.5745 19.0426 19.4043L13.9149 17.617C12.0851 16.9787 11.1702 15.6809 11.1702 13.6596C11.1702 11.3617 13 9.46808 15.234 9.46808H15.4255V9.38298C15.4255 8.51064 16.1489 7.78723 17.0213 7.78723C17.8936 7.78723 18.617 8.51064 18.617 9.38298V9.51064C20.9787 9.61702 22.8723 11.5957 22.8723 14.0638C22.8723 14.9362 22.1489 15.6596 21.2766 15.6596C20.4043 15.6596 19.6809 14.9362 19.6809 14.0638C19.6809 13.2979 19.1277 12.6809 18.4468 12.6809H15.2553C14.766 12.6809 14.383 13.1277 14.383 13.6809C14.3617 14.4043 14.4894 14.4468 15 14.617Z" fill="#1D2D44" />
            </svg>
            <span className="text-base sm:text-xl 2xl:text-2xl font-semibold text-[var(--cor-primaria)] leading-tight ms-6">R$100</span>
            <span className="text-base sm:text-xl 2xl:text-2xl font-light text-[var(--cor-primaria)] leading-tight ms-2">por aula</span>
          </li>
        </ul>
      </div>
    </>
  )
};

export default CardPlano;