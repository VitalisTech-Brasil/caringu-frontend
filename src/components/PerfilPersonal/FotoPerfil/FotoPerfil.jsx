import React, { useState } from "react";
import { HiOutlineTrash, HiOutlineUpload } from "react-icons/hi";

export default function FotoPerfil(props) {
    const [fileName, setFileName] = useState(props.urlFoto);
    const fileInputRef = React.useRef();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file ? URL.createObjectURL(file) : "");
    };

    return (
        <>
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                {/* Imagem e Texto */}
                <div className="flex items-center gap-4">
                    {fileName ? (
                        <img
                            src={fileName}
                            alt="Foto de perfil do personal"
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
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
                        <h3 className="text-[16px] font-semibold text-gray-800">
                            Foto de perfil
                        </h3>
                        <p className="text-[14px] text-gray-500">
                            PNG, JPEG, menos de 15MB
                        </p>
                    </div>
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    <button
                        type="button"
                        onClick={() => fileInputRef.current.click()}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-[16px] cursor-pointer text-gray-700 border border-gray-300 hover:bg-gray-100 rounded-md"
                    >
                        <HiOutlineUpload className="w-5 h-5" />
                        Carregar Foto
                    </button>

                    <button
                        type="button"
                        onClick={() => setFileName("")}
                        className="flex items-center justify-center gap-2 px-4 py-2 text-[16px] cursor-pointer text-white bg-red-700 hover:bg-red-800 rounded-md"
                    >
                        <HiOutlineTrash className="w-5 h-5" />
                        Remover foto
                    </button>
                </div>
            </div>
        </>
    );
}