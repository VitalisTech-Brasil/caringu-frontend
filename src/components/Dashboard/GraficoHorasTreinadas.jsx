import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactApexChart from 'react-apexcharts';

const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

const GraficoHorasTreinadas = ({ dados, titulo = "Total de horas treinadas por mês" }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [windowSize, setWindowSize] = useState(12);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 500) setWindowSize(3);
            else if (window.innerWidth <= 800) setWindowSize(6);
            else setWindowSize(12);
            setStartIndex(0); // volta para início quando mudar tamanho
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const endIndex = startIndex + windowSize;
    const mesesVisiveis = meses.slice(startIndex, endIndex);
    const dadosVisiveis = dados.slice(startIndex, endIndex);

    const handlePrev = () => setStartIndex(prev => Math.max(prev - windowSize, 0));
    const handleNext = () => setStartIndex(prev => Math.min(prev + windowSize, 12 - windowSize));

    const chartOptions = {
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
            categories: mesesVisiveis,
        },
        yaxis: {
            title: {
                text: 'Total de Horas Treinadas',
                style: { fontWeight: 600, color: '#1D2D44' },
            },
        },
        fill: { opacity: 1 },
        tooltip: {
            y: {
                formatter: (val) => `${val} hora(s)`,
            },
        },
        grid: { borderColor: '#E6E6E2' },
    };

    const chartSeries = [
        {
            name: 'Horas Treinadas',
            data: dadosVisiveis,
        },
    ];

    return (
        <div className="w-full border-2 border-[#E6E6E2] rounded-md p-5">
            {/* <h1 className='text-xl font-semibold mb-5'>{titulo}</h1> */}

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
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={215}
            />
        </div>
    );
};

export default GraficoHorasTreinadas;