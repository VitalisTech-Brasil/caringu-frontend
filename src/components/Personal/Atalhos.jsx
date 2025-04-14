import Shortcut from "./Atalhos";

export default function Atalhos() {
  return (
    <section className="border rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-4">Atalhos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Shortcut icon="👤" label="Adicionar Aluno" />
        <Shortcut icon="➕" label="Adicionar Treino" />
        <Shortcut icon="📊" label="Acessar Relatório" />
        <Shortcut icon="💬" label="Responder Feedbacks" />
      </div>
    </section>
  );
}
