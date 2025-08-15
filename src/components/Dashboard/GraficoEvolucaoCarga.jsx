import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactApexChart from 'react-apexcharts';

const GraficoEvolucaoCarga = ({ dados }) => {
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);
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
        if (!dados || dados.length === 0) {
            setOptions({
                chart: { type: 'area', height: 350, toolbar: { show: false } },
                xaxis: { categories: [], labels: { style: { colors: '#1D2D44' } } },
                yaxis: {
                    title: { text: 'CARGA (KG)', style: { color: '#1D2D44' } },
                    labels: { style: { colors: '#1D2D44' } }
                },
                grid: { borderColor: '#E6E6E6' },
                tooltip: { y: { formatter: (val) => `${val} KG` } },
                noData: {
                    text: 'Sem dados disponíveis',
                    align: 'center',
                    verticalAlign: 'middle',
                    style: { color: '#1D2D44', fontSize: '16px' }
                }
            });
            setSeries([]);
            return;
        }

        const dadosOrdenados = [...dados].sort(
            (a, b) => new Date(a.dataHorarioInicio) - new Date(b.dataHorarioInicio)
        );

        const datasFormatadas = dadosOrdenados.map(item =>
            new Date(item.dataHorarioInicio).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            })
        );

        const cargas = dadosOrdenados.map(item => item.cargaUtilizada);

        const endIndex = startIndex + windowSize;
        const datasVisiveis = datasFormatadas.slice(startIndex, endIndex);
        const cargasVisiveis = cargas.slice(startIndex, endIndex);

        setOptions({
            chart: {
                type: 'area',
                height: 350,
                zoom: { enabled: false },
                toolbar: { show: false }
            },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 3, colors: ['#1D2D44'] },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'light',
                    type: 'vertical',
                    gradientToColors: ['#fdfbf7'],
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.4,
                    opacityTo: 0,
                    stops: [0, 100]
                }
            },
            colors: ['#1D2D44'],
            xaxis: { categories: datasVisiveis, labels: { style: { colors: '#1D2D44' } } },
            yaxis: {
                title: { text: 'CARGA (KG)', style: { color: '#1D2D44' } },
                labels: { style: { colors: '#1D2D44' } }
            },
            tooltip: { y: { formatter: (val) => `${val} KG` } },
            grid: { borderColor: '#E6E6E6' }
        });

        setSeries([{ name: 'Carga', data: cargasVisiveis }]);
    }, [dados, startIndex, windowSize]);

    const endIndex = startIndex + windowSize;
    const handlePrev = () => setStartIndex(prev => Math.max(prev - windowSize, 0));
    const handleNext = () => setStartIndex(prev => Math.min(prev + windowSize, dados.length - windowSize));

    return (
        <div className='border-2 border-[#E6E6E2] rounded-md mt-4 p-4'>

            {windowSize < dados.length && (
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
                        disabled={endIndex >= dados.length}
                        className="p-1 bg-gray-200 rounded cursor-pointer disabled:opacity-50"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}

            <ReactApexChart
                options={options}
                series={series}
                type="area"
                height={300}
            />
        </div>
    );
};

export default GraficoEvolucaoCarga;