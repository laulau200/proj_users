export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="stat-card">
      <div>
        <p className="stat-title">{title}</p>
        <h2>{value}</h2>
      </div>

      <div className={`stat-icon ${color}`}>
        {icon}
      </div>
    </div>
  );
}