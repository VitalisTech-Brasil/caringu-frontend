import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import clsx from 'clsx';
import { useRef, useState } from 'react';

import iconeExercicio from '../../assets/images/iconeExercicio.svg';
import iconeTreinos from '../../assets/images/iconeTreinos.svg';
import iconeAlunos from '../../assets/images/iconeAlunos.svg';
import iconeAgenda from '../../assets/images/iconeAgenda.svg';
import setaVoltar from '../../assets/images/back.svg';

const features = [
  { title: 'Gerenciamento de exercícios', description: 'Crie e atribua exercícios a treinos para facilitar o compartilhamento entre os alunos.', icon: iconeExercicio },
  { title: 'Gerenciamento de treinos', description: 'Crie treinos e distribua entre seus alunos para maior praticidade e conforto.', icon: iconeTreinos },
  { title: 'Gerenciamento de alunos', description: 'Gerencie seus alunos com planos ativos, veja seu desempenho com gráficos e preencha sua anamnese online.', icon: iconeAlunos },
  { title: 'Agenda', description: 'Acesse suas aulas agendadas com um calendário mensal, semanal e diário para se manter informado sobre sua agenda.', icon: iconeAgenda },
];

const FeatureCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const swiperRef = useRef(null);

  return (
    <div className="relative w-full py-16 flex flex-col items-center justify-center gap-6">
      {/* Botão Esquerda */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-40  z-10 hover:scale-110 transition-all duration-300 shadow-md cursor-pointer"
      >
        <img src={setaVoltar} alt="Arrow Left" className="w-6 h-6" />
      </button>

      {/* Swiper */}
      <div className="w-full max-w-6xl flex justify-center items-center">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={3}
          slidesPerGroup={1}
          loop
          centeredSlides
          spaceBetween={30}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="w-full"
        >
          {features.map((feature, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center !shrink-0 cursor-pointer"
              onClick={() => swiperRef.current?.slideToLoop(index)}
            >
              <div
                className={clsx(
                  "transition-all duration-300 rounded-2xl p-6 text-start w-full max-w-[500px] h-[250px]",
                  activeIndex === index
                    ? "bg-white scale-105 shadow-xl"
                    : "bg-white/80 scale-95 shadow-md backdrop-blur"
                )}
              >
                <div className="text-4xl mb-4 w-full flex justify-start items-center">
                  <img src={feature.icon} alt={feature.title} className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-700">{feature.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Paginação personalizada */}
      <div className="flex gap-2 mt-4">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={clsx(
              "w-3 h-3 rounded-full flex items-center justify-center shadow transition-all cursor-pointer",
              activeIndex === index ? "bg-blue-500" : "bg-white"
            )}
          ></button>
        ))}
      </div>

      {/* Botão Direita */}
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-40 z-10 hover:scale-110 transition-all duration-300 cursor-pointer"
      >
        <img src="src/assets/images/next.svg" alt="Arrow Right" className="w-6 h-6" />
      </button>
    </div>
  );
};

export default FeatureCarousel;
