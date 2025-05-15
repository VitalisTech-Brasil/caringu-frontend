import React, { use } from 'react'
import MenuLateral from '../../components/Personal/MenuLateral/MenuLateral'
import Header from '../../components/Personal/Header/Header'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Button from '../../components/Utils/Button';
import exportarPDF from '../../assets/images/exportar-PDF.svg';
import progressaocorporal from '../../assets/images/progressao-corporal.svg';
import ReactApexChart from 'react-apexcharts';

const Dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const params = useParams();
    const [fontSize, setFontSize] = useState("16px");

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const smQuery = window.matchMedia("(max-width: 767px)");

        const updateFontSize = (e) => {
            if (e.matches) {
                setFontSize("14px"); // sm
            } else {
                setFontSize("18px"); // md+
            }
        };

        // Inicial
        updateFontSize(smQuery);

        // Escuta mudanças
        smQuery.addEventListener("change", updateFontSize);
        return () => smQuery.removeEventListener("change", updateFontSize);
    }, []);

    return (
        <div className="flex min-h-screen bg-[#fdfbf7]">
            <MenuLateral />
            <div className="flex-1 flex flex-col">
                <Header toggleSidebar={toggleSidebar} />
                <main className="p-10 md:p-8 font-sans space-y-8">
                    <div className="bg-[var(--cor-secundaria)] rounded-lg p-4 md:p-6 border border-[#E6E6E2] flex md:flex-row flex-col w-full">
                        <div className="flex flex-col justify-center w-full md:w-1/2">
                            <div className="justify-start text-zinc-900 text-xl md:text-3xl font-semibold font-['Inter'] flex flex-wrap items-center gap-5 max-h-7">
                                <Link to={`/relatorio-treino/${params.idAluno}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10 cursor-pointer" viewBox="0 0 53 53" fill="none">
                                        <path d="M21.1336 13.0957L7.729 26.5003L21.1336 39.9049" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M45.2707 26.5H8.10449" stroke="#1D2D44" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                                <h1>Braços</h1>
                            </div>
                            <div className="flex md:hidden justify-start w-full mt-4">
                                <div className='flex justify-between w-full border-2 border-[#E6E6E2] rounded-md p-5 text-2xs sm:text-sm'>
                                    <h1><b>Aluno: </b>Maria Gladys</h1>
                                    <h1><b>Peso: </b>60KG</h1>
                                    <h1><b>Altura: </b>1,80m</h1>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-5 mt-8">
                                <div className='flex justify-between items-center w-full gap-4'>
                                    <Button
                                        texto={"Exportar gráficos em PDF"}
                                        logo={exportarPDF}
                                        borderColor={"#E6E6E2"}
                                        borderWidth={"2px"}
                                        borderStyle={"solid"}
                                        width={"100%"}
                                        height={"50px"}
                                        fontSize={fontSize}
                                        corHover={"#E6E6E2"}
                                        cor={"#FFFDF6"}
                                    />

                                    <Button
                                        texto={"Ver registros da progressão corporal"}
                                        logo={progressaocorporal}
                                        borderColor={"#E6E6E2"}
                                        borderWidth={"2px"}
                                        borderStyle={"solid"}
                                        width={"100%"}
                                        height={"50px"}
                                        fontSize={fontSize}
                                        corHover={"#E6E6E2"}
                                        cor={"#FFFDF6"}
                                    />
                                </div>
                                <div className='flex flex-wrap justify-between items-center w-full '>
                                    <div className="items-center flex flex-col w-full sm:w-[30%] border-2 border-[#E6E6E2] rounded-md p-5 h-55 relative">
                                        <div className="flex items-center justify-center  rounded-full bg-[#748CAB] absolute top-5">
                                            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="45" cy="45" r="45" fill="#748CAB" />
                                                <path d="M64.309 31.1992H68.1789C69.247 31.1992 70.1139 32.2296 70.1139 33.4992V56.4992C70.1139 57.7688 69.247 58.7992 68.1789 58.7992H64.309C63.2409 58.7992 62.374 57.7688 62.374 56.4992V33.4992C62.374 32.2296 63.2409 31.1992 64.309 31.1992Z" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M56.5692 22H60.4392C61.5073 22 62.3741 23.0304 62.3741 24.3V65.7C62.3741 66.9696 61.5073 68 60.4392 68H56.5692C55.5011 68 54.6343 66.9696 54.6343 65.7V24.3C54.6343 23.0304 55.5011 22 56.5692 22Z" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M29.4799 22H33.3498C34.4179 22 35.2848 23.0304 35.2848 24.3V65.7C35.2848 66.9696 34.4179 68 33.3498 68H29.4799C28.4118 68 27.5449 66.9696 27.5449 65.7V24.3C27.5449 23.0304 28.4118 22 29.4799 22Z" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M21.7401 31.1992H25.6101C26.6782 31.1992 27.545 32.2296 27.545 33.4992V56.4992C27.545 57.7688 26.6782 58.7992 25.6101 58.7992H21.7401C20.672 58.7992 19.8052 57.7688 19.8052 56.4992V33.4992C19.8052 32.2296 20.672 31.1992 21.7401 31.1992Z" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M70.1133 45H75.9182" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M35.2847 45H54.6343" stroke="#FFFDF6" strokeWidth="3" />
                                                <path d="M14 45H19.8049" stroke="#FFFDF6" strokeWidth="3" />
                                            </svg>

                                        </div>
                                        <div className="mt-27 md:mt-22 text-center flex flex-col justify-between h-30">
                                            <p className="text-md font-medium">Treinos Cumpridos por mês</p>
                                            <h2 className="text-2xl font-bold">16/20</h2>
                                        </div>
                                    </div>
                                    <div className="items-center flex flex-col w-full sm:w-[30%] border-2 border-[#E6E6E2] rounded-md p-5 h-55 relative">
                                        <div className="flex items-center justify-center rounded-full bg-[#748CAB] absolute top-5">
                                            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="45" cy="45" r="45" fill="#748CAB" />
                                                <path d="M75.0832 44.4994C75.0832 60.8294 61.8298 74.0827 45.4998 74.0827C29.1698 74.0827 15.9165 60.8294 15.9165 44.4994C15.9165 28.1693 29.1698 14.916 45.4998 14.916C61.8298 14.916 75.0832 28.1693 75.0832 44.4994Z" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M56.4753 53.9072L47.3044 48.4343C45.7069 47.4876 44.4053 45.2097 44.4053 43.346V31.2168" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="mt-27 md:mt-22 text-center flex flex-col justify-between h-30">
                                            <p className="text-md font-medium">Horas treinadas por semana</p>
                                            <h2 className="text-2xl font-bold">10h 30min</h2>
                                        </div>
                                    </div>
                                    <div className="items-center flex flex-col w-full sm:w-[30%] border-2 border-[#E6E6E2] rounded-md p-5 h-55 relative">
                                        <div className="flex items-center justify-center rounded-full bg-[#748CAB] absolute top-5">
                                            <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="45" cy="45" r="45" fill="#748CAB" />
                                                <path d="M59.8125 37.1035L47.3875 49.5285L42.6542 42.4285L33.1875 51.8952" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M53.8955 37.1035H59.8122V43.0202" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M37.6253 74.0827H55.3753C70.167 74.0827 76.0837 68.166 76.0837 53.3744V35.6244C76.0837 20.8327 70.167 14.916 55.3753 14.916H37.6253C22.8337 14.916 16.917 20.8327 16.917 35.6244V53.3744C16.917 68.166 22.8337 74.0827 37.6253 74.0827Z" stroke="#FFFDF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="mt-27 md:mt-27 text-center flex flex-col justify-between h-30">
                                            <p className="text-md font-medium ">Aderência</p>
                                            <h2 className="text-2xl font-bold">69%</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full flex flex-col'>
                                    <div className="flex flex-wrap items-center justify-start w-full gap-4">
                                        <h1 className='text-sm sm:text-xl font-semibold'>Evolução de carga do exercício:</h1>
                                        <select className='border-2 border-[#E6E6E2] rounded-md' name="" id="">
                                            <option value="">Selecione o Exercício</option>
                                            <option value="">Rosca direta</option>
                                            <option value="">Rosca direta</option>
                                            <option value="">Rosca direta</option>
                                        </select>
                                    </div>
                                    <div className='border-2 border-[#E6E6E2] rounded-md mt-4'>
                                        <ReactApexChart
                                            options={{
                                                chart: {
                                                    type: 'area',
                                                    height: 350,
                                                    zoom: { enabled: false },
                                                    toolbar: { show: false },
                                                },
                                                dataLabels: { enabled: false },
                                                stroke: {
                                                    curve: 'smooth',
                                                    width: 3,
                                                    colors: ['#1D2D44'], // Cor da linha
                                                },
                                                fill: {
                                                    type: 'gradient',
                                                    gradient: {
                                                        shade: 'light',
                                                        type: 'vertical',
                                                        gradientToColors: ['#fdfbf7'], // cor inferior
                                                        shadeIntensity: 1,
                                                        inverseColors: false,
                                                        opacityFrom: 0.4,
                                                        opacityTo: 0,
                                                        stops: [0, 100]
                                                    }
                                                },
                                                colors: ['#1D2D44'], // cor da linha
                                                xaxis: {
                                                    categories: [
                                                        '01/03/2023', '03/03/2023', '05/03/2023', '07/03/2023',
                                                        '09/03/2023', '10/03/2023', '12/03/2023'
                                                    ],
                                                    labels: {
                                                        style: { colors: '#1D2D44' }
                                                    }
                                                },
                                                yaxis: {
                                                    title: {
                                                        text: 'CARGA (KG)',
                                                        style: { color: '#1D2D44' }
                                                    },
                                                    labels: {
                                                        style: { colors: '#1D2D44' }
                                                    }
                                                },
                                                tooltip: {
                                                    y: {
                                                        formatter: (val) => `${val} KG`
                                                    }
                                                },
                                                grid: {
                                                    borderColor: '#E6E6E6'
                                                }
                                            }}
                                            series={[
                                                {
                                                    name: "Carga",
                                                    data: [10, 20, 30, 40, 50, 60, 70]
                                                }
                                            ]}
                                            type="area"
                                            height={300}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='max-w-full md:w-1/2 flex flex-col items-center'>
                            <div className="hidden md:flex justify-end w-full max-h-[80px] md:justify-end">
                                <div className='flex justify-center md:gap-32 border-2 border-[#E6E6E2] rounded-md p-5 md:w-17/18'>
                                    <h1 className="text-sm md:text-[20px] md:max-w-1xl text-black font-normal"><b>Aluno: </b>Maria Gladys</h1>
                                    <h1 className="text-sm md:text-[20px] text-black font-normal"><b>Peso: </b>60KG</h1>
                                    <h1 className="text-sm md:text-[20px] text-black font-normal"><b>Altura: </b>1,80m</h1>
                                </div>
                            </div>
                            <div className='flex flex-col gap-5 m-3 md:w-11/13'>
                                <h1 className='text-xl font-semibold'>Evolução dos treinos cumpridos</h1>
                                <div className='border-2 border-[#E6E6E2] rounded-md p-5'>
                                    <ReactApexChart
                                        options={{
                                            chart: {
                                                type: 'bar',
                                                toolbar: { show: false },
                                            },
                                            plotOptions: {
                                                bar: {
                                                    horizontal: false,
                                                    borderRadius: 5,
                                                    columnWidth: '50%',
                                                },
                                            },
                                            dataLabels: { enabled: false },
                                            stroke: {
                                                show: true,
                                                width: 2,
                                                colors: ['transparent'],
                                            },
                                            colors: ['#748CAB', '#E96E35'], // Azul e Laranja
                                            xaxis: {
                                                categories: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
                                            },
                                            yaxis: {
                                                title: {
                                                    text: 'Número de treinos',
                                                    style: { fontWeight: 600, color: '#1D2D44' },
                                                },
                                            },
                                            fill: {
                                                opacity: 1,
                                            },
                                            legend: {
                                                position: 'top',
                                                horizontalAlign: 'right',
                                                markers: {
                                                    radius: 5,
                                                },
                                            },
                                            tooltip: {
                                                y: {
                                                    formatter: (val) => `${val} treinos`,
                                                },
                                            },
                                            grid: {
                                                borderColor: '#E6E6E2',
                                            },
                                        }}
                                        series={[
                                            {
                                                name: 'Treinos Programados',
                                                data: [28, 22, 23, 18, 17, 29, 19, 22, 8, 17, 14, 21],
                                            },
                                            {
                                                name: 'Treinos Concluídos',
                                                data: [20, 14, 18, 10, 14, 23, 15, 17, 6, 13, 11, 16],
                                            },
                                        ]}
                                        type="bar"
                                        height={215}
                                    />

                                </div>
                                <h1 className='text-xl font-semibold'>Total de horas treinadas por mês</h1>
                                <div className='border-2 border-[#E6E6E2] rounded-md p-5'>
                                    <ReactApexChart
                                        options={{
                                            chart: {
                                                type: 'bar',
                                                toolbar: { show: false },
                                            },
                                            plotOptions: {
                                                bar: {
                                                    horizontal: false,
                                                    borderRadius: 5,
                                                    columnWidth: '50%',
                                                },
                                            },
                                            dataLabels: { enabled: false },
                                            stroke: {
                                                show: true,
                                                width: 2,
                                                colors: ['transparent'],
                                            },
                                            colors: ['#748CAB'],
                                            xaxis: {
                                                categories: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
                                            },
                                            yaxis: {
                                                title: {
                                                    text: 'Total de Horas Treinadas',
                                                    style: { fontWeight: 600, color: '#1D2D44' },
                                                },
                                            },
                                            fill: {
                                                opacity: 1,
                                            },
                                            tooltip: {
                                                y: {
                                                    formatter: (val) => `${val} horas`,
                                                },
                                            },
                                            grid: {
                                                borderColor: '#E6E6E2',
                                            },
                                        }}
                                        series={[
                                            {
                                                name: 'Horas Treinadas',
                                                data: [18, 9, 17, 12, 26, 6, 16, 17, 8, 18, 14, 17],
                                            },
                                        ]}
                                        type="bar"
                                        height={215}
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div >
    )
}

export default Dashboard