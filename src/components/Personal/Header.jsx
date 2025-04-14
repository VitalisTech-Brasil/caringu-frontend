export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center space-x-2 text-xl font-semibold">
        <span className="text-2xl">🏠</span>
        <h1>Página Inicial</h1>
      </div>
      <span className="text-2xl">🔔</span>
    </header>
  );
}