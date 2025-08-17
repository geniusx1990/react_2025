import { act } from 'react';
import { useSelectionStore } from './useSelectionStore';

describe('useSelectionStore', () => {
  beforeEach(() => {
    useSelectionStore.setState({ selected: {} });
  });

  it('toggles item selection', () => {
    const item = {
      id: '1',
      name: 'Pikachu',
      description: 'Electric',
      detailsUrl: 'url',
    };

    act(() => {
      useSelectionStore.getState().toggleItem(item);
    });

    expect(useSelectionStore.getState().selected['1']).toEqual(item);

    act(() => {
      useSelectionStore.getState().toggleItem(item);
    });

    expect(useSelectionStore.getState().selected['1']).toBeUndefined();
  });

  it('unselectAll clears selection', () => {
    const item = {
      id: '1',
      name: 'Bulbasaur',
      description: 'Grass',
      detailsUrl: 'url',
    };

    act(() => {
      useSelectionStore.getState().toggleItem(item);
      useSelectionStore.getState().unselectAll();
    });

    expect(useSelectionStore.getState().selected).toEqual({});
  });

  it('updates item details', () => {
    const item = {
      id: '2',
      name: 'Charmander',
      description: 'Fire',
      detailsUrl: 'url',
    };

    act(() => {
      useSelectionStore.getState().toggleItem(item);
      useSelectionStore.getState().updateItemDetails('2', {
        height: 6,
        types: ['fire'],
      });
    });

    const updated = useSelectionStore.getState().selected['2'];
    expect(updated.height).toBe(6);
    expect(updated.types).toEqual(['fire']);
    expect(updated.name).toBe('Charmander');
  });
});
