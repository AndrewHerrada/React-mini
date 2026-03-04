interface Props {
  message: string;
}

export function ErrorMessage({ message }: Props) {
  return (
    <div className="error-state" role="alert">
      <span className="error-icon" aria-hidden="true">
        ⚠️
      </span>
      <p className="error-message">{message}</p>
    </div>
  );
}
