import { Tabs } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Personal/Header/Header";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import ModalRemoverEspecialidade from "../../components/Utils/ModalRemoverEspecialidade";
import { caringuApi } from '../../provider/caringuApi';
import Secoes from "../../components/PerfilPersonal/Secoes/Secoes";
import { Toaster, toast } from 'react-hot-toast';
import CustomToast from "../../components/Utils/CustomToast.jsx";

const Perfil = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(null);
    const [deletarContaModal, setDeletarContaModal] = useState(false);
    const navigate = useNavigate();

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
        <div className="flex md:flex-row min-h-screen bg-[#fdfcf9]">
            {/* Menu Lateral visível apenas em telas médias para cima */}

            <MenuLateral isOpen={true} />

            <div className="flex-1 flex flex-col w-full overflow-y-auto">
                {/* Cabeçalho */}
                <Header />

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
};

export default Perfil;