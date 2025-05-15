import React, { useState, useEffect } from "react";
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
import { useForm } from "react-hook-form";
import info2 from "../../assets/images/info-2.svg";
import iconCancelar from "../../assets/images/cancelar.png";
import lixeira from "../../assets/images/trash.png";

const Planos = () => {
    const { register, handleSubmit, formState: { errors, isSubmitted }, setValue,trigger } = useForm({

        defaultValues: {
            plano: "",
            duracao: "",
            preco: "",
            aulas: ""
        },
        mode: "onChange"
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [modalDeletarVisivel, setModalDeletarVisivel] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { fontSize, width } = useResponsiveStyles();

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
                    setStyles({ fontSize: "14px", width: "50%" });
                }
            };

            updateStyles();
            window.addEventListener("resize", updateStyles);
            return () => window.removeEventListener("resize", updateStyles);
        }, []);

        return styles;
    }



    // const [modal2Visivel, setModal2Visivel] = useState(false);

    // Função para alternar o estado do menu lateral
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    // Função para abrir o modal de exclusão
    const openDeleteModal = () => {
        setModalDeletarVisivel(true);
    };

    // Função para fechar o modal de exclusão
    const confirmDelete = () => {
        alert("Plano excluído!");
        setModalDeletarVisivel(false);
    };



    // Função para abrir o modal de criação
    const handleOpenModal = () => {
        setShowCreateModal(true);
    };

    // Função para fechar o modal de criação
    const handleCloseModal = () => {
        setShowCreateModal(false);
    };

const handlePrecoChange = (e) => {
    let input = e.target.value;

    let digitos = input.replace(/\D/g, "");

    if (digitos.length > 10) digitos = digitos.slice(0, 10);

    let formatted = "";

    if (digitos.length <= 2) {

        const padded = digitos.padStart(2, "0");
        formatted = `0.${padded}`;
    } else {
        const reais = digitos.slice(0, -2);
        const centavos = digitos.slice(-2);
        formatted = `${parseInt(reais, 10)}.${centavos}`;
    }

    console.log("Valor formatado:", formatted);

    setValue("preco", formatted);
    trigger("preco");
};


    const handleQuantidadeAulasChange = (e) => {
        let input = e.target.value;
        let digitos = input.replace(/\D/g, ""); 

        console.log("Valor formatado:", digitos);

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
                                    texto="Solitações Pendentes"
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
                                <CardPlano
                                    onDeletar={openDeleteModal}
                                >
                                </CardPlano>
                                <CardPlano
                                    onDeletar={openDeleteModal}
                                >
                                </CardPlano>
                                <CardPlano
                                    onDeletar={openDeleteModal}
                                >
                                </CardPlano>
                                <CardPlano
                                    onDeletar={openDeleteModal}
                                >
                                </CardPlano>
                                <CardPlano
                                    onDeletar={openDeleteModal}
                                >
                                </CardPlano>

                            </div>
                        </div>
                    </div>


                    <div className="w-full  mt-3 pl-10 ">
                        <span className="font-medium  text-lg sm:text-[24px] xl:text-[32px] text-[var(--cor-primaria)]">Alunos com planos ativos</span>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                        <CardAlunoAtivos />
                        <CardAlunoAtivos />
                        <CardAlunoAtivos />
                        <CardAlunoAtivos />
                        <CardAlunoAtivos />
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
                                            onClick={handleCloseModal}
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
                                    <form onSubmit={handleSubmit((data) => console.log("Dados do formulário:", data))}>
                                        <div className="grid gap-4 mb-4">
                                            <div>
                                                <Label
                                                    id="plano"
                                                    nomeLabel="Nome do plano"
                                                    fontSize="20px"
                                                    fonrWeight="500"
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
                                                    fonrWeight="500"
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
                                                )}{errors.genero?.message}
                                                </span>
                                            </div>
                                            <div>

                                                <Label
                                                    id="preco"
                                                    nomeLabel="Preço por aula"
                                                    fontSize="20px"
                                                    fonrWeight="500"
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
                                                    fonrWeight="500"
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
                                                corTexto="#B41F1F"
                                                cor="var(--cor-secundaria)"
                                                height="2.75rem"
                                                width="13.25rem"
                                                corHover="#1D2D4417"
                                                fontWeight="500"
                                                ariaLabel={"Botão de Cancelar"}
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



                    {/* <div className="p-8 flex gap-4">
                    <button
                        onClick={() => setModal1Visivel(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                        Abrir Modal 1
                    </button>

                    <button
                        onClick={() => setModal2Visivel(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        Abrir Modal 2
                    </button>
                </div>

                <Modal
                    visivel={modal1Visivel}
                    fecharModal={() => setModal1Visivel(false)}
                    titulo="Tem certeza que deseja cancelar?"
                    descricao="Alterações que não forem salvas serão perdidas"
                    onConfirm={() => {
                        setModal1Visivel(false);
                    }}
                    icone={iconCancelar}
                     textoBotaoConfirmar="Voltar"
                     textoBotaoCancelar="Cancelar mesmo assim"
                     ariaLabel="Modal de Cancelamento"
                /> */}

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
                </div>
            </div>
        </>
    )
}

export default Planos;