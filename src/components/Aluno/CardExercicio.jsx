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

      <div className="border-[#15171B3D] border-2 rounded-xl p-3 flex flex-col gap-3 transition-all duration-300 w-full">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center">
          <span className="text-[14px] sm:text-[20px] text-[var(--laranja)] font-bold">
            {nome}
          </span>
          <button
            onClick={() => setExpandido(!expandido)}
            className="text-sm text-[var(--laranja)] hover:underline"
          >
            {expandido ? "Fechar ▲" : "Ver mais ▼"}
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
