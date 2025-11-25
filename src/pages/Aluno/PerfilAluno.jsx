import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Aluno/Header/Header";
import ModalRemoverEspecialidade from "../../components/Utils/ModalRemoverEspecialidade";
import { caringuApi } from '../../provider/caringuApi';
import Secoes from "../../components/PerfilPersonal/Secoes/Secoes";
import { toast } from 'react-hot-toast';
import CustomToast from "../../components/Utils/CustomToast.jsx";
import MenuLateralAluno from "../../components/Aluno/MenuLateral/MenuLateral";
import { useFotoPerfil } from "../../context/FotoPerfilContext";

const PerfilAluno = () => {
  const { fotoPerfil, setFotoPerfil } = useFotoPerfil();
  const [modalVisible, setModalVisible] = useState(false);
  const [accountIdToDelete, setAccountIdToDelete] = useState(null);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleCancelRemove = () => {
    setModalVisible(false);
    setAccountIdToDelete(null);
  };

  const handleDeleteAccount = async () => {
    const personId = sessionStorage.getItem('pessoaId');
    try {
      // Corrigido: deve deletar o aluno, não o personal trainer
      await caringuApi.delete(`/alunos/${personId}`);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      toast.custom((t) => (
        <CustomToast t={t} type="error" message="Não foi possível deletar a conta. Tente novamente." />
      ));
    }
  };

  const handlePhotoChange = (newPhoto) => {
    setFotoPerfil(newPhoto);
  };

  return (
    <div className="flex md:flex-row min-h-screen bg-[var(--cor-secundaria)]">
      <MenuLateralAluno ref={menuRef} />
      <div className="flex-1 flex flex-col w-full overflow-y-auto">
        <Header
          title="Perfil"
          menuRef={menuRef}
          icon={
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M25.7375 27.5C25.7375 22.6625 20.925 18.75 15 18.75C9.07501 18.75 4.26251 22.6625 4.26251 27.5" stroke="#1D2D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          }
        />
        <main className="flex-grow p-4 md:p-8 space-y-8 w-full h-[90vh]">
          {modalVisible && (
            <ModalRemoverEspecialidade
              especialidadeId={accountIdToDelete}
              onConfirm={handleDeleteAccount}
              onCancel={handleCancelRemove}
            />
          )}
          <div className="w-full">
            {/* Forçar remount de Secoes quando fotoPerfil mudar */}
            <Secoes
              key={fotoPerfil || 'secoes-aluno'}
              fotoPerfil={fotoPerfil}
              onFotoChange={handlePhotoChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfilAluno;