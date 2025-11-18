import React from "react";
import CardPersonal from "../Utils/CardPersonal";
import MascaraTelefone from "../Utils/Functions/MascaraTelefone";

const PersonalInfoCard = ({ infoPersonal }) => (
  <div>
    <CardPersonal
      nomePersonal={infoPersonal.nomePersonal}
      cidade={infoPersonal.cidade}
      experiencia={infoPersonal.experiencia}
      celular={MascaraTelefone(infoPersonal.celular)}
      email={infoPersonal.email}
      especialidades={infoPersonal.especialidades}
      urlFoto={infoPersonal.urlFotoPerfil}
      mediaEstrela={infoPersonal.mediaEstrela}
      quantidadeAvaliacao={infoPersonal.quantidadeAvaliacao}
    />
  </div>
);

export default PersonalInfoCard;
