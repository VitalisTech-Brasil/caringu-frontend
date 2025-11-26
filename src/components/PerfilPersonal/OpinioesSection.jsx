import React from "react";
import CardOpiniao from "../Utils/CardOpiniao";
import MascaraData from "../Utils/Functions/MascaraData";
import Button from "../Utils/Button";
import Rating from "react-rating";

const StarFull = () => (
  <svg className="mx-0.5 w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
    <path d="M20.5954 5.26496L23.2354 10.545C23.5954 11.28 24.5554 11.985 25.3654 12.12L30.1504 12.915C33.2104 13.425 33.9304 15.645 31.7253 17.835L28.0054 21.555C27.3754 22.185 27.0303 23.4 27.2253 24.27L28.2904 28.875C29.1304 32.52 27.1954 33.93 23.9704 32.025L19.4854 29.37C18.6754 28.89 17.3404 28.89 16.5154 29.37L12.0304 32.025C8.82035 33.93 6.87035 32.505 7.71035 28.875L8.77535 24.27C8.97035 23.4 8.62535 22.185 7.99535 21.555L4.27535 17.835C2.08535 15.645 2.79035 13.425 5.85035 12.915L10.6354 12.12C11.4304 11.985 12.3904 11.28 12.7504 10.545L15.3904 5.26496C16.8304 2.39996 19.1704 2.39996 20.5954 5.26496Z" fill="#E96E35" stroke="#E96E35" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarEmpty = () => (
  <svg className="mx-0.5 w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
    <path d="M20.5954 5.26496L23.2354 10.545C23.5954 11.28 24.5554 11.985 25.3654 12.12L30.1504 12.915C33.2104 13.425 33.9304 15.645 31.7254 17.835L28.0054 21.555C27.3754 22.185 27.0304 23.4 27.2254 24.27L28.2904 28.875C29.1304 32.52 27.1954 33.93 23.9704 32.025L19.4854 29.37C18.6754 28.89 17.3404 28.89 16.5154 29.37L12.0304 32.025C8.82035 33.93 6.87035 32.505 7.71035 28.875L8.77535 24.27C8.97035 23.4 8.62535 22.185 7.99535 21.555L4.27535 17.835C2.08535 15.645 2.79035 13.425 5.85035 12.915L10.6354 12.12C11.4304 11.985 12.3904 11.28 12.7504 10.545L15.3904 5.26496C16.8304 2.39996 19.1704 2.39996 20.5954 5.26496Z" stroke="#1D2D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OpinioesSection = ({
  opinioes,
  loadingOpinioes,
  rating,
  ratingChanged,
  handleLimparFiltro,
}) => (
  <div className="flex flex-row w-full h-auto">
    <div className="flex flex-col w-[95%] h-auto mt-3 mb-6 ml-3 md:ml-[2.5rem] pt-5 border-solid border-[#1D2D441C] border-2 rounded-md">
      <div className="w-[95%] h-auto flex flex-col lg:flex-row items-start gap-3 lg:gap-0 lg:items-center justify-between pl-[10%] sm:pl-[5rem]">
        <span className="text-[var(--cor-primaria)] text-base xl:text-[28px] 2xl:text-[32px] font-medium">
          Opiniões sobre o personal:
        </span>
        <div className="gap-5 p-4 flex flex-col md:flex-row items-center justify-center text-[var(--cor-primaria)] h-auto w-full lg:w-auto rounded-md border-solid border-[#1D2D441C] border-2 text-base xl:text-[20px] font-light">
          <span>Exibir por avaliação</span>
          <div className="flex flex-row gap-3 items-center justify-between">
            <div className="pt-2 pb-2">
              <Rating
                initialRating={rating}
                fractions={2}
                emptySymbol={<StarEmpty />}
                fullSymbol={<StarFull />}
                onChange={ratingChanged}
              />
            </div>
            <Button
              type="button"
              onClick={handleLimparFiltro}
              classNameExtra="px-3 py-2 bg-[#E96E35] text-white rounded text-sm cursor-pointer hover:bg-[#cf5c29] transition-colors"
              aria-label="Limpar filtro de avaliações"
              texto="Limpar"
            />
          </div>
        </div>
      </div>
      <div className="pl-[10%] sm:pl-[5rem] grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4 w-full pb-4">
        {loadingOpinioes ? (
          <div className="col-span-1 xl:col-span-2 flex justify-center items-center py-8">
            <div className="flex items-center gap-3 text-[var(--cor-primaria)]">
              <svg className="animate-spin h-6 w-6 text-[#E96E35]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span>Carregando opiniões...</span>
            </div>
          </div>
        ) : opinioes.length === 0 ? (
          <div className="text-center text-[var(--cor-primaria)] font-medium text-lg sm:text-2xl ">
            Ainda não existe nenhuma opinião para este personal.
          </div>
        ) : (
          opinioes.map((opiniao, index) => (
            <CardOpiniao
              key={index}
              nota={opiniao.nota}
              nome={opiniao.nomeAluno}
              comentario={opiniao.comentario}
              dataAvaliacao={MascaraData(opiniao.dataAvaliacao?.split('T')[0])}
              urlFotoAluno={opiniao.urlFotoAluno}
            />
          ))
        )}
      </div>
    </div>
  </div>
);

export default OpinioesSection;
