function Topbar({ title, onAdd }) {
  return (
    <header className="topbar">
      <h1 className="topbar-title">{title}</h1>

      <div className="topbar-actions">
        {onAdd && (
          <button className="add-btn" onClick={onAdd}>
            Добавить
          </button>
        )}
      </div>
    </header>
  )
}

export default Topbar
