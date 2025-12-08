import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import CustomToast from "../../../components/Utils/CustomToast";

export default function useSessionValidation() {
    const navigate = useNavigate();

    useEffect(() => {
        const personalId = sessionStorage.getItem("pessoaId");
        if (!personalId) {
            toast.custom((t) => (
                <CustomToast t={t} type="error" message="Sessão expirada. Faça login novamente." />
            ));
            navigate("/login");
        }
    }, [navigate]);
}