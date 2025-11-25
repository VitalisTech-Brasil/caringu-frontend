import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { caringuApi } from "../provider/caringuApi";
import toast from "react-hot-toast";
import CustomToast from "../components/Utils/CustomToast";

const CompletarPerfil = () => {
  const navigate = useNavigate();
  const [telefone, setTelefone] = useState("");
  const [genero, setGenero] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "Completar perfil | CaringU";
  }, []);


  const handleSave = async (e) => {
    e.preventDefault();
    const pessoaId = sessionStorage.getItem("pessoaId");
    if (!pessoaId) {
      toast.custom((t) => (
        <CustomToast
          t={t}
          type="error"
          message="Sessão expirada. Faça login novamente."
        />
      ));
      navigate("/login");
      return;
    }

    setSaving(true);
    try {
      const cleanedPhone = telefone.replace(/\D/g, "") || null;
      const payload = {
        nome: null,
        email: null,
        senha: null,
        celular: cleanedPhone,
        urlFotoPerfil: null,
        dataNascimento: dataNascimento || null,
        genero: genero || null,
      };

      await caringuApi.patch(`/pessoas/${pessoaId}`, payload);

      toast.custom((t) => (
        <CustomToast
          t={t}
          type="success"
          message="Perfil atualizado com sucesso!"
        />
      ));

      navigate("/");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      toast.custom((t) => (
        <CustomToast
          t={t}
          type="error"
          message="Erro ao salvar perfil. Tente novamente."
        />
      ));
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#f5f5f5] px-4">
      <section className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Complete seu perfil
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Precisamos de algumas informações adicionais para personalizar sua
          experiência.
        </p>

        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <label className="block text-sm font-medium mb-1">
              Telefone (obrigatório)
            </label>
            <input
              type="tel"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(11) 99999-9999"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Gênero (obrigatório)
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="HOMEM_CISGENERO">Homem Cisgênero</option>
              <option value="HOMEM_TRANSGENERO">Homem Transgênero</option>
              <option value="MULHER_CISGENERO">Mulher Cisgênero</option>
              <option value="MULHER_TRANSGENERO">Mulher Transgênero</option>
              <option value="NAO_BINARIO">Não Binário</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Data de nascimento (opcional)
            </label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full mt-4 bg-[var(--laranja)] text-white font-semibold py-2 rounded-lg text-sm hover:bg-[#ef7f4b] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? "Salvando..." : "Salvar e continuar"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default CompletarPerfil;


