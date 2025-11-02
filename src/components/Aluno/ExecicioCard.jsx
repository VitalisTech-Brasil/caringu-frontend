import React, { useState } from "react";

export default function CardExercicio({ data }) {
  const [expandido, setExpandido] = useState(false);
  const { nome, carga, repeticoes, grupoMuscular, observacoes, tempoDescanso, video } = data;

  // Verifica se o vídeo é do YouTube
  const isYouTube =
    video && (video.includes("youtube.com") || video.includes("youtu.be"));

  // Extrai o ID do vídeo do YouTube e monta o link embed
  const embedUrl =
    isYouTube && video
      ? `https://www.youtube.com/embed/${
          video.includes("v=")
            ? new URLSearchParams(new URL(video).search).get("v")
            : video.split("/").pop() // caso seja formato youtu.be/xxxxx
        }`
      : video;

  return (
    <div className="flex">
      <div className="h-full flex items-center m-2">
        <input type="checkbox" />
      </div>

      <div
        onClick={() => setExpandido(!expandido)}
        className="border-[#15171B3D] border-2 rounded-xl p-3 flex flex-col gap-3 transition-all duration-300 w-full">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center">
          <span className="text-[14px] sm:text-[20px] text-[var(--laranja)] font-bold">
            {nome}
          </span>
          <button
            className="text-sm text-[var(--laranja)] hover:underline"
          >
            {expandido ? (
              <svg width="17" height="7" viewBox="0 0 17 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.1314 6.25233C16.6049 5.92615 16.6049 5.39725 16.1314 5.07107L10.1997 0.988732C9.25253 0.336881 7.71778 0.337131 6.77108 0.989233L0.841705 5.07408C0.368113 5.40026 0.368113 5.92916 0.841705 6.25535C1.31518 6.58155 2.08292 6.58155 2.55639 6.25535L7.63133 2.75919C8.1048 2.43293 8.87254 2.43301 9.34601 2.75919L14.4167 6.25233C14.8902 6.57854 15.6579 6.57854 16.1314 6.25233Z" fill="#1D2D44" />
              </svg>
            ) : (
              <svg width="16" height="6" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.355131 0.247666C-0.118377 0.573851 -0.118377 1.10275 0.355131 1.42893L6.28679 5.51127C7.23398 6.16312 8.76873 6.16287 9.71543 5.51077L15.6448 1.42592C16.1184 1.09974 16.1184 0.570844 15.6448 0.244651C15.1713 -0.0815504 14.4036 -0.0815504 13.9301 0.244651L8.85518 3.74081C8.38171 4.06707 7.61397 4.06699 7.1405 3.74081L2.06983 0.247666C1.59633 -0.0785353 0.828627 -0.0785353 0.355131 0.247666Z" fill="#1D2D44" />
              </svg>
            )}
          </button>
        </div>

        {/* Sempre visível */}
        <div className="flex gap-5 ml-2">
          <span className="text-[12px] sm:text-[16px]">
            <b>Carga:</b> {carga}
          </span>
          <span className="text-[12px] sm:text-[16px]">
            <b>Repetições:</b> {repeticoes}
          </span>
        </div>

        {/* Conteúdo expandido */}
        {expandido && (
          <>
            <div className="ml-2 text-[12px] sm:text-[16px]">
              <b>Grupo muscular:</b> {grupoMuscular}
            </div>
            <div className="ml-2 text-[12px] sm:text-[16px]">
              <b>Observações:</b> {observacoes}
            </div>
            <div className="ml-2 text-[12px] sm:text-[16px]">
              <b>Tempo de Descanso:</b> {tempoDescanso}
            </div>

            <div className="ml-2">
              <b>Exemplo de execução:</b>
              <div className="mt-2 rounded-xl overflow-hidden border-2 border-[#15171B3D]">
                {video ? (
                  isYouTube ? (
                    <iframe
                      width="100%"
                      height="240"
                      src={embedUrl}
                      title={nome}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video src={embedUrl} controls className="w-full h-60 rounded-xl" />
                  )
                ) : (
                  <div className="h-40 flex justify-center items-center text-gray-400">
                    Sem vídeo
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
