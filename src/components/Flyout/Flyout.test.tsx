import { render, screen, fireEvent } from '@testing-library/react';
import Flyout from './Flyout';
import { useSelectionStore } from '../../store/useSelectionStore';
import { downloadItemsAsCSV } from '../../utils/downloadItemsAsCSV';

jest.mock('../../store/useSelectionStore', () => ({
  useSelectionStore: jest.fn(),
}));

jest.mock('../../utils/downloadItemsAsCSV', () => ({
  downloadItemsAsCSV: jest.fn(),
}));

const mockedStore = useSelectionStore as unknown as jest.Mock;
const mockedDownload = downloadItemsAsCSV as jest.Mock;

describe('Flyout component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.URL.createObjectURL = jest.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = jest.fn();
  });

  it('does not render when no items are selected', () => {
    mockedStore.mockReturnValue({
      getSelectedCount: () => 0,
      getSelectedArray: () => [],
      unselectAll: jest.fn(),
    });

    const { container } = render(<Flyout />);
    expect(container.firstChild).toBeNull();
  });

  it('renders Flyout and handles "Unselect all"', () => {
    const unselectAllMock = jest.fn();

    mockedStore.mockReturnValue({
      getSelectedCount: () => 2,
      getSelectedArray: () => [
        {
          id: '1',
          name: 'Bulbasaur',
          description: 'Seed Pokémon',
          detailsUrl: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
          id: '2',
          name: 'Ivysaur',
          description: 'Seed Pokémon',
          detailsUrl: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
      ],
      unselectAll: unselectAllMock,
    });

    render(<Flyout />);

    expect(screen.getByText('2 items selected')).toBeInTheDocument();

    const unselectButton = screen.getByRole('button', {
      name: /unselect all/i,
    });
    fireEvent.click(unselectButton);

    expect(unselectAllMock).toHaveBeenCalledTimes(1);
  });

  it('calls downloadItemsAsCSV when "Download" is clicked', () => {
    const items = [
      {
        id: '25',
        name: 'Pikachu',
        description: 'Electric mouse',
        detailsUrl: 'https://pokeapi.co/api/v2/pokemon/25/',
      },
    ];

    mockedStore.mockReturnValue({
      getSelectedCount: () => 1,
      getSelectedArray: () => items,
      unselectAll: jest.fn(),
    });

    render(<Flyout />);

    const downloadButton = screen.getByRole('button', { name: /download/i });
    fireEvent.click(downloadButton);

    expect(mockedDownload).toHaveBeenCalledWith(items);
  });
});
