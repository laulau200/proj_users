export default function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  emptyMessage = 'Aucune donnée',
}) {
  if (!data.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📭</div>
        <h3>{emptyMessage}</h3>
        <p>Commencez par créer un nouvel élément.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render
                    ? column.render(item)
                    : item[column.key] ?? '-'}
                </td>
              ))}

              <td>
                <div className="actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => onEdit(item)}
                  >
                    Modifier
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(item)}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}