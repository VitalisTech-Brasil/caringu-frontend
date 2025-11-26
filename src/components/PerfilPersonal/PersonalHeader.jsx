import React from "react";
import Header from "../Aluno/Header/Header";

const PersonalHeader = ({ menuRef, onBack }) => (
  <>
    <Header
      title="Procurando Personal"
      menuRef={menuRef}
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.26245 27.5C4.26245 22.6625 9.07499 18.75 15 18.75" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22.75 26.75C24.9592 26.75 26.75 24.9592 26.75 22.75C26.75 20.5409 24.9592 18.75 22.75 18.75C20.5409 18.75 18.75 20.5409 18.75 22.75C18.75 24.9592 20.5409 26.75 22.75 26.75Z" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M27.5 27.5L26.25 26.25" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      }
    />
    <div className="w-full h-auto">
      <div className="pl-3 md:pl-[2.5rem] pt-2 w-full h-auto">
        <svg xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none"
          className="cursor-pointer"
          onClick={onBack}>
          <path d="M21.1331 13.0957L7.72852 26.5003L21.1331 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M45.2717 26.5H8.10547" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  </>
);

export default PersonalHeader;
