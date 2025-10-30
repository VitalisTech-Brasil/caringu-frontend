import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { HiOutlineTrash, HiOutlineUpload } from "react-icons/hi";
import CustomToast from "../../Utils/CustomToast";
import { getCroppedImg } from "./cropImage";
import Cropper from "react-easy-crop";
import { caringuApi } from "../../../provider/caringuApi";
import loadingGif from "../../../assets/gifs/loading.gif"

export default function FotoPerfil(props) {
    const [fileName, setFileName] = useState(props.urlFoto);
    const fileInputRef = React.useRef();

    const imageUrl = fileName || props.urlFoto;
    const [imageSrc, setImageSrc] = useState(null);
    const [imgErro, setImgErro] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [originalFile, setOriginalFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [mensagemStatus, setMensagemStatus] = useState("Confirmar");
    const personalId = sessionStorage.getItem('pessoaId');

    useEffect(() => {
        if (props.urlFoto !== fileName) {
            setImgErro(false);
            setFileName(props.urlFoto);
        }
    }, [props.urlFoto, fileName]);

    const handleRemoverFoto = async () => {
        try {
            setLoading(true);
            setMensagemStatus("Removendo...");

            await caringuApi.delete(`/pessoas/${personalId}/remover-foto-perfil`);

            setFileName("");
            setImgErro(false);

            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Foto de perfil removida com sucesso!" />
            ));

            if (props.onFotoChange) props.onFotoChange("");
        } catch (error) {
            console.error("Erro ao remover foto:", error);
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Erro ao remover a foto de perfil." />
            ));
        } finally {
            setLoading(false);
            setMensagemStatus("Confirmar");
        }
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const tamanhoMaximoMB = 1;
            const tamanhoMaximoBytes = tamanhoMaximoMB * 1024 * 1024;

            if (file.size > tamanhoMaximoBytes) {

                toast.custom((t) => (
                    <CustomToast t={t} type="error" message={`A imagem excede o limite de ${tamanhoMaximoMB}MB. Por favor, escolha uma imagem menor.`} />
                ));

                event.target.value = "";
                return;
            }

            setOriginalFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                setShowModal(true);
            };
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

            const response = await caringuApi.post(
                `/pessoas/${personalId}/upload-foto-perfil`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setShowModal(false);

            const novaUrl = response?.data?.urlFotoPerfil || URL.createObjectURL(blob);
            setFileName(novaUrl);

            if (props.onFotoChange) props.onFotoChange(novaUrl);

            toast.custom((t) => (
                <CustomToast t={t} type="success" message="Foto enviada com sucesso!" />
            ));
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
        <>
            <div className="bg-white border-2 border-[#1D2D441C] rounded-lg p-4 sm:p-6 flex flex-col lg:flex-row items-center sm:justify-between gap-6">
                {/* Imagem e Texto */}
                <div className="flex items-center gap-4">
                    {imageUrl && !imgErro ? (
                        <img
                            src={imageUrl}
                            alt="Foto de perfil do personal"
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
                            onError={() => setImgErro(true)}
                        />
                    ) : (
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 496 512"
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"></path>
                        </svg>
                    )}
                    <div>
                        <h3 className="text-[24px] font-bold text-gray-800">
                            {props.nomePersonal}
                        </h3>
                    </div>
                </div>

                {/* Botões */}
                <div className="flex flex-col items-start justify-start sm:flex-row gap-4">
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <div className="flex flex-col items-center justify-between min-h-[64px]">
                        <button
                            type="button"
                            onClick={() => {
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                }
                                fileInputRef.current.click();
                            }}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-[16px] cursor-pointer text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-md w-full"
                        >
                            <HiOutlineUpload className="w-5 h-5" />
                            Carregar Foto
                        </button>
                        <p className="text-[14px] text-gray-500 mt-1">
                            PNG, JPEG, até 1MB
                        </p>
                    </div>

                    <div className="flex items-start min-h-[79px]">
                        <button
                            type="button"
                            onClick={handleRemoverFoto}
                            className="flex items-center justify-center gap-2 px-4 py-2 text-[16px] cursor-pointer text-white bg-red-700 hover:bg-red-800 rounded-md w-full"
                        >
                            <HiOutlineTrash className="w-5 h-5" />
                            Remover Foto
                        </button>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-[#0000006f] flex items-center justify-center min-h-screen p-4 z-50">
                        <div className="bg-white p-4 rounded-lg w-[90%] max-w-sm sm:max-w-md md:max-w-lg relative max-h-[90vh] overflow-y-auto">
                            <h2 className="text-lg font-semibold mb-2">Ajustar foto</h2>

                            {/* Área do cropper */}
                            <div className="relative w-full h-[250px] sm:h-64 bg-gray-200">
                                <Cropper
                                    image={imageSrc}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={1}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
                                />
                            </div>

                            {/* Controles */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setZoom((z) => Math.max(1, z - 0.1))}
                                        className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded text-lg"
                                    >-</button>
                                    <span className="text-sm w-10 text-center">{zoom.toFixed(1)}x</span>
                                    <button
                                        onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                                        className="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded text-lg"
                                    >+</button>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 cursor-pointer bg-gray-300 hover:bg-gray-400 rounded"
                                    >Cancelar</button>
                                    <button
                                        onClick={handleCropConfirm}
                                        className="px-4 py-2 cursor-pointer bg-[#E96E35] hover:bg-orange-500 text-white rounded"
                                    >
                                        {loading ? (
                                            <div className="flex items-center gap-2">
                                                <img src={loadingGif} alt="Carregando..." width="25" />
                                                <span>{mensagemStatus}</span>
                                            </div>
                                        ) : (
                                            <span>{mensagemStatus}</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <Toaster position='top-right' reverseOrder={false} />
            </div>
        </>
    );
}