import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Personal/Header/Header";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import Button from "../../components/Utils/Button";
import relogioIcon from "../../assets/images/clock.png";
import addPlanoIcon from "../../assets/images/additem.svg";
import CardPlano from "../../components/Utils/CardPlano";
import CardAlunoAtivos from "../../components/Utils/CardAlunoAtivos";
import Modal from "../../components/Utils/Modal";
import InputPosLogin from "../../components/Utils/InputPosLogin";
import Label from "../../components/Utils/Label";
import { useForm, useWatch } from "react-hook-form";
import info2 from "../../assets/images/info-2.svg";
import iconCancelar from "../../assets/images/cancelar.png";
import lixeira from "../../assets/images/trash.png";
import alerta from "../../assets/images/alert.svg";
import { caringuApi } from "../../provider/caringuApi";
import toast from 'react-hot-toast';
import CustomToast from '../../components/Utils/CustomToast';
import { Toaster } from 'react-hot-toast';

const Planos = () => {


    const { register, handleSubmit, formState: { errors, isSubmitted }, setValue, trigger, reset, control } = useForm();


    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalDeletarVisivel, setModalDeletarVisivel] = useState(false);
    const [modalConfirmarCancelarVisivel, setModalConfirmarCancelarVisivel] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [planos, setPlanos] = useState([])
    const [planoIdParaDeletar, setPlanoIdParaDeletar] = useState(null);
    const [planoEditado, setPlanoEditado] = useState(null);
    const [alunosAtivos, setAlunosAtivos] = useState([]);
    const duracaoValue = useWatch({ control, name: "duracao" })


    const { fontSize, width } = useResponsiveStyles();
    const navigate = useNavigate();

    const pessoaId = sessionStorage.getItem("pessoaId");



    const fetchPlanos = async () => {
        try {
            const response = await caringuApi.get(`/planos/${pessoaId}`);
            setPlanos(response.data);
        } catch (error) {
            console.error("Erro ao buscar planos:", error);
        }
    };

    const alunosPlanosAtivos = async () => {
        try {
            const response = await caringuApi.get(`/alunos/detalhes/personal/${pessoaId}`)
            setAlunosAtivos(response.data);
        } catch (error) {
            console.error("Erro ao buscar alunos com planos ativos:", error);
        }
    }

    function formatarNivelExperiencia(nivel) {
        switch (nivel) {
            case 'INICIANTE':
                return 'Iniciante';
            case 'INTERMEDIARIO':
                return 'Intermediário';
            case 'AVANCADO':
                return 'Avançado';
            default:
                return nivel;
        }
    }

    useEffect(() => {
    if (!showCreateModal) return; 
    if (duracaoValue === "AVULSO") {
        setValue("aulas", "1");
        trigger("aulas");
    } else if (duracaoValue && duracaoValue !== "AVULSO") {
        setValue("aulas", "");
        trigger("aulas");
    }
}, [duracaoValue, setValue, trigger, showCreateModal]);


    useEffect(() => {
        document.title = "Planos | Caringu";
        fetchPlanos();
        alunosPlanosAtivos();
    }, []);




    const cadastrarPlano = async (data) => {
        try {
            const payload = {
                nome: data.plano,
                periodo: data.duracao,
                quantidadeAulas: Number(data.aulas),
                valorAulas: Number(data.preco),
            };

            await caringuApi.post(`/planos/${pessoaId}`, payload);


            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Plano criado com sucesso!" />
            ));

            await fetchPlanos();

            setShowCreateModal(false);
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao criar plano. Verifique os dados e tente novamente." />
            ));
            console.error(error);
        }
    };


    const confirmDelete = async () => {
        try {
            await caringuApi.delete(`/planos/${pessoaId}/${planoIdParaDeletar}`);
            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Plano deletado com sucesso!" />
            ));
            await fetchPlanos();
            setModalDeletarVisivel(false);
            setPlanoIdParaDeletar(null);
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao deletar plano. Tente novamente." />
            ));
            console.error(error);
        }
    };

    const editarPlano = async (data) => {
        try {
            const payload = {
                nome: data.plano,
                periodo: data.duracao,
                quantidadeAulas: Number(data.aulas),
                valorAulas: Number(data.preco),
            };

            await caringuApi.put(`/planos/${pessoaId}/${planoEditado.id}`, payload);


            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Plano editado com sucesso!" />
            ));
            await fetchPlanos();
            setShowEditModal(false);
            setPlanoEditado(null);
        } catch (error) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao editar plano. Verifique os dados e tente novamente." />
            ));
            console.error(error);
        }
    };


    function useResponsiveStyles() {
        const [styles, setStyles] = useState({ fontSize: "16px", width: "100%" });

        useEffect(() => {

            const updateStyles = () => {
                const screenWidth = window.innerWidth;

                if (screenWidth >= 1536) {
                    setStyles({ fontSize: "24px", width: "33%" });
                } else if (screenWidth >= 1280) {
                    setStyles({ fontSize: "20px", width: "33%" });
                } else if (screenWidth >= 640) {
                    setStyles({ fontSize: "16px", width: "33%" });
                } else {
                    setStyles({ fontSize: "12px", width: "50%" });
                }
            };

            updateStyles();
            window.addEventListener("resize", updateStyles);
            return () => window.removeEventListener("resize", updateStyles);
        }, []);

        return styles;
    }

    useEffect(() => {
        let tokenExistente = sessionStorage.getItem("authToken");

        if (!tokenExistente) {
            setShowModal(true);
        }
    }, [])

    const closeModal = () => {
        setShowModal(false);
        navigate("/login");
    };


    // Função para alternar o estado do menu lateral
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }


    // Função para abrir o modal de exclusão
    const openDeleteModal = (planoId) => {
        setPlanoIdParaDeletar(planoId);
        setModalDeletarVisivel(true);
    };

    // Função para abrir o modal de edição
    const handleOpenEditModal = (plano) => {
        setPlanoEditado(plano);
        reset({
            plano: plano.nome,
            duracao: plano.periodo,
            preco: plano.valorAulas,
            aulas: plano.quantidadeAulas
        });
        setShowEditModal(true);
    };




    // Função para abrir o modal de criação
    const handleOpenModal = () => {
        reset({
            plano: "",
            duracao: "",
            preco: "",
            aulas: ""
        });
        setShowCreateModal(true);
    };



    const handlePrecoChange = (e) => {
        let input = e.target.value;

        // Permite no máximo 8 dígitos (6 inteiros + 2 decimais)
        let digitos = input.replace(/\D/g, "").slice(0, 6);

        let formatted = "";

        if (digitos.length <= 2) {
            const padded = digitos.padStart(2, "0");
            formatted = `0.${padded}`;
        } else {
            const reais = digitos.slice(0, -2);
            const centavos = digitos.slice(-2);
            // Limita os reais a 6 dígitos
            formatted = `${parseInt(reais.slice(0, 4), 10)}.${centavos}`;
        }

        setValue("preco", formatted);
        trigger("preco");
    };


    const handleQuantidadeAulasChange = (e) => {
        let input = e.target.value;
        let digitos = input.replace(/\D/g, "");


        setValue("aulas", digitos);
        trigger("aulas");
    };

    return (
        <>
            <div className="flex min-h-screen bg-[#fdfbf7]">
                <MenuLateral isOpen={isSidebarOpen} />
                <div className="flex-1 overflow-y-auto">
                    <Header toggleSidebar={toggleSidebar} />
                    <div className="w-full h-auto">
                        <div className="flex flex-row items-end justify-between flex-nowrap h-[170px] sm:h-[80px] w-full relative z-10">
                            <div className="h-full flex flex-row items-center sm:items-end pl-[2.5rem]">
                                <span className="text-[var(--cor-primaria)] font-medium text-lg sm:text-[24px] xl:text-[32px]">Planos criados </span>
                            </div>
                            <div className="h-full w-[35rem] flex  justify-center flex-col items-center sm:flex-row sm:justify-start sm:items-end gap-[22px] ">
                                <Button
                                    texto="Solicitações pendentes"
                                    logo={relogioIcon}
                                    width="53%"
                                    height="50px"
                                    color="#1D2D441C"
                                    corTexto="var(--cor-primaria)"
                                    borderStyle="solid"
                                    borderWidth="2px"
                                    borderColor="rgba(29, 45, 68, 0.11)"
                                    ariaLabel="Botão de Soluções Pendentes"
                                    fontSize={fontSize}
                                    fontWeight="300"
                                    corHover="#1D2D4417"
                                    onClick={() => navigate("/solicitacoes-pendentes")}
                                >
                                </Button>
                                <Button
                                    texto="Criar Plano"
                                    logo={addPlanoIcon}
                                    borderStyle="solid"
                                    borderWidth="2px"
                                    borderColor="rgba(29, 45, 68, 0.11)"
                                    ariaLabel="Botão de Criar Plano"
                                    height="50px"
                                    width={width}
                                    color="#1D2D441C"
                                    corTexto="var(--cor-primaria)"
                                    fontSize={fontSize}
                                    fontWeight="300"
                                    corHover="#1D2D4417"
                                    onClick={handleOpenModal}
                                >
                                </Button>
                            </div>
                        </div>
                        <div className="ml-10 mt-4 overflow-x-auto max-w-[93vw]">
                            <div className="flex gap-9 w-fit">
                                {planos.length === 0 ? (
                                    <div className="text-center text-[var(--cor-primaria)] font-medium text-lg sm:text-2xl py-8">
                                        Nenhum plano cadastrado ainda.
                                    </div>
                                ) : (
                                    planos.map((item) => (
                                        <CardPlano
                                            key={item.id}
                                            id={item.id}
                                            nome={item.nome}
                                            periodo={item.periodo}
                                            quantidadeAulas={item.quantidadeAulas}
                                            valorAulas={item.valorAulas}
                                            valorPlano={item.valorPlano}
                                            onEditar={() => handleOpenEditModal(item)}
                                            onDeletar={() => openDeleteModal(item.id)}
                                            showContratarPlano={false}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>


                    <div className="w-full  mt-3 pl-10 ">
                        <span className="font-medium  text-lg sm:text-[24px] xl:text-[32px] text-[var(--cor-primaria)]">Alunos com planos ativos</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                        {alunosAtivos.length === 0 ? (
                            <div className="text-center text-[var(--cor-primaria)] font-medium text-lg sm:text-2xl ">
                                Nenhum aluno com plano ativo no momento.
                            </div>
                        ) : (
                            alunosAtivos.map((aluno, idx) => (
                                <CardAlunoAtivos
                                    idAlunos={aluno.idAluno}
                                    key={idx}
                                    urlImagem={aluno.urlFotoPerfil}
                                    nome={aluno.nomeAluno}
                                    nomePlano={aluno.nomePlano}
                                    niverExperiencia={formatarNivelExperiencia(aluno.nivelExperiencia)}
                                />
                            ))
                        )}
                    </div>

                    {/* Modal para criar */}
                    {showCreateModal && (
                        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
                            <div className="absolute inset-0 bg-[#000000] opacity-50"
                                aria-label="Fundo Escurecido"
                            ></div>
                            <div className="relative p-4 w-full max-w-2xl">
                                <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                                    {/* Header */}
                                    <div className="flex justify-between items-center pb-4 mb-4 ">
                                        <h3 className="text-4xl font-semibold text-[var(--cor-primaria)]">
                                            Criar plano
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setModalConfirmarCancelarVisivel(true)
                                            }}
                                            className="bg-[#B41F1F] text-[var(--cor-secundaria)] rounded-lg text-xs sm:text-sm cursor-pointer w-10 h-10 md:w-13 md:h-13 inline-flex justify-center items-center absolute top-2 right-2"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Formulário */}
                                    <form onSubmit={handleSubmit(cadastrarPlano)}>
                                        <div className="grid gap-4 mb-4">
                                            <div>
                                                <Label
                                                    id="plano"
                                                    nomeLabel="Nome do plano"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="plano"
                                                    name="plano"
                                                    inputType="text"
                                                    placeholder="Ex.: Plano Básico"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    {...register('plano', { required: 'Nome do plano é obrigatória' })}
                                                    isError={!!errors.plano}
                                                    errorMessage={errors.plano?.message}
                                                />
                                            </div>
                                            <div>
                                                <Label
                                                    id="duracao"
                                                    nomeLabel="Período de duração do plano"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <div className="relative">
                                                    <select defaultValue=""
                                                        id="duracao"
                                                        {...register("duracao", { required: true })}
                                                        className="appearance-none text-base w-full flex items-center justify-center pt-[1%] pr-[1%] pb-[1%] pl-0 border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]">
                                                        <option disabled className="text-[#15171B87]" value="">Selecione o período</option>
                                                        <option value="MENSAL">Mensal</option>
                                                        <option value="SEMESTRAL">Semestral</option>
                                                        <option value="AVULSO">Avulso</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 10" fill="none">
                                                            <path d="M0.532697 0.412777C-0.177566 0.956418 -0.177566 1.83792 0.532697 2.38154L9.43019 9.18545C10.851 10.2719 13.1531 10.2714 14.5732 9.18461L23.4672 2.37653C24.1776 1.8329 24.1776 0.951407 23.4672 0.407752C22.757 -0.135917 21.6054 -0.135917 20.8952 0.407752L13.2828 6.23469C12.5726 6.77845 11.421 6.77831 10.7107 6.23469L3.10474 0.412777C2.3945 -0.130892 1.24294 -0.130892 0.532697 0.412777Z" fill="#15171B" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <span className="error-message" style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    height: 'auto',
                                                    marginTop: '12px',
                                                    color: '#D45C56',
                                                    fontSize: '16px',
                                                }}>{errors.duracao && (
                                                    <div className="flex items-center justify-start gap-1 text-[#D45C56]">
                                                        <img src={info2} alt="Erro" className="w-4 h-4" />
                                                        <span>Selecione o Período de duração do plano</span>
                                                    </div>
                                                )}{errors.duracao?.message}
                                                </span>
                                            </div>
                                            <div>

                                                <Label
                                                    id="preco"
                                                    nomeLabel="Preço por aula"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="preco"
                                                    name="preco"
                                                    inputType="text"
                                                    placeholder="Digite o valor em reais"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    inputMode="numeric"
                                                    {...register('preco', {
                                                        required: 'Preço por aula é obrigatória',
                                                        pattern: {
                                                            value: /^[0-9]+([.,][0-9]{1,2})?$/,
                                                            message: "Informe um valor válido, ex: 50,00"
                                                        }
                                                    })}
                                                    isError={!!errors.preco}
                                                    errorMessage={errors.preco?.message}
                                                    onChange={handlePrecoChange}
                                                />
                                            </div>
                                            <div>
                                            </div>
                                            <div>
                                                <Label
                                                    id="aulas"
                                                    nomeLabel="Quantidade de aulas no período"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="aulas"
                                                    name="aulas"
                                                    inputType="text"
                                                    placeholder="Ex.: 5"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    inputMode="numeric"
                                                    disabled={duracaoValue === "AVULSO"}
                                                    {...register('aulas', {
                                                        required: 'Quantidade de aulas é obrigatória',
                                                        pattern: {
                                                            value: /^[1-9][0-9]*$/,
                                                            message: "Informe apenas números inteiros positivos"
                                                        }
                                                    })}
                                                    isError={!!errors.aulas}
                                                    errorMessage={errors.aulas?.message}
                                                    onChange={handleQuantidadeAulasChange}

                                                />
                                            </div>
                                        </div>
                                        <div aria-label="Opções de Botões" className="flex flex-col items-center sm:flex-row gap-4 w-full justify-center">
                                            <Button
                                                texto="Cancelar"
                                                corTexto="var(--cor-secundaria)"
                                                cor="#B41F1F"
                                                height="2.75rem"
                                                width="13.25rem"
                                                corHover="#B41F1F"
                                                fontWeight="500"
                                                ariaLabel={"Botão de Cancelar"}
                                                type="button"
                                                onClick={() => setModalConfirmarCancelarVisivel(true)}
                                            >
                                            </Button>

                                            <Button
                                                texto="Salvar"
                                                corTexto="var(--cor-secundaria)"
                                                cor="#46982B"
                                                height="2.75rem"
                                                width="9.2rem"
                                                corHover="#46982BE5"
                                                fontWeight="600"
                                                ariaLabel={"Botão de Salvar"}
                                            >
                                            </Button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal para editar */}
                    {showEditModal && (
                        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto">
                            <div className="absolute inset-0 bg-[#000000] opacity-50"
                                aria-label="Fundo Escurecido"
                            ></div>
                            <div className="relative p-4 w-full max-w-2xl">
                                <div className="relative p-4 bg-[var(--cor-secundaria)] rounded-lg shadow sm:pl-12 sm:pr-12 sm:pt-10 sm:pb-10">
                                    {/* Header */}
                                    <div className="flex justify-between items-center pb-4 mb-4 ">
                                        <h3 className="text-4xl font-semibold text-[var(--cor-primaria)]">
                                            Editar plano
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setModalConfirmarCancelarVisivel(true)
                                            }}
                                            className="bg-[#B41F1F] text-[var(--cor-secundaria)] rounded-lg text-xs sm:text-sm cursor-pointer w-10 h-10 md:w-13 md:h-13 inline-flex justify-center items-center absolute top-2 right-2"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Formulário */}

                                    <form onSubmit={handleSubmit(editarPlano)}>
                                        <div className="grid gap-4 mb-4">
                                            <div>
                                                <Label
                                                    id="plano"
                                                    nomeLabel="Nome do plano"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="plano"
                                                    name="plano"
                                                    inputType="text"
                                                    placeholder="Ex.: Plano Básico"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    {...register('plano', { required: 'Nome do plano é obrigatória' })}
                                                    isError={!!errors.plano}
                                                    errorMessage={errors.plano?.message}
                                                />
                                            </div>
                                            <div>
                                                <Label
                                                    id="duracao"
                                                    nomeLabel="Período de duração do plano"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <div className="relative">
                                                    <select defaultValue=""
                                                        id="duracao"
                                                        {...register("duracao", { required: true })}
                                                        className="appearance-none text-base w-full flex items-center justify-center pt-[1%] pr-[1%] pb-[1%] pl-0 border-solid border-b-[2px] border-[var(--cor-primaria)] text-[#333]">
                                                        <option disabled className="text-[#15171B87]" value="">Selecione o período</option>
                                                        <option value="MENSAL">Mensal</option>
                                                        <option value="SEMESTRAL">Semestral</option>
                                                        <option value="AVULSO">Avulso</option>
                                                    </select>
                                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="10" viewBox="0 0 24 10" fill="none">
                                                            <path d="M0.532697 0.412777C-0.177566 0.956418 -0.177566 1.83792 0.532697 2.38154L9.43019 9.18545C10.851 10.2719 13.1531 10.2714 14.5732 9.18461L23.4672 2.37653C24.1776 1.8329 24.1776 0.951407 23.4672 0.407752C22.757 -0.135917 21.6054 -0.135917 20.8952 0.407752L13.2828 6.23469C12.5726 6.77845 11.421 6.77831 10.7107 6.23469L3.10474 0.412777C2.3945 -0.130892 1.24294 -0.130892 0.532697 0.412777Z" fill="#15171B" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <span className="error-message" style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    height: 'auto',
                                                    marginTop: '12px',
                                                    color: '#D45C56',
                                                    fontSize: '16px',
                                                }}>{errors.duracao && (
                                                    <div className="flex items-center justify-start gap-1 text-[#D45C56]">
                                                        <img src={info2} alt="Erro" className="w-4 h-4" />
                                                        <span>Selecione o Período de duração do plano</span>
                                                    </div>
                                                )}{errors.duracao?.message}
                                                </span>
                                            </div>
                                            <div>

                                                <Label
                                                    id="preco"
                                                    nomeLabel="Preço por aula"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="preco"
                                                    name="preco"
                                                    inputType="text"
                                                    placeholder="Digite o valor em reais"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    inputMode="numeric"
                                                    {...register('preco', {
                                                        required: 'Preço por aula é obrigatória',
                                                        pattern: {
                                                            value: /^[0-9]+([.,][0-9]{1,2})?$/,
                                                            message: "Informe um valor válido, ex: 50,00"
                                                        }
                                                    })}
                                                    isError={!!errors.preco}
                                                    errorMessage={errors.preco?.message}
                                                    onChange={handlePrecoChange}
                                                />
                                            </div>
                                            <div>
                                            </div>
                                            <div>
                                                <Label
                                                    id="aulas"
                                                    nomeLabel="Quantidade de aulas no período"
                                                    fontSize="20px"
                                                    fontWeight="500"
                                                />
                                                <InputPosLogin
                                                    id="aulas"
                                                    name="aulas"
                                                    inputType="text"
                                                    placeholder="Ex.: 5"
                                                    fontSize="16px"
                                                    fontWeight="400"
                                                    fontSizeErro="16px"
                                                    width="100%"
                                                    inputMode="numeric"
                                                    {...register('aulas', {
                                                        required: 'Quantidade de aulas é obrigatória',
                                                        pattern: {
                                                            value: /^[1-9][0-9]*$/,
                                                            message: "Informe apenas números inteiros positivos"
                                                        }
                                                    })}
                                                    isError={!!errors.aulas}
                                                    errorMessage={errors.aulas?.message}
                                                    onChange={handleQuantidadeAulasChange}

                                                />
                                            </div>
                                        </div>
                                        <div aria-label="Opções de Botões" className="flex flex-col items-center sm:flex-row gap-4 w-full justify-center">
                                            <Button
                                                texto="Cancelar"
                                                corTexto="var(--cor-secundaria)"
                                                cor="#B41F1F"
                                                height="2.75rem"
                                                width="13.25rem"
                                                corHover="#B41F1F"
                                                fontWeight="500"
                                                type="button"
                                                ariaLabel={"Botão de Cancelar"}
                                                onClick={() => setModalConfirmarCancelarVisivel(true)}
                                            >
                                            </Button>

                                            <Button
                                                texto="Salvar"
                                                corTexto="var(--cor-secundaria)"
                                                cor="#46982B"
                                                height="2.75rem"
                                                width="9.2rem"
                                                corHover="#46982BE5"
                                                fontWeight="600"
                                                ariaLabel={"Botão de Salvar"}
                                            >
                                            </Button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    <Modal
                        visivel={modalConfirmarCancelarVisivel}
                        fecharModal={() => setModalConfirmarCancelarVisivel(false)}
                        titulo="Tem certeza que deseja cancelar?"
                        descricao="Alterações que não forem salvas serão perdidas"
                        onConfirm={() => {
                            setModalConfirmarCancelarVisivel(false);
                            setShowCreateModal(false);
                            setShowEditModal(false);
                        }}
                        icone={iconCancelar}
                        textoBotaoConfirmar="Voltar"
                        textoBotaoCancelar="Cancelar mesmo assim"
                        ariaLabel="Modal de Cancelamento"
                    />

                    <Modal
                        visivel={modalDeletarVisivel}
                        fecharModal={() => setModalDeletarVisivel(false)}
                        titulo="Tem certeza que deseja excluir esse plano?"
                        descricao="Você não poderá disponibilizá-los futuramente"
                        onConfirm={confirmDelete}
                        icone={lixeira}
                        textoBotaoConfirmar="Manter Plano"
                        textoBotaoCancelar="Deletar mesmo assim"
                        ariaLabel="Modal de Exclusão de Plano"
                    />

                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
                            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                <h2 className="text-xl font-bold text-center text-[#D45C56] flex items-center justify-center space-x-2">
                                    <img src={alerta} alt="Alerta" className="w-6 h-6" />
                                    <span>Acesso Negado</span>
                                </h2>
                                <p className="text-center mt-4">
                                    <div>Sessão expirada ou não autenticado.</div>
                                    <div>Clique em "Redirecionar" para fazer login.</div>
                                </p>
                                <div className="flex justify-center mt-6">
                                    <button
                                        className="bg-[#D45C56] text-white px-4 py-2 rounded-lg cursor-pointer"
                                        onClick={closeModal}
                                    >
                                        Redirecionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Toaster position="top-right" reverseOrder={false} />
            </div>
        </>
    )
}

export default Planos;