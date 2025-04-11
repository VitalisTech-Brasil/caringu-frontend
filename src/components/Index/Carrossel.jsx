// components/Carousel.js
import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import iconeAgenda from '../../assets/images/iconeAgenda.svg'
import iconeExercicio from '../../assets/images/iconeExercicio.svg'
import iconeTreino from '../../assets/images/iconeTreinos.svg'
import iconeAluno from '../../assets/images/iconeAlunos.svg'

const slides = [
    {
        icon: iconeExercicio,
        title: "Gerenciamento de exercícios",
        description: "Crie e atribua exercícios a treinos para facilitar o compartilhamento entre os alunos."
    },
    {
        icon: iconeTreino,
        title: "Gerenciamento de treinos",
        description: "Crie treinos e distribua entre seus alunos para maior praticidade e conforto."
    },
    {
        icon: iconeAluno,
        title: "Gerenciamento de alunos",
        description: "Gerencie seus alunos com planos ativos, veja seu desempenho com gráficos e preencha sua anamnese online."
    },
    {
        icon: iconeAgenda,
        title: "Agenda",
        description: "Acesse suas aulas agendadas com um calendário mensal, semanal e diário para se manter informado sobre sua agenda."
    }
];

const Carrossel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className='relative w-full h-[400px] px-4'>
            <div className='flex items-center justify-center h-full'>
                <div
                    onClick={prevSlide}
                    className='absolute left-8 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/30 transition-all'
                >
                    <FaChevronLeft size={30} />
                </div>

                <div className='flex gap-8'>
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            className={`w-[432px] h-[242px] bg-white rounded-lg p-6 shadow-lg transition-all duration-500 transform ${slideIndex === currentIndex ? 'scale-105 opacity-100' : 'scale-90 opacity-50'
                                }`}
                        >
                            <img src={slide.icon} alt={slide.title} className="w-10 h-10 mb-4" />
                            <h3 className='text-xl font-bold mb-2'>{slide.title}</h3>
                            <p className='text-gray-600'>{slide.description}</p>
                        </div>
                    ))}
                </div>

                <div
                    onClick={nextSlide}
                    className='absolute right-8 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/30 transition-all'
                >
                    <FaChevronRight size={30} />
                </div>
            </div>

            <div className='flex justify-center gap-2 mt-4'>
                {slides.map((_, slideIndex) => (
                    <div
                        key={slideIndex}
                        onClick={() => goToSlide(slideIndex)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all ${slideIndex === currentIndex ? 'bg-black' : 'bg-gray-400'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carrossel;
