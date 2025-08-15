import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactApexChart from 'react-apexcharts';

const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

const GraficoEvolucaoTreinosCumpridos = ({ dadosAPI }) => {
    const [graficoData, setGraficoData] = useState({ esperados: Array(12).fill(0), concluidos: Array(12).fill(0) });
    const [startIndex, setStartIndex] = useState(0);
    const [windowSize, setWindowSize] = useState(12);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 500) setWindowSize(3);
            else if (window.innerWidth <= 800) setWindowSize(6);
            else setWindowSize(12);
            setStartIndex(0);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!Array.isArray(dadosAPI)) return;
        const esperados = new Array(12).fill(0);
        const concluidos = new Array(12).fill(0);

        dadosAPI.forEach((item) => {
            const mesIndex = item.mes - 1;
            const concluidosMes = item.treinosRealizados;
            const esperadosMes = Math.round(Number(item.frequenciaEsperadaPorSemana) * 4.33);

            concluidos[mesIndex] = concluidosMes;
            esperados[mesIndex] = esperadosMes;
        });

        setGraficoData({ esperados, concluidos });
    }, [dadosAPI]);

    const endIndex = startIndex + windowSize;
    const mesesVisiveis = meses.slice(startIndex, endIndex);
    const esperadosVisiveis = graficoData.esperados.slice(startIndex, endIndex);
    const concluidosVisiveis = graficoData.concluidos.slice(startIndex, endIndex);

    const handlePrev = () => setStartIndex(prev => Math.max(prev - windowSize, 0));
    const handleNext = () => setStartIndex(prev => Math.min(prev + windowSize, 12 - windowSize));

    return (
        <div className='border-2 border-[#E6E6E2] rounded-md p-5'>

            {windowSize < 12 && (
                <div className="flex justify-center items-center mb-2 gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                        className="p-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={endIndex >= 12}
                        className="p-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            <ReactApexChart
                options={{
                    chart: { type: 'bar', toolbar: { show: false } },
                    plotOptions: { bar: { horizontal: false, borderRadius: 5, columnWidth: '50%' } },
                    dataLabels: { enabled: false },
                    stroke: { show: true, width: 2, colors: ['transparent'] },
                    colors: ['#748CAB', '#E96E35'],
                    xaxis: { categories: mesesVisiveis },
                    yaxis: { title: { text: 'Número de treinos', style: { fontWeight: 600, color: '#1D2D44' } } },
                    fill: { opacity: 1 },
                    legend: { position: 'top', horizontalAlign: 'center', markers: { radius: 5 } },
                    tooltip: { y: { formatter: val => `${val} treino(s)` } },
                    grid: { borderColor: '#E6E6E2' },
                }}
                series={[
                    { name: 'Treinos Programados', data: esperadosVisiveis },
                    { name: 'Treinos Concluídos', data: concluidosVisiveis },
                ]}
                type="bar"
                height={215}
            />
        </div>
    );
};

export default GraficoEvolucaoTreinosCumpridos;