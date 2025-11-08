import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { getCroppedImg } from "../../components/PerfilPersonal/FotoPerfil/cropImage";
import Cropper from "react-easy-crop";
import { caringuApi } from "../../provider/caringuApi";
import CustomToast from "../Utils/CustomToast";
import loadingGif from "../../assets/gifs/loading.gif";

export default function ModalEvolucaoCorporal({ tipo, alunoId, periodoAvaliacao, onClose }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagemStatus, setMensagemStatus] = useState("Confirmar");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOriginalFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCropConfirm = async () => {
    setLoading(true);
    setMensagemStatus("Enviando...");
    try {
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const formData = new FormData();
      formData.append("arquivo", blob, originalFile?.name || "imagem.jpg");
      formData.append("tipo", tipo);
      formData.append("periodoAvaliacao", periodoAvaliacao);
      formData.append("alunoId", 7);

      await caringuApi.post("/evolucao-corporal", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.custom((t) => (
        <CustomToast t={t} type="success" message="Foto enviada com sucesso!" />
      ));
      onClose();
    } catch (err) {
      console.error(err);
      toast.custom((t) => (
        <CustomToast t={t} type="error" message="Erro ao enviar a imagem." />
      ));
    } finally {
      setLoading(false);
      setMensagemStatus("Confirmar");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded-xl w-[90%] max-w-lg">
        <h2 className="text-lg font-semibold text-center mb-4">
          Enviar foto ({tipo})
        </h2>

        {!imageSrc ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed p-6 rounded-lg">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="inputImagem"
            />
            <label
              htmlFor="inputImagem"
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Clique aqui para escolher uma imagem
            </label>
          </div>
        ) : (
          <>
            <div className="relative w-full h-64 bg-gray-200">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setZoom((z) => Math.max(1, z - 0.1))}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  -
                </button>
                <span>{zoom.toFixed(1)}x</span>
                <button
                  onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                  className="bg-gray-300 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleCropConfirm}
                  className="px-4 py-2 bg-[#E96E35] text-white hover:bg-orange-500 rounded"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <img src={loadingGif} width="25" alt="..." />
                      <span>{mensagemStatus}</span>
                    </div>
                  ) : (
                    mensagemStatus
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}