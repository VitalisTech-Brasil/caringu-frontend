export default function Card({ title, count, desc, color, icon }) {
  return (
    <div
      className={`border rounded-lg p-4 flex justify-between items-center ${color}`}
    >
      <div>
        <h4 className="text-sm text-gray-600">{title}</h4>
        <p className="text-3xl font-bold">{count}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <div className="w-12 h-12 flex items-center justify-center rounded-full">
        <span className="text-xl">{icon}</span>
      </div>
    </div>
  );
}
