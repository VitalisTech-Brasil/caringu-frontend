import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

const GraficoEvolucaoTreinosCumpridos = ({ dadosAPI }) => {
    const [graficoData, setGraficoData] = useState({
        esperados: new Array(12).fill(0),
        concluidos: new Array(12).fill(0),
    });

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

    return (
        <div className='border-2 border-[#E6E6E2] rounded-md p-5'>
            <ReactApexChart
                options={{
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
                    colors: ['#748CAB', '#E96E35'],
                    xaxis: {
                        categories: meses,
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
                        horizontalAlign: 'center',
                        markers: {
                            radius: 5,
                        },
                    },
                    tooltip: {
                        y: {
                            formatter: (val) => `${val} treino(s)`,
                        },
                    },
                    grid: {
                        borderColor: '#E6E6E2',
                    },
                }}
                series={[
                    {
                        name: 'Treinos Programados',
                        data: graficoData.esperados,
                    },
                    {
                        name: 'Treinos Concluídos',
                        data: graficoData.concluidos,
                    },
                ]}
                type="bar"
                height={215}
            />
        </div>
    );
}

export default GraficoEvolucaoTreinosCumpridos;