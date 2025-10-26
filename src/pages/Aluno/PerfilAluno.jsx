import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Aluno/Header/Header";
import ModalRemoverEspecialidade from "../../components/Utils/ModalRemoverEspecialidade";
import { caringuApi } from '../../provider/caringuApi';
import Secoes from "../../components/PerfilPersonal/Secoes/Secoes";
import { toast } from 'react-hot-toast';
import CustomToast from "../../components/Utils/CustomToast.jsx";
import MenuLateralAluno from "../../components/Aluno/MenuLateral/MenuLateral";

const PerfilAluno = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(null);
    const navigate = useNavigate();
    const menuRef = useRef(null);

    const handleCancelRemove = () => {
        setModalVisible(false);
        setEspecialidadeSelecionada(null);
    };

    const handleDeletarConta = async () => {
        const pessoaId = sessionStorage.getItem('pessoaId');

        try {
            await caringuApi.delete(`/personal-trainers/${pessoaId}`);
            navigate("/", { replace: true });
            
        } catch (error) {
            console.error("Erro ao deletar conta:", error);
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Não foi possível deletar a conta. Tente novamente." />
            ));
        }
    };

    return (
        <div className="flex md:flex-row min-h-screen bg-[var(--cor-secundaria)]">
            {/* Menu Lateral visível apenas em telas médias para cima */}

            <MenuLateralAluno ref={menuRef} />

            <div className="flex-1 flex flex-col w-full overflow-y-auto">
                {/* Cabeçalho */}
                <Header
                    title="Perfil"
                    menuRef={menuRef}
                    icon={
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 15C18.4518 15 21.25 12.2018 21.25 8.75C21.25 5.29822 18.4518 2.5 15 2.5C11.5482 2.5 8.75 5.29822 8.75 8.75C8.75 12.2018 11.5482 15 15 15Z" stroke="#1D2D44" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M25.7375 27.5C25.7375 22.6625 20.925 18.75 15 18.75C9.07501 18.75 4.26251 22.6625 4.26251 27.5" stroke="#1D2D44" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    }
                />

                <main className="flex-grow p-4 md:p-8 space-y-8 w-full h-[90vh]">
                    {/* Modal de confirmação */}
                    {modalVisible && (
                        <ModalRemoverEspecialidade
                            especialidadeId={especialidadeSelecionada}
                            onConfirm={handleDeletarConta}
                            onCancel={handleCancelRemove}
                        />
                    )}

                    {/* Seções */}
                    <div className="w-full">
                        <Secoes />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default PerfilAluno