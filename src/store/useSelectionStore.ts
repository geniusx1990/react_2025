import { create } from 'zustand';

export interface SelectedItem {
  id: string;
  name: string;
  description: string;
  detailsUrl: string;
  height?: number;
  weight?: number;
  types?: string[];
}

interface SelectionState {
  selected: Record<string, SelectedItem>;
  toggleItem: (item: SelectedItem) => void;
  unselectAll: () => void;
  isSelected: (id: string) => boolean;
  getSelectedArray: () => SelectedItem[];
  getSelectedCount: () => number;
  updateItemDetails: (id: string, details: Partial<SelectedItem>) => void;
}

export const useSelectionStore = create<SelectionState>((set, get) => ({
  selected: {},

  toggleItem: (item) =>
    set((state) => {
      const rest = Object.fromEntries(
        Object.entries(state.selected).filter(([key]) => key !== item.id)
      );

      return {
        selected: state.selected[item.id]
          ? rest
          : { ...state.selected, [item.id]: item },
      };
    }),

  unselectAll: () => set({ selected: {} }),

  isSelected: (id) => !!get().selected[id],

  getSelectedArray: () => Object.values(get().selected),

  getSelectedCount: () => Object.keys(get().selected).length,

  updateItemDetails: (id, details) =>
    set((state) => {
      const existing = state.selected[id];
      if (!existing) return {};
      return {
        selected: {
          ...state.selected,
          [id]: {
            ...existing,
            ...details,
          },
        },
      };
    }),
}));
