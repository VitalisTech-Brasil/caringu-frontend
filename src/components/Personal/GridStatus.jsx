import Card from "./Cards"; // Atualizado para corresponder ao nome do arquivo

export default function GridStatus() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card
        title="Alunos ativos"
        count={2}
        desc="Total de alunos com planos ativos."
        color="bg-gray-100"
        icon="👥"
      />
      <Card
        title="Treinos criados"
        count={40}
        desc="Treinos cadastrados no sistema para os alunos."
        color="bg-green-100"
        icon="🏋️"
      />
      <Card
        title="Alunos aguardando treino"
        count={1}
        desc="Alunos aguardando criação de treino ou atualização de ficha."
        color="bg-orange-100"
        icon="⏱️"
      />
      <Card
        title="Anamneses pendentes"
        count={1}
        desc="Alunos cadastrados que estão com anamnese incompleta."
        color="bg-yellow-100"
        icon="📋"
      />
    </section>
  );
}
