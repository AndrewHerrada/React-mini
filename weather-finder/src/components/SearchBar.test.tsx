import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders input and button', () => {
    render(<SearchBar onSearch={vi.fn()} isLoading={false} />);
    expect(screen.getByRole('textbox', { name: /ciudad/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /buscar ciudad/i })).toBeInTheDocument();
  });

  it('calls onSearch with trimmed value on submit', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} isLoading={false} />);

    await userEvent.type(screen.getByRole('textbox'), '  Madrid  ');
    await userEvent.click(screen.getByRole('button'));

    expect(onSearch).toHaveBeenCalledWith('Madrid');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('does not call onSearch when input is empty', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} isLoading={false} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onSearch).not.toHaveBeenCalled();
  });

  it('disables input and button while loading', () => {
    render(<SearchBar onSearch={vi.fn()} isLoading={true} />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows "Buscando…" text while loading', () => {
    render(<SearchBar onSearch={vi.fn()} isLoading={true} />);
    expect(screen.getByRole('button')).toHaveTextContent('Buscando…');
  });

  it('pre-fills input with initialValue', () => {
    render(<SearchBar onSearch={vi.fn()} isLoading={false} initialValue="Buenos Aires" />);
    expect(screen.getByRole('textbox')).toHaveValue('Buenos Aires');
  });

  it('submits on Enter key press', async () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} isLoading={false} />);

    await userEvent.type(screen.getByRole('textbox'), 'Paris{Enter}');

    expect(onSearch).toHaveBeenCalledWith('Paris');
  });
});
