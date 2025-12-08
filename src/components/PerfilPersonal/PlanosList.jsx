import React from "react";
import CardPlano from "../Utils/CardPlano";

const PlanosList = ({ planos, verfificaStatus, contratarPlano }) => (
  <div className="ml-3 md:ml-10 mt-4 overflow-x-auto max-w-[93vw]">
    <div className="flex gap-9 w-fit">
      {planos.map((item) => {
        const existePlanoContratado = verfificaStatus && ["PENDENTE", "EM_PROCESSO", "ATIVO"].includes(verfificaStatus.status);
        const isPlanoContratado = existePlanoContratado && item.id === verfificaStatus.planoId;
        const disabled = existePlanoContratado ? !isPlanoContratado : false;
        return (
          <CardPlano
            key={item.id}
            id={item.id}
            nome={item.nome}
            periodo={item.periodo}
            quantidadeAulas={item.quantidadeAulas}
            valorAulas={item.valorAulas}
            valorPlano={item.valorAulas * item.quantidadeAulas}
            showDropdown={false}
            showContratarPlano={true}
            onModalContratar={() => {
              if (!existePlanoContratado || isPlanoContratado) {
                contratarPlano(item.id);
              }
            }}
            textoBotao={
              isPlanoContratado
                ? "Verificar Status"
                : "Contratar Plano"
            }
            disabled={disabled}
            className={disabled ? "card-plano-disabled" : ""}
          />
        );
      })}
    </div>
  </div>
);

export default PlanosList;
