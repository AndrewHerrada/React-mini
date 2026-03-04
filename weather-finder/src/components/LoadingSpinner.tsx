export function LoadingSpinner() {
  return (
    <output className="loading-state" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>Obteniendo información del clima…</p>
    </output>
  );
}
