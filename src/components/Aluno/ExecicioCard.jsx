import React, { useState } from "react";



function getTituloStyle(finalizado) {
  return {
    color: finalizado ? '#C5C8C6' : 'var(--laranja)',
    textDecoration: finalizado ? 'line-through' : 'none'
  };
}

function getIndicadorStyle(finalizado) {
  return {
    color: finalizado ? '#C5C8C6' : 'var(--cor-primaria)',
  };
}

function getIconIndicadorStyle(finalizado) {
  return finalizado ? '#C5C8C6' : 'var(--azul-escuro)';
}

export default function CardExercicio({ data, onToggleFinalizado }) {
  const [expandido, setExpandido] = useState(false);
  const { nome, carga, repeticoes, grupoMuscular, observacoes, tempoDescanso, video, finalizado } = data;

  // Verifica se o vídeo é do YouTube
  const isYouTube =
    video && (video.includes("youtube.com") || video.includes("youtu.be"));

  // Verifica se é imagem (gif, jpg, png, jpeg)
  const isImage =
    video &&
    /\.(gif|jpe?g|png)(\?|$)/i.test(video);

  let embedUrl = video;
  if (isYouTube && video) {
    try {
      if (video.includes("v=")) {
        const urlObj = new URL(video);
        const vId = new URLSearchParams(urlObj.search).get("v");
        embedUrl = `https://www.youtube.com/embed/${vId}`;
      } else {
        embedUrl = `https://www.youtube.com/embed/${video.split("/").pop()}`;
      }
    } catch (e) {
      console.error("Erro ao processar URL do vídeo:", e);
      embedUrl = video;
    }
  }


  return (
    <div className="flex cursor-pointer">
      <div className="h-full flex items-center m-2">
        <input
          type="checkbox"
          checked={finalizado}
          onChange={e => onToggleFinalizado && onToggleFinalizado(e.target.checked)}
          aria-label="Marcar exercício como concluído"
        />
      </div>

      <div
        onClick={() => setExpandido(!expandido)}
        className="border-[#15171B3D] border-2 rounded-xl p-3 flex flex-col gap-3 transition-all duration-300 w-full">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center">
          <span className="text-[14px] sm:text-[20px] text-[var(--laranja)] font-bold"
            style={
              getTituloStyle(finalizado)
            }
          >
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
          <span className="flex items-center gap-2">
            {/* Ícone da carga */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="none" viewBox="0 0 16 14">
              <path d="M12.3028 3.65649H13.2404C13.4991 3.65649 13.7092 3.90613 13.7092 4.21373V9.78605C13.7092 10.0936 13.4991 10.3433 13.2404 10.3433H12.3028C12.044 10.3433 11.834 10.0936 11.834 9.78605V4.21373C11.834 3.90613 12.044 3.65649 12.3028 3.65649Z" stroke={getIconIndicadorStyle(finalizado)} />
              <path d="M10.4278 1.42749H11.3654C11.6241 1.42749 11.8342 1.67713 11.8342 1.98472V12.0149C11.8342 12.3225 11.6241 12.5721 11.3654 12.5721H10.4278C10.169 12.5721 9.95898 12.3225 9.95898 12.0149V1.98472C9.95898 1.67713 10.169 1.42749 10.4278 1.42749Z" stroke={getIconIndicadorStyle(finalizado)} />
              <path d="M3.86528 1.42749H4.80286C5.06163 1.42749 5.27165 1.67713 5.27165 1.98472V12.0149C5.27165 12.3225 5.06163 12.5721 4.80286 12.5721H3.86528C3.6065 12.5721 3.39648 12.3225 3.39648 12.0149V1.98472C3.39648 1.67713 3.6065 1.42749 3.86528 1.42749Z" stroke={getIconIndicadorStyle(finalizado)} />
              <path d="M1.98832 3.65649H2.92591C3.18468 3.65649 3.3947 3.90613 3.3947 4.21373V9.78605C3.3947 10.0936 3.18468 10.3433 2.92591 10.3433H1.98832C1.72955 10.3433 1.51953 10.0936 1.51953 9.78605V4.21373C1.51953 3.90613 1.72955 3.65649 1.98832 3.65649Z" stroke={getIconIndicadorStyle(finalizado)} />
              <path d="M13.709 6.99963H15.1154" stroke={getIconIndicadorStyle(finalizado)} />
              <path d="M5.26953 6.99963H9.95745" stroke={getIconIndicadorStyle(finalizado)} />
              <path d="M0.113281 6.99963H1.51966" stroke={getIconIndicadorStyle(finalizado)} />
            </svg>

            <div className="flex flex-col sm:flex-row items-center gap-1 text-[10px] sm:text-[20px]"
              style={getIndicadorStyle(finalizado)}
            >
              <span className="font-bold">Carga:</span>
              <span>{carga}</span>
            </div>
          </span>
          <span className="flex items-center gap-2">
            {/* Ícone de repetições */}
            <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="15" fill="none" viewBox="0 0 20 15">
              <path d="M7.64678 13.75H12.3044C16.1857 13.75 17.7383 12.5 17.7383 9.375V5.625C17.7383 2.5 16.1857 1.25 12.3044 1.25H7.64678C3.76543 1.25 2.21289 2.5 2.21289 5.625V9.375C2.21289 12.5 3.76543 13.75 7.64678 13.75Z" stroke={getIconIndicadorStyle(finalizado)} strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14.244 7.5C14.244 9.4 12.3344 10.9375 9.97456 10.9375C7.6147 10.9375 6.17859 9.025 6.17859 9.025M6.17859 9.025H8.10375M6.17859 9.025V10.7438M5.70508 7.5C5.70508 5.6 7.59918 4.0625 9.97456 4.0625C12.8235 4.0625 14.244 5.975 14.244 5.975M14.244 5.975V4.25625M14.244 5.975H12.3499" stroke={getIconIndicadorStyle(finalizado)} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex sm:flex-row flex-col items-center gap-1 text-[10px] sm:text-[20px]"
              style={getIndicadorStyle(finalizado)}
            >
              <span className="font-bold">Repetições:</span>
              <span>{repeticoes}</span>
            </div>
          </span>
        </div>

        {/* Conteúdo expandido */}
        {expandido && (
          <>
            <div className="ml-2">
              <span className="flex items-center gap-2">
                <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="15" fill="none" viewBox="0 0 20 15">
                  <path d="M8.88477 3.90001H10.8456C10.8765 3.8581 10.8953 3.81112 10.9005 3.76257C10.9057 3.71401 10.8972 3.66514 10.8756 3.6196L8.88528 1.65918L8.88477 3.90001Z" fill="#FCFCFC" />
                  <path d="M7.24209 9.28208C7.21567 9.14549 7.18008 9.01015 7.13548 8.87666C6.81462 7.95041 6.54552 7.55833 6.66041 6.5875C6.81048 5.9275 6.80169 4.60291 8.98042 4.80916C9.55589 4.86375 10.4517 5.19541 10.9646 5.18833C11.258 5.18416 11.4717 4.70625 11.4909 4.54708C11.5173 4.32791 11.0432 3.95541 10.845 3.89958C10.3847 3.77961 9.92213 3.66515 9.45756 3.55625C8.91987 3.43083 8.94781 2.84583 8.91366 2.6375C8.90613 2.58895 8.91655 2.5397 8.94362 2.4959C8.97068 2.4521 9.01318 2.4157 9.06581 2.39125C9.17448 2.33958 9.25987 2.38791 9.36545 2.44333L9.82345 2.71333C10.0806 2.89083 9.37114 3.23 9.56314 3.28666C9.56314 3.28666 10.4714 3.56125 10.8605 3.61833C11.0738 3.64958 11.8097 2.98125 11.8526 2.58916C11.8863 2.28083 10.0941 0.887913 8.81636 0.34708C8.36716 0.15708 8.10375 0.0466633 7.80773 0.0579133C7.45427 0.0712466 7.343 0.183747 6.90312 0.48708C4.91225 1.85833 2.97985 4.82375 2.69625 5.48C1.53392 8.17208 1.35227 9.59041 1.31087 10.3917C1.28521 10.6353 1.27209 10.8797 1.27154 11.1242C1.30518 11.1242 0.754026 13.2075 1.27154 13.6242C1.78905 14.0408 4.02781 14.0408 4.02781 14.0408C9.20295 15.7029 18.8132 15.2692 18.8132 11.0271C18.8132 5.95541 9.07719 6.62833 7.24209 9.28208Z" fill={getIconIndicadorStyle(finalizado)} />
                  <path d="M11.2923 13.3659C9.65697 13.2276 8.37975 12.5821 8.30781 12.5451C8.19204 12.4857 8.11032 12.3917 8.08062 12.2837C8.05092 12.1758 8.07568 12.0628 8.14946 11.9696C8.22323 11.8764 8.33997 11.8106 8.474 11.7867C8.60803 11.7628 8.74837 11.7827 8.86414 11.8421C8.88484 11.8526 10.9357 12.8805 12.9246 12.4534C14.0243 12.2176 14.9258 11.5721 15.6037 10.5363C15.6677 10.4385 15.7773 10.3652 15.9084 10.3324C16.0395 10.2997 16.1814 10.3102 16.3029 10.3617C16.4243 10.4132 16.5154 10.5015 16.5561 10.607C16.5968 10.7126 16.5837 10.8268 16.5197 10.9246C15.6995 12.1771 14.577 12.9634 13.1833 13.2605C12.5328 13.3988 11.8885 13.4163 11.2923 13.3659Z" fill="#FCFCFC" />
                </svg>

                <div className="text-[10px] sm:text-[20px]"
                  style={getIndicadorStyle(finalizado)}
                >
                  <b className="text-[10px] sm:text-[20px]">Grupo Muscular: </b>{grupoMuscular ? grupoMuscular : "Sem Grupo Muscular"}
                </div>
              </span>
            </div>
            <div className="ml-2">
              <span className="flex items-center gap-2">
                <svg className="shrink-0" width="20" height="15" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.33331 6.6084H8.12498" stroke={getIconIndicadorStyle(finalizado)} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4.33331 8.7749H6.70581" stroke={getIconIndicadorStyle(finalizado)} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.41665 3.24992H7.58331C8.66665 3.24992 8.66665 2.70825 8.66665 2.16659C8.66665 1.08325 8.12498 1.08325 7.58331 1.08325H5.41665C4.87498 1.08325 4.33331 1.08325 4.33331 2.16659C4.33331 3.24992 4.87498 3.24992 5.41665 3.24992Z" stroke={getIconIndicadorStyle(finalizado)} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.66667 2.17749C10.4704 2.27499 11.375 2.94124 11.375 5.41666V8.66666C11.375 10.8333 10.8333 11.9167 8.125 11.9167H4.875C2.16667 11.9167 1.625 10.8333 1.625 8.66666V5.41666C1.625 2.94666 2.52958 2.27499 4.33333 2.17749" stroke={getIconIndicadorStyle(finalizado)} strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <div className="text-[10px] sm:text-[20px]"
                  style={getIndicadorStyle(finalizado)}
                >
                  <b className="text-[10px] sm:text-[20px]">Observações: </b>{observacoes ? observacoes : "Sem Observações"}
                </div>
              </span>
            </div>
            <div className="ml-2">
              <span className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0" width="20" height="19" viewBox="0 0 20 19" fill="none">
                  <path d="M10.1404 0C4.90588 0 0.640381 4.2655 0.640381 9.5C0.640381 14.7345 4.90588 19 10.1404 19C15.3749 19 19.6404 14.7345 19.6404 9.5C19.6404 4.2655 15.3749 0 10.1404 0ZM14.2729 12.8915C14.1399 13.1195 13.9024 13.243 13.6554 13.243C13.5319 13.243 13.4084 13.2145 13.2944 13.1385L10.3494 11.381C9.61788 10.944 9.07638 9.9845 9.07638 9.139V5.244C9.07638 4.8545 9.39938 4.5315 9.78888 4.5315C10.1784 4.5315 10.5014 4.8545 10.5014 5.244V9.139C10.5014 9.481 10.7864 9.9845 11.0809 10.1555L14.0259 11.913C14.3679 12.1125 14.4819 12.5495 14.2729 12.8915Z" fill={getIconIndicadorStyle(finalizado)} />
                </svg>

                <div className="text-[10px] sm:text-[20px]"
                  style={getIndicadorStyle(finalizado)}
                >
                  <b className="text-[10px] sm:text-[20px]">Tempo de Descanso: </b>{tempoDescanso ? tempoDescanso : "Sem Tempo de Descanso"}
                </div>
              </span>
            </div>

            <div className="ml-2">
              <b className="text-[10px] sm:text-[20px]">Exemplo de execução:</b>
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
                  ) : isImage ? (
                    <img src={video} alt={nome} className="w-full h-60 object-contain rounded-xl" />
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
