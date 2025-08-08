import React from 'react';
import ReactApexChart from 'react-apexcharts';

const GraficoHorasTreinadas = ({ dados, titulo = "Total de horas treinadas por mês" }) => {
    const chartOptions = {
        chart: {
            type: 'bar',
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false,
                }
            },
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
                formatter: (val) => `${val} hora(s)`,
            },
        },
        grid: {
            borderColor: '#E6E6E2',
        },
    };

    const chartSeries = [
        {
            name: 'Horas Treinadas',
            data: dados,
        },
    ];

    return (
        <div className="w-full">
            <h1 className='text-xl font-semibold mb-5'>{titulo}</h1>
            <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="bar"
                height={215}
                className="border-2 border-[#E6E6E2] rounded-md p-5 sm:w-auto w-full"
            />
        </div>
    );
};

export default GraficoHorasTreinadas;