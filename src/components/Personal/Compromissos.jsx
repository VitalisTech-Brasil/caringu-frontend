export default function Compromissos() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="border rounded-lg p-6 flex flex-col items-center justify-center text-center col-span-2">
        <span className="text-4xl mb-2">🗓️</span>
        <p className="text-gray-500">
          Nenhum compromisso para hoje foi encontrado.
        </p>
      </div>
      <div className="border rounded-lg p-4">
        <h4 className="font-semibold mb-2">Esta Semana</h4>
        <div className="flex justify-between">
          {["dom", "seg", "ter", "qua", "qui", "sex", "sáb"].map((dia, i) => (
            <div
              key={dia}
              className={`flex flex-col items-center text-sm px-2 py-1 rounded ${
                dia === "qui"
                  ? "bg-orange-400 text-white"
                  : dia === "ter"
                  ? "bg-gray-200"
                  : ""
              }`}
            >
              <span className="font-semibold">{dia}</span>
              <span>{i + 2}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
