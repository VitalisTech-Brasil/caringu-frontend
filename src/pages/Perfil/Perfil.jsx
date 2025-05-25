import { Tabs } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Personal/Header/Header";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import ModalRemoverEspecialidade from "../../components/Utils/ModalRemoverEspecialidade";
import { caringuApi } from '../../provider/caringuApi';
import Secoes from "../../components/PerfilPersonal/Secoes/Secoes";

const Perfil = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(null);
    const [deletarContaModal, setDeletarContaModal] = useState(false);
    const navigate = useNavigate();

    const handleRemoveEspecialidade = async (idEspecialidade) => {
        const pessoaId = sessionStorage.getItem('pessoaId');

        try {
            await caringuApi.delete(`/personal-trainers/${pessoaId}/especialidades/${idEspecialidade}`);

            setFormData((prev) => ({
                ...prev,
                especialidades: prev.especialidades.filter(e => e.id !== idEspecialidade)
            }));
        } catch (error) {
            console.error("Erro ao remover especialidade:", error);
            alert("Não foi possível remover a especialidade. Tente novamente.");
        }
    };

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
            alert("Não foi possível deletar a conta. Tente novamente.");
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#fdfcf9]">
            {/* Menu Lateral visível apenas em telas médias para cima */}
            <div className="hidden md:block">
                <MenuLateral isOpen={true} />
            </div>

            <div className="flex-1 flex flex-col w-full">
                {/* Cabeçalho */}
                <Header />

                <main className="flex-grow p-4 md:p-8 space-y-8 w-full">
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