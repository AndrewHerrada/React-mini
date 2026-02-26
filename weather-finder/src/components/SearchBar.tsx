import { useState, type FormEvent } from 'react';

interface Props {
  onSearch: (city: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

export function SearchBar({ onSearch, isLoading, initialValue = '' }: Props) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className="search-input"
        placeholder="Ingresa el nombre de una ciudad..."
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={isLoading}
        autoComplete="off"
        aria-label="Ciudad"
      />
      <button
        type="submit"
        className="search-button"
        disabled={isLoading || !value.trim()}
        aria-label="Buscar ciudad"
      >
        {isLoading ? 'Buscando…' : 'Buscar'}
      </button>
    </form>
  );
}
