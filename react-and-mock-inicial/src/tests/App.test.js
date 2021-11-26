import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI),
    });

    render(<App />);
  });

  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const title = await screen.findByRole('heading', { name: /rick sanchez/i, level: 3 });
    expect(title).toBeInTheDocument();
  });

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {});

  test('Verifica se ao buscar por "Smith" aparecem apenas 4 cards', async () => {});
});
