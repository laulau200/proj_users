import { useEffect, useState } from 'react';

const API_URL = '/api/users';

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // GET users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Impossible de récupérer les utilisateurs');
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Form input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // CREATE / UPDATE
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      setError('Le nom et l’email sont obligatoires.');
      return;
    }

    try {
      setSaving(true);
      setError('');

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Une erreur est survenue'
        );
      }

      if (editingId) {
        setUsers((current) =>
          current.map((user) =>
            user.id === editingId ? data : user
          )
        );
      } else {
        setUsers((current) => [...current, data]);
      }

      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // EDIT
  const handleEdit = (user) => {
    setEditingId(user.id);

    setForm({
      name: user.name || '',
      email: user.email || '',
    });

    setError('');
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Voulez-vous vraiment supprimer cet utilisateur ?'
    );

    if (!confirmed) {
      return;
    }

    try {
      setError('');

      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(
          data.error || 'Impossible de supprimer l’utilisateur'
        );
      }

      setUsers((current) =>
        current.filter((user) => user.id !== id)
      );

      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // RESET FORM
  const resetForm = () => {
    setForm({
      name: '',
      email: '',
    });

    setEditingId(null);
  };

  return (
    <main style={styles.container}>
      <h1>Utilisateurs</h1>

      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}

      <section style={styles.card}>
        <h2>
          {editingId
            ? 'Modifier l’utilisateur'
            : 'Ajouter un utilisateur'}
        </h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Nom"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <div style={styles.buttons}>
            <button type="submit" disabled={saving}>
              {saving
                ? 'Enregistrement...'
                : editingId
                  ? 'Modifier'
                  : 'Ajouter'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={styles.cancelButton}
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </section>

      <section style={styles.card}>
        <h2>Liste des utilisateurs</h2>

        {loading ? (
          <p>Chargement...</p>
        ) : users.length === 0 ? (
          <p>Aucun utilisateur trouvé.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                  <td>
                    <button
                      onClick={() => handleEdit(user)}
                      style={styles.editButton}
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => handleDelete(user.id)}
                      style={styles.deleteButton}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '40px 20px',
  },

  card: {
    background: '#fff',
    padding: '24px',
    marginBottom: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  buttons: {
    display: 'flex',
    gap: '10px',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  error: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
  },

  editButton: {
    marginRight: '8px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },

  deleteButton: {
    background: '#dc2626',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
  },

  cancelButton: {
    background: '#6b7280',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Users;

Important

This component assumes your Express server uses:

app.use('/api/users', userRoutes);


So the frontend calls:

GET    /api/users
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id


If your Prisma User model has additional required fields besides name and email, add those fields to the form as well.