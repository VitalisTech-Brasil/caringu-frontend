import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRef, useState } from "react";
import clsx from "clsx";

import ImageModal from "../../components/Utils/ImageModal";

const CarrosselRegistro = ({ imagens = [], titulo = "" }) => {

  if (imagens.length === 0) {
    return (
      <div className="py-12 flex flex-col items-center justify-center">
        <h2 className="text-xl font-bold text-gray-800">{titulo}</h2>
        <p className="text-gray-500 text-sm mt-4">Nenhuma imagem disponível.</p>
      </div>
    );
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState("");

  const podeFazerLoop = imagens.length > 3;

  const abrirModal = (src) => {
    setImagemSelecionada(src);
    setModalOpen(true);
  };

  return (
    <div className="relative py-8 flex flex-col items-center justify-center gap-2 w-[95%] mx-auto cursor-grab">
      {titulo && <h2 className="text-xl font-bold text-gray-800">{titulo}</h2>}

      {/* Botão Esquerda */}


      {/* Swiper */}
      <div className="w-full px-4 flex flex-row items-center">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-4 md:left-10 z-10 hover:scale-110 transition-all duration-300 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="26" viewBox="0 0 10 26" fill="none">
            <path d="M9.58722 0.577088C9.04358 -0.192363 8.16208 -0.192363 7.61846 0.577088L0.814554 10.216C-0.271865 11.7552 -0.271447 14.2492 0.81539 15.7876L7.62347 25.4228C8.1671 26.1924 9.04859 26.1924 9.59225 25.4228C10.1359 24.6534 10.1359 23.4058 9.59225 22.6364L3.76532 14.3897C3.22155 13.6203 3.22169 12.3727 3.76532 11.6033L9.58722 3.36347C10.1309 2.59404 10.1309 1.34652 9.58722 0.577088Z" fill="#1D2D44" />
          </svg>
        </button>

        <Swiper
          modules={[Navigation, Pagination]}
          loop={podeFazerLoop}
          slidesPerView={3}
          slidesPerGroup={1}
          spaceBetween={30}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {imagens.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col items-center">
                <div
                  onClick={() => abrirModal(item.src)}
                  className="w-25 h-25 xl:w-56 xl:h-56 bg-gray-300 rounded cursor-pointer flex items-center justify-center"
                >
                  {item.src ? (
                    <img
                      src={item.src}
                      alt={`Imagem ${item.id}`}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs md:text-sm">Sem imagem</span>
                  )}
                </div>
                <p className="mt-2 text-xs md:text-sm text-gray-700">
                  Data de envio: {item.dataEnvio}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-4 md:right-10 z-10 hover:scale-110 transition-all duration-300 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="26" viewBox="0 0 10 26" fill="none">
            <path d="M0.412777 25.4229C0.956418 26.1924 1.83792 26.1924 2.38154 25.4229L9.18545 15.784C10.2719 14.2448 10.2714 11.7508 9.18461 10.2124L2.37653 0.57719C1.8329 -0.192398 0.951406 -0.192398 0.407751 0.57719C-0.135918 1.34658 -0.135918 2.59416 0.407751 3.36355L6.23468 11.6103C6.77845 12.3797 6.77831 13.6273 6.23468 14.3967L0.412777 22.6365C-0.130892 23.406 -0.130892 24.6535 0.412777 25.4229Z" fill="#1D2D44" />
          </svg>
        </button>
      </div>

      {/* Paginação */}
      <div className="flex gap-1 md:gap-2 mt-4">
        {imagens.map((_, index) => (
          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={clsx(
              "w-2 h-2 md:w-3 md:h-3 rounded-full shadow transition-all cursor-pointer",
              activeIndex === index ? "bg-blue-500" : "bg-white border border-gray-300"
            )}
          ></button>
        ))}
      </div>

      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={imagemSelecionada}
      />
    </div>
  );
};

export default CarrosselRegistro;