import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import {
  getUsers,
  getEvents,
  getTrainings,
} from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    events: 0,
    trainings: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [users, events, trainings] = await Promise.all([
          getUsers(),
          getEvents(),
          getTrainings(),
        ]);

        setStats({
          users: users.length,
          events: events.length,
          trainings: trainings.length,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Bienvenue sur votre espace de gestion.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Utilisateurs"
          value={loading ? '...' : stats.users}
          icon="👥"
          color="blue"
        />

        <StatCard
          title="Événements"
          value={loading ? '...' : stats.events}
          icon="📅"
          color="purple"
        />

        <StatCard
          title="Formations"
          value={loading ? '...' : stats.trainings}
          icon="🎓"
          color="green"
        />
      </div>

      <div className="dashboard-card">
        <h2>Bienvenue 👋</h2>

        <p>
          Utilisez le menu à gauche pour gérer les utilisateurs,
          événements et formations.
        </p>
      </div>
    </div>
  );
}