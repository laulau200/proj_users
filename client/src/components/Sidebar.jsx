import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">G</div>

        <div>
          <strong>Gestion</strong>
          <span>Dashboard</span>
        </div>
      </div>

      <nav className="navigation">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          <span>📊</span>
          Dashboard
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          <span>👥</span>
          Utilisateurs
        </NavLink>

        <NavLink
          to="/events"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          <span>📅</span>
          Événements
        </NavLink>

        <NavLink
          to="/trainings"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          <span>🎓</span>
          Formations
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <span>API</span>
        <div className="api-status">
          <span className="status-dot"></span>
          Connectée
        </div>
      </div>
    </aside>
  );
}