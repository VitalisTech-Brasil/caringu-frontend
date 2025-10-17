import { useEffect, useState } from 'react';
import React from "react";
import { useParams, Link } from 'react-router-dom'
import { caringuApi } from '../../provider/caringuApi';
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral';
import Header from '../../components/Personal/Header/Header';
import { FaUserCircle } from 'react-icons/fa';

const AcompanharAula = () => {

    const { idAluno } = useParams();
    const [aluno, setAluno] = useState();
    const [imgErro, setImgErro] = useState(false);


    useEffect(() => {
        document.title = "Acompanhar Aula | Caringu"
        const fetchInfosAlunoFeedback = async () => {
            try {
                const response = await caringuApi.get(`/anamnese/${idAluno}`);// MUDAR URL PARA O NOVO ENDPOINT(!!!por padrão, deve ser sempre estar aberto o ultimo card do treino)
                setAluno(response.data);
                console.log("Informações do aluno:", response.data);
            } catch (error) {
                console.error("Erro ao buscar informações do aluno:", error);
            }
        };

        fetchInfosAlunoFeedback();
    }, [idAluno]);
    return (
        <div className="flex min-h-screen bg-[var(--cor-secundaria)]">
            <MenuLateral />
            <div className="flex-1 overflow-y-auto">
                <Header />
                <div className="w-full h-auto p-2 md:p-4 2xl:">
                    <div className="w-full h-auto flex flex-row ">
                        <div className=" h-auto">
                            <Link to={`/agenda`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                    <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="h-auto w-full flex flex-row items-center justify-center">
                        <div className="h-auto w-[95%] bg-[rgba(29,45,68,0.11)] border-2 border-gray-300 rounded-md flex flex-col gap-10 justify-center lg:items-start items-center py-5">
                            <div className="bg-violet-300">
                                {aluno?.alunoId?.urlFotoPerfil && !imgErro ? (
                                    <img
                                        src={aluno.alunoId.urlFotoPerfil}
                                        alt="Imagem do aluno"
                                        className='w-10 h-10 sm:w-12 sm:h-12 lg:w-15 lg:h-15 rounded-full'
                                        onError={() => setImgErro(true)}
                                    />

                                ) : (
                                    <FaUserCircle className="flex-shrink-0 sm:w-12 sm:h-12 w-12 h-12 lg:w-12 lg:h-12 text-[#4B5563]" />
                                )}
                                <div>
                                    <span></span>
                                    <div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                        <div>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AcompanharAula;