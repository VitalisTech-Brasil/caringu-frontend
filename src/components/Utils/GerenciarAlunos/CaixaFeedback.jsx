import React from 'react';
import MensagemFeedback from './MensagemFeedback';

const CaixaFeedback = ({ aula, mensagens, aluno }) => {
  if (!aula) return null;

  return (
    <div className="border-2 border-gray-300 rounded p-2 flex flex-col h-auto max-h-[350px] w-[92%] gap-2 overflow-y-auto">
      <div className="flex flex-row items-center gap-3 text-black text-base font-semibold">
        <svg className="shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 1V2.5" stroke="#1D2D44" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1V2.5" stroke="#1D2D44" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 1.75C9.665 1.84 10.5 2.475 10.5 4.825V7.915C10.5 9.975 10 11.005 7.5 11.005H4.5C2 11.005 1.5 9.975 1.5 7.915V4.825C1.5 2.475 2.335 1.845 4 1.75H8Z" stroke="#1D2D44" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.375 8.80005H1.625" stroke="#1D2D44" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span>
          {aula.diaSemana}, {aula.data} - {aula.horarioInicio}
        </span>
      </div>

      {mensagens.length === 0 ? (
        <div className="w-full text-center text-sm text-[#15171B87] py-4">
          Nenhum comentário sobre esse treino foi feito.
        </div>
      ) : (
        mensagens.map(m => (
          <MensagemFeedback
            key={m.id}
            label={m.label}
            texto={m.texto}
            paddingLeftMensagem={aluno === "aluno" ? "5%" : "10%"}
          />
        ))
      )}
    </div>
  );
};

export default CaixaFeedback;