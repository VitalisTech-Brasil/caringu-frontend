import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const GraficoEvolucaoCarga = ({ dados }) => {
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if (!dados || dados.length === 0) {

            setOptions({
                chart: {
                    type: 'area',
                    height: 350,
                    toolbar: { show: false },
                },
                xaxis: {
                    categories: [],
                    labels: { style: { colors: '#1D2D44' } }
                },
                yaxis: {
                    title: {
                        text: 'CARGA (KG)',
                        style: { color: '#1D2D44' }
                    },
                    labels: { style: { colors: '#1D2D44' } }
                },
                grid: {
                    borderColor: '#E6E6E6'
                },
                tooltip: {
                    y: {
                        formatter: (val) => `${val} KG`
                    }
                },
                noData: {
                    text: 'Sem dados disponíveis',
                    align: 'center',
                    verticalAlign: 'middle',
                    style: {
                        color: '#1D2D44',
                        fontSize: '16px'
                    }
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

        setOptions({
            chart: {
                type: 'area',
                height: 350,
                zoom: { enabled: false },
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
            dataLabels: { enabled: false },
            stroke: {
                curve: 'smooth',
                width: 3,
                colors: ['#1D2D44'],
            },
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
            xaxis: {
                categories: datasFormatadas,
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
        });

        setSeries([
            {
                name: 'Carga',
                data: cargas
            }
        ]);
    }, [dados]);

    return (
        <div className='border-2 border-[#E6E6E2] rounded-md mt-4'>
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