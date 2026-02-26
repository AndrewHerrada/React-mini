export function LoadingSpinner() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>Obteniendo información del clima…</p>
    </div>
  );
}
