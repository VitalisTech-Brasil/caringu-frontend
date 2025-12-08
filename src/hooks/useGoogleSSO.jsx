import { useCallback } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../provider/api";
import { caringuApi } from "../provider/caringuApi";
import CustomToast from "../components/Utils/CustomToast";
import { useFotoPerfil } from "../context/FotoPerfilContext";

export const useGoogleSSO = () => {
  const navigate = useNavigate();
  const { setFotoPerfil } = useFotoPerfil();

  const handleBackendResponse = useCallback(
    (dados) => {
      // 5 - Token Google inválido ou expirado
      if (dados?.erro === "INVALID_GOOGLE_TOKEN") {
        toast.custom((t) => (
          <CustomToast
            t={t}
            type="error"
            message="Token do Google inválido ou expirado. Tente novamente."
          />
        ));
        return;
      }

      // 1 - E-mail não existe -> precisaCadastro
      if (dados?.precisaCadastro) {
        navigate("/cadastro", {
          state: {
            fromGoogle: true,
            email: dados.email,
            name: dados.nome,
            picture: dados.foto,
          },
        });
        return;
      }

      // 4 - Perfil incompleto -> precisaCompletarPerfil
      if (dados?.precisaCompletarPerfil) {
        if (dados?.usuario) {
          const { id, nome, email, perfis } = dados.usuario;
          const tipo =
            Array.isArray(perfis) && perfis.length > 0 ? perfis[0] : "ALUNO";

          sessionStorage.setItem("pessoaId", id);
          sessionStorage.setItem("usuario", nome);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("tipo", tipo);

          // Foto de perfil inicial (perfil incompleto mas já pode ter foto)
          caringuApi
            .get(`/pessoas/${id}/foto-perfil`)
            .then((fotoResponse) => {
              const url = fotoResponse?.data?.urlFotoPerfil || "";
              setFotoPerfil(url);
            })
            .catch((e) => {
              console.error("Erro ao buscar foto de perfil (perfil incompleto):", e);
              setFotoPerfil("");
            });
        }

        toast.custom((t) => (
          <CustomToast
            t={t}
            type="warning"
            message="Complete seu perfil para continuar."
          />
        ));

        navigate("/complete-profile");
        return;
      }

      // 2 - Login normal (sucesso)
      if (dados?.sucesso && dados?.usuario) {
        const { id, nome, email, perfis } = dados.usuario;
        const tipo =
          Array.isArray(perfis) && perfis.length > 0 ? perfis[0] : "ALUNO";
        const upperTipo = (tipo || "").toString().toUpperCase();

        // Token também vem na resposta, mas o backend já grava o JWT em cookie HttpOnly
        if (dados.token) {
          sessionStorage.setItem("authToken", dados.token);
        }

        sessionStorage.setItem("pessoaId", id);
        sessionStorage.setItem("usuario", nome);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("tipo", tipo);

        // Foto de perfil inicial após login com Google
        let requestPromise;
        if (upperTipo === "PERSONAL") {
          requestPromise = caringuApi.get(`/personal-trainers/${id}`);
        } else if (upperTipo === "ALUNO") {
          requestPromise = caringuApi.get(`/alunos/${id}`);
        } else {
          requestPromise = caringuApi.get(`/pessoas/${id}/foto-perfil`);
        }

        requestPromise
          .then((resp) => {
            const url = resp?.data?.urlFotoPerfil || "";
            setFotoPerfil(url);
          })
          .catch((e) => {
            console.error("Erro ao buscar foto de perfil após login Google:", e);
            setFotoPerfil("");
          });

        toast.custom((t) => (
          <CustomToast
            t={t}
            type="success"
            message="Login com Google realizado!"
          />
        ));

        setTimeout(async () => {
          if (upperTipo === "PERSONAL") {
            navigate("/home");
          } else if (upperTipo === "ALUNO" && id) {
            try {
              const res = await caringuApi.get(
                `/alunos/validacao-contratacao/${id}`
              );
              if (res.data === true) {
                navigate("/home-aluno");
              } else {
                navigate("/procurando-personal");
              }
            } catch (error) {
              console.error("Erro ao validar aluno:", error);
              navigate("/home-aluno");
            }
          } else {
            navigate("/");
          }
        }, 1000);

        return;
      }

      // Fallback genérico
      toast.custom((t) => (
        <CustomToast
          t={t}
          type="error"
          message="Não foi possível concluir o login com Google."
        />
      ));
    },
    [navigate]
  );

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      try {
        const resposta = await api.post(
          "/login/google",
          { codigo: codeResponse.code },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        handleBackendResponse(resposta.data);
      } catch (error) {
        // 7 - Popup bloqueado (tratamos alguns erros comuns)
        const codigoErro =
          error?.error ||
          error?.response?.data?.erro ||
          error?.response?.data?.mensagem;

        if (
          codigoErro === "popup_closed_by_user" ||
          codigoErro === "popup_blocked_by_browser"
        ) {
          toast.custom((t) => (
            <CustomToast
              t={t}
              type="error"
              message="O popup de login do Google foi bloqueado pelo navegador. Habilite popups para continuar."
            />
          ));
        } else {
          toast.custom((t) => (
            <CustomToast
              t={t}
              type="error"
              message="Erro ao fazer login com Google."
            />
          ));
        }
      }
    },
    onError: (errorResponse) => {
      const codigoErro =
        errorResponse?.error || errorResponse?.details || errorResponse;

      if (
        codigoErro === "popup_closed_by_user" ||
        codigoErro === "popup_blocked_by_browser"
      ) {
        toast.custom((t) => (
          <CustomToast
            t={t}
            type="error"
            message="O popup de login do Google foi bloqueado pelo navegador. Habilite popups para continuar."
          />
        ));
      } else {
        toast.custom((t) => (
          <CustomToast
            t={t}
            type="error"
            message="Login com Google falhou."
          />
        ));
      }
    },
  });

  const loginWithGoogle = useCallback(() => {
    try {
      googleLogin();
    } catch (err) {
      console.error("Erro ao abrir o popup do Google:", err);
      toast.custom((t) => (
        <CustomToast
          t={t}
          type="error"
          message="Não foi possível abrir o popup do Google. Habilite popups para continuar."
        />
      ));
    }
  }, [googleLogin]);

  return { loginWithGoogle };
};


