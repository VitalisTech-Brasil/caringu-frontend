import { Tabs } from "flowbite-react";
import React, { useState } from "react";
import { HiOutlineTrash, HiOutlineUpload } from "react-icons/hi";
import Header from "../../components/Personal/Header/Header";
import MenuLateral from "../../components/Personal/MenuLateral/MenuLateral";
import ModalRemoverEspecialidade from "../../components/Utils/ModalRemoverEspecialidade";

const Perfil = () => {
  const [selectedTab, setSelectedTab] = useState("informacoes");
  const [especialidades, setEspecialidades] = useState([
    "Musculação",
    "Pilates",
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] =
    useState(null);

  const handleRemoveEspecialidade = (especialidade) => {
    setModalVisible(true);
    setEspecialidadeSelecionada(especialidade);
  };

  const handleConfirmRemove = (especialidadeId) => {
    setEspecialidades((prev) =>
      prev.filter((item) => item !== especialidadeId)
    );
    setModalVisible(false);
  };

  const handleCancelRemove = () => {
    setModalVisible(false);
    setEspecialidadeSelecionada(null);
  };

  return (
    <div className="flex min-h-screen bg-[#fdfcf9]">
      {/* Menu Lateral */}
      <MenuLateral isOpen={true} />

      <div className="flex-1">
        {/* Cabeçalho */}
        <Header />

        <main className="p-8 space-y-8">
          {/* Modal */}
          {modalVisible && (
            <ModalRemoverEspecialidade
              especialidadeId={especialidadeSelecionada}
              onConfirm={handleConfirmRemove}
              onCancel={handleCancelRemove}
            />
          )}

          {/* Abas de Navegação */}
          <Tabs>
            <Tabs.Item
              active={selectedTab === "informacoes"}
              title="Informações pessoais"
              onClick={() => setSelectedTab("informacoes")}
            >
              {/* Conteúdo da aba Informações Pessoais */}
              <div className="space-y-8">
                {/* Foto de Perfil */}
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
                  {/* Imagem e Texto */}
                  <div className="flex items-center gap-4">
                    <img
                      src="https://via.placeholder.com/150"
                      alt="Foto de Perfil"
                      className="w-28 h-28 rounded-full object-cover"
                    />
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
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 text-[16px] text-gray-700 border border-gray-300 rounded-md">
                      <HiOutlineUpload className="w-5 h-5" />
                      Carregar foto
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-[16px] text-white bg-red-700 rounded-md">
                      <HiOutlineTrash className="w-5 h-5" />
                      Remover foto
                    </button>
                  </div>
                </div>

                {/* Informações Profissionais */}
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h2 className="text-[18px] font-bold text-gray-800 mb-4">
                    Informações Profissionais
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[16px] font-medium text-gray-700">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                        placeholder="Digite seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                        placeholder="Digite seu email"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-medium text-gray-700">
                        Especialidade
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {especialidades.map((especialidade, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md text-[16px]"
                          >
                            {especialidade}
                            <button
                              onClick={() =>
                                handleRemoveEspecialidade(especialidade)
                              }
                              className="text-red-600"
                            >
                              <HiOutlineTrash className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                        <button className="text-[16px] text-blue-600">
                          + Adicionar
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[16px] font-medium text-gray-700">
                        Data de nascimento
                      </label>
                      <input
                        type="date"
                        className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-medium text-gray-700">
                        Gênero
                      </label>
                      <select className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]">
                        <option value="">Selecione</option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[16px] font-medium text-gray-700">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                        placeholder="(XX) XXXXX-XXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-medium text-gray-700">
                        CREF
                      </label>
                      <input
                        type="text"
                        className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                        placeholder="Digite seu CREF"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-medium text-gray-700">
                        Anos de experiência
                      </label>
                      <input
                        type="number"
                        className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                        placeholder="Digite os anos de experiência"
                      />
                    </div>
                    <div>
                      <label className="block text-[16px] font-medium text-gray-700">
                        Cidade
                      </label>
                      <input
                        type="text"
                        className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                        placeholder="Digite sua cidade"
                      />
                    </div>
                  </div>

                  {/* Botões Salvar e Cancelar */}
                  <div className="flex justify-end gap-4 mt-6">
                    <button className="px-6 py-2 text-[16px] text-white bg-[#B41F1F] rounded-md hover:bg-red-800">
                      Cancelar
                    </button>
                    <button className="px-6 py-2 text-[16px] text-white bg-[#46982B] rounded-md hover:bg-green-700">
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </Tabs.Item>

            <Tabs.Item
              active={selectedTab === "senha"}
              title="Atualizar Senha"
              onClick={() => setSelectedTab("senha")}
            >
              {/* Conteúdo da aba Atualizar Senha */}
              <div className="space-y-6">
                <div>
                  <label className="block text-[16px] font-medium text-gray-700">
                    Senha atual
                  </label>
                  <input
                    type="password"
                    className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                    placeholder="Digite sua senha atual"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-gray-700">
                    Nova senha
                  </label>
                  <input
                    type="password"
                    className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                    placeholder="Digite sua nova senha"
                  />
                </div>
                <div>
                  <label className="block text-[16px] font-medium text-gray-700">
                    Confirmar nova senha
                  </label>
                  <input
                    type="password"
                    className="form-input border border-gray-300 rounded-md p-3 w-full text-[16px]"
                    placeholder="Confirme sua nova senha"
                  />
                </div>
              </div>
            </Tabs.Item>

            <Tabs.Item
              active={selectedTab === "notificacao"}
              title="Notificação"
              onClick={() => setSelectedTab("notificacao")}
            >
              {/* Conteúdo da aba Notificação */}
              <p className="text-[16px] text-gray-700">
                Configurações de notificação em breve.
              </p>
            </Tabs.Item>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Perfil;