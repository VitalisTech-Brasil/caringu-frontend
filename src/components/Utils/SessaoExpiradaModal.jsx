import React from 'react';
import { useNavigate } from 'react-router-dom';
import alert from "../../assets/images/alert.svg";

export default function SessaoExpiradaModal({ visible, onClose }) {
    const navigate = useNavigate();

    if (!visible) return null;

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');

        if (onClose) onClose();

        navigate('/login');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-50" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-xl font-bold text-center text-[#D45C56] flex items-center justify-center space-x-2">
                    <img src={alert} alt="Alerta" className="w-6 h-6" />
                    <span>Sessão expirada</span>
                </h2>
                <div className="text-center mt-4">
                    <p>Sua sessão expirou por inatividade ou tempo limite.</p>
                    <p>Clique em "Redirecionar" para fazer login.</p>
                </div>
                <div className="flex justify-center mt-6">
                    <button
                        className="bg-[#D45C56] text-white px-4 py-2 rounded-lg cursor-pointer"
                        onClick={handleLogout}
                    >
                        Redirecionar
                    </button>
                </div>
            </div>
        </div>
    );
}