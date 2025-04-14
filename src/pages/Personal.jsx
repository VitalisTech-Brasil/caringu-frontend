import Atalhos from "../components/Personal/Atalhos";
import Compromissos from "../components/Personal/Compromissos";
import StatusGrid from "../components/Personal/GridStatus";
import Header from "../components/Personal/Header";
import WelcomeSection from "../components/Personal/WelcomeSection";

export default function Personal() {
  return (
    <div className="min-h-screen bg-[#fdfaf3] p-6 space-y-6">
      <Header />
      <WelcomeSection />
      <StatusGrid />
      <Atalhos />
      <Compromissos />
    </div>
  );
}
