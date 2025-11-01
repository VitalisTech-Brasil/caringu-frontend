import Button from "../components/Utils/Button";
import imgErro from "../assets/images/erro.png";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    return (
        <>
        <div className="w-screen h-[100dvh] bg-[var(--cor-secundaria)]">
            <div className="flex flex-col items-center justify-center h-full">
                <img className="w-auto h-auto" src={imgErro} alt="carguru Imagem  de erro" />
                <span className="text-[var(--azul-escuro)] text-2xl sm:text-[32px] font-bold">
                    Página não encontrada
                </span>
                <p className="text-center text-var(--cor-primaria) text-base sm:text-[28px] font-medium mt-4 mb-10">
                  Algo deu errado. Tente novamente mais tarde.  
                </p>
                <Button
                    id="btnVoltar"
                    texto="Ir Para a Tela Inicial"
                    cor="var(--azul-claro)"
                    corTexto="var(--cor-secundaria)"
                    width="250px"
                    height="50px"
                    fontSize="20px"
                    ariaLabel="Botão Voltar para a página inicial"
                    onClick={() => navigate("/")}
                />
            </div>

        </div>
    </>
    )
}

export default Error;