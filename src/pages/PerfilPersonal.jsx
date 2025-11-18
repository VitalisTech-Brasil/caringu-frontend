import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { caringuApi } from "../provider/caringuApi";
import { Toaster } from "react-hot-toast";
import toast from 'react-hot-toast';
import CustomToast from '../components/Utils/CustomToast';
import MenuLateralAluno from "../components/Aluno/MenuLateral/MenuLateral";
import PersonalHeader from "../components/PerfilPersonal/PersonalHeader";
import PersonalInfoCard from "../components/PerfilPersonal/PersonalInfoCard";
import PlanosList from "../components/PerfilPersonal/PlanosList";
import OpinioesSection from "../components/PerfilPersonal/OpinioesSection";
import ContratarModal from "../components/PerfilPersonal/ContratarModal";

const PerfilPersonal = () => {
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const [modalContratar, setModalContratar] = useState(false);
    const [planoSelecionado, setPlanoSelecionado] = useState(null);
    const [infoPersonal, setInfoPersonal] = useState({ planos: [] });
    const [verfificaStatus, setVerificaStatus] = useState(null);
    const [statusEtapa, setStatusEtapa] = useState("");
    const [opinioes, setOpinioes] = useState([]);
    const [loadingOpinioes, setLoadingOpinioes] = useState(false);
    const [limparFiltro, setLimparFiltro] = useState(false);
    const [lastFiltroNota, setLastFiltroNota] = useState(null);
    const { id } = useParams();
    const idAluno = sessionStorage.getItem('pessoaId');
    const [rating, setRating] = React.useState(0.0);

    const exibirAvaliacoes = async (filtroNota = 0, forceAll = false) => {
        setLoadingOpinioes(true);
        try {
            let url = `/avaliacoes/personal/filtrar-por-nota/${id}`;

            if (!forceAll && filtroNota > 0) {
                url += `?filtroNota=${filtroNota}`;
            }
            const response = await caringuApi.get(url);
            setOpinioes(response.data);
            setLimparFiltro(false);
            setLastFiltroNota(filtroNota);
        } catch (error) {
            console.error("Erro ao buscar Avaliações:", error);
        } finally {
            setLoadingOpinioes(false);
        }
    };


    const fetchPlanos = async () => {
        try {
            const response = await caringuApi.get(`/personal-trainers/disponiveis/${id}`);
            setInfoPersonal(response.data);

            const planoEmProcesso = await caringuApi.get(`planos-contratados/alunos/${idAluno}/contratacao-pendente`);
            const planoPendente = Array.isArray(planoEmProcesso.data) && planoEmProcesso.data.length > 0
                ? planoEmProcesso.data[0]
                : null;
            setVerificaStatus(planoPendente);
        } catch (error) {
            console.error("Erro ao buscar planos:", error);
        }
    };


    const contratarPlano = (idPlano) => {
        openModalContratar(idPlano);
    };

    useEffect(() => {
        fetchPlanos();
        exibirAvaliacoes();
    }, []);

    const openModalContratar = (id) => {
        setPlanoSelecionado(id);
        setModalContratar(true);
    }

    const closeModalContratar = () => {
        setModalContratar(false);
        setPlanoSelecionado(null);
    }

    const handleJaCombinei = async () => {
        try {
            await caringuApi.post(
                `/planos-contratados/contratarPlano/${idAluno}/${planoSelecionado}`
            );
            setStatusEtapa("PENDENTE");
            fetchPlanos();
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao combinar com o personal." />
            ));
        }
    };

    const handleConfirmarPagamento = async () => {
        try {
            await caringuApi.patch(
                `/planos-contratados/${verfificaStatus.id}/status`,
                { status: "EM_PROCESSO" }
            );
            setStatusEtapa("COMBINADO");
            fetchPlanos();
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao confirmar pagamento." />
            ));
        }
    };

    useEffect(() => {
        if (modalContratar && verfificaStatus && planoSelecionado === verfificaStatus.planoId) {
            if (verfificaStatus.status === "PENDENTE") setStatusEtapa("PENDENTE");
            else if (verfificaStatus.status === "EM_PROCESSO") setStatusEtapa("COMBINADO");
            else if (verfificaStatus.status === "ATIVO") setStatusEtapa("PAGO");
        } else if (modalContratar) {
            setStatusEtapa("INICIAL");
        }
    }, [modalContratar, verfificaStatus, planoSelecionado]);


    const ratingChanged = (newRating) => {
        setRating(newRating);
        exibirAvaliacoes(newRating);
    };

    const handleLimparFiltro = () => {

        if (lastFiltroNota === 0) {
            setRating(0);
            return;
        }
        setRating(0);
        exibirAvaliacoes(0, true);
    };

    return (
        <>
            <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
                <MenuLateralAluno
                    ref={menuRef}
                />
                <div className="flex-1 overflow-y-auto">
                    <PersonalHeader menuRef={menuRef} onBack={() => navigate("/procurando-personal")} />
                    <div className="w-full h-auto">
                        <PersonalInfoCard infoPersonal={infoPersonal} />
                        <PlanosList
                            planos={infoPersonal.planos}
                            verfificaStatus={verfificaStatus}
                            contratarPlano={contratarPlano}
                        />
                        <OpinioesSection
                            opinioes={opinioes}
                            loadingOpinioes={loadingOpinioes}
                            rating={rating}
                            ratingChanged={ratingChanged}
                            handleLimparFiltro={handleLimparFiltro}
                        />
                        <ContratarModal
                            open={modalContratar}
                            statusEtapa={statusEtapa}
                            closeModal={closeModalContratar}
                            handleJaCombinei={handleJaCombinei}
                            handleConfirmarPagamento={handleConfirmarPagamento}
                        />
                    </div>
                </div>
                <Toaster position="top-right" reverseOrder={false} />
            </div>
        </>
    );
};

export default PerfilPersonal;