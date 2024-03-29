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

  it('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const title = await screen.findByRole('heading', { name: /rick sanchez/i, level: 3 });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputText = screen.getByRole('textbox');

    expect(inputText).toBeInTheDocument();
    expect(inputText).toHaveProperty('placeholder', 'Rick Sanches...');

    const button = screen.getByRole('button', { name: /buscar/i });

    expect(button).toHaveProperty('type', 'button');
    expect(button).toBeInTheDocument();
  });

  it('Verifica se ao buscar por "Smith" aparecem apenas 4 cards', async () => {
    const button = screen.getByRole('button', { name: /buscar/i });
    const inputText = screen.getByRole('textbox');

    userEvent.type(inputText, 'Smith');
    userEvent.click(button);

    expect(inputText.value).toBe('Smith');

    const article = await screen.findAllByRole('article');
    expect(article).toHaveLength(4);
  });

  it('Verifica se ao buscar por "Smith" é retornado o resultado esperado', async () => {
    const button = screen.getByRole('button', { name: /buscar/i });
    const inputText = screen.getByRole('textbox');

    userEvent.type(inputText, 'Smith');
    userEvent.click(button);

    const mortySmith = await screen.findByText('Morty Smith');
    expect(mortySmith).toBeInTheDocument();

    const summerSmith = await screen.findByText('Summer Smith');
    expect(summerSmith).toBeInTheDocument();

    const bethSmith = await screen.findByText('Beth Smith');
    expect(bethSmith).toBeInTheDocument();

    const jerrySmith = await screen.findByText('Jerry Smith');
    expect(jerrySmith).toBeInTheDocument();
  });
});
