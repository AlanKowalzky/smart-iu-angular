import { createFeature, createReducer, on } from '@ngrx/store';
import { Dashboard, Tab, Card, CardItem, Device } from '../../models';
import { DashboardApiActions, DashboardPageActions } from './dashboard.actions';

export interface DashboardState {
  selectedDashboard: Dashboard | null;
  originalDashboard: Dashboard | null; // Snapshot for discard functionality
  isEditing: boolean;
  isLoading: boolean;
  error: any | null;
}

export const initialState: DashboardState = {
  selectedDashboard: null,
  originalDashboard: null,
  isEditing: false,
  isLoading: false,
  error: null,
};

// Helper function to convert string to kebab-case
function toKebabCase(str: string): string {
  return str.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

export const dashboardFeature = createFeature({
  name: 'dashboard',
  reducer: createReducer(
    initialState,
    on(DashboardPageActions.loadDashboard, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(DashboardApiActions.loadDashboardSuccess, (state, { dashboard }) => ({
      ...state,
      isLoading: false,
      selectedDashboard: dashboard,
    })),
    on(DashboardApiActions.loadDashboardFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
    on(DashboardPageActions.enterEditMode, (state) => ({
      ...state,
      isEditing: true,
      originalDashboard: state.selectedDashboard ? JSON.parse(JSON.stringify(state.selectedDashboard)) : null, // Deep copy
    })),
    on(DashboardPageActions.exitEditMode, (state) => ({
      ...state,
      isEditing: false,
      originalDashboard: null, // Clear snapshot
    })),
    on(DashboardPageActions.discardChanges, (state) => ({
      ...state,
      selectedDashboard: state.originalDashboard, // Revert from snapshot
    })),
    on(DashboardPageActions.saveDashboard, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(DashboardApiActions.saveDashboardSuccess, (state, { dashboard }) => ({
        ...state,
        isLoading: false,
        selectedDashboard: dashboard,
    })),
    on(DashboardApiActions.saveDashboardFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
    })),
    on(DashboardPageActions.addTab, (state, { title }) => {
      if (!state.selectedDashboard) return state;

      const newTab: Tab = {
        id: toKebabCase(title),
        title,
        cards: [],
      };

      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          tabs: [...state.selectedDashboard.tabs, newTab],
        },
      };
    }),
    on(DashboardPageActions.removeTab, (state, { tabId }) => {
      if (!state.selectedDashboard) return state;

      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          tabs: state.selectedDashboard.tabs.filter((tab) => tab.id !== tabId),
        },
      };
    }),
    on(DashboardPageActions.reorderTab, (state, { tabId, direction }) => {
      if (!state.selectedDashboard) return state;

      const tabs = [...state.selectedDashboard.tabs];
      const index = tabs.findIndex((tab) => tab.id === tabId);

      if (index === -1) return state;

      if (direction === 'left' && index > 0) {
        [tabs[index - 1], tabs[index]] = [tabs[index], tabs[index - 1]];
      } else if (direction === 'right' && index < tabs.length - 1) {
        [tabs[index + 1], tabs[index]] = [tabs[index], tabs[index + 1]];
      }

      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          tabs,
        },
      };
    }),
    on(DashboardPageActions.addCard, (state, { tabId, layout }) => {
      if (!state.selectedDashboard) return state;

      const updatedTabs = state.selectedDashboard.tabs.map((tab) => {
        if (tab.id === tabId) {
          const newCard: Card = {
            id: `card-${Date.now()}`, // Simple ID for now
            title: '',
            layout,
            items: [],
          };
          return {
            ...tab,
            cards: [...tab.cards, newCard],
          };
        }
        return tab;
      });

      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          tabs: updatedTabs,
        },
      };
    }),
    on(DashboardPageActions.removeCard, (state, { tabId, cardId }) => {
      if (!state.selectedDashboard) return state;

      const updatedTabs = state.selectedDashboard.tabs.map((tab) => {
        if (tab.id === tabId) {
          return {
            ...tab,
            cards: tab.cards.filter((card) => card.id !== cardId),
          };
        }
        return tab;
      });

      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          tabs: updatedTabs,
        },
      };
    }),
    on(DashboardPageActions.reorderCard, (state, { tabId, cardId, newIndex }) => {
      if (!state.selectedDashboard) return state;

      const updatedTabs = state.selectedDashboard.tabs.map((tab) => {
        if (tab.id === tabId) {
          const cards = [...tab.cards];
          const cardToMove = cards.find((card) => card.id === cardId);

          if (!cardToMove) return tab;

          const currentIndex = cards.indexOf(cardToMove);
          cards.splice(currentIndex, 1);
          cards.splice(newIndex, 0, cardToMove);

          return {
            ...tab,
            cards,
          };
        }
        return tab;
      });

      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          tabs: updatedTabs,
        },
      };
    }),
    on(DashboardPageActions.addItemToCard, (state, { tabId, cardId, item }) => {
      if (!state.selectedDashboard) return state;

      const updatedTabs = state.selectedDashboard.tabs.map((tab) => {
        if (tab.id === tabId) {
          const updatedCards = tab.cards.map((card) => {
            if (card.id === cardId) {
              return {
                ...card,
                items: [...card.items, item],
              };
            }
            return card;
          });
          return {
            ...tab,
            cards: updatedCards,
          };
        }
        return tab;
      });

      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          tabs: updatedTabs,
        },
      };
    }),
    on(DashboardPageActions.removeItemFromCard, (state, { tabId, cardId, itemId }) => {
      if (!state.selectedDashboard) return state;

      const updatedTabs = state.selectedDashboard.tabs.map((tab) => {
        if (tab.id === tabId) {
          const updatedCards = tab.cards.map((card) => {
            if (card.id === cardId) {
              return {
                ...card,
                items: card.items.filter((item) => item.id !== itemId),
              };
            }
            return card;
          });
          return {
            ...tab,
            cards: updatedCards,
          };
        }
        return tab;
      });

      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          tabs: updatedTabs,
        },
      };
    }),
    on(DashboardPageActions.toggleDeviceState, (state, { deviceId, newState }) => {
      if (!state.selectedDashboard) return state;

      const updatedTabs = state.selectedDashboard.tabs.map((tab) => {
        const updatedCards = tab.cards.map((card) => {
          const updatedItems = card.items.map((item) => {
            if (item.type === 'device' && item.id === deviceId) {
              return { ...item, state: newState } as Device;
            }
            return item;
          });
          return {
            ...card,
            items: updatedItems,
          };
        });
        return {
          ...tab,
          cards: updatedCards,
        };
      });

      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          tabs: updatedTabs,
        },
      };
    }),
    on(DashboardApiActions.toggleDeviceStateSuccess, (state, { deviceId, newState }) => {
      if (!state.selectedDashboard) return state;

      const updatedTabs = state.selectedDashboard.tabs.map((tab) => {
        const updatedCards = tab.cards.map((card) => {
          const updatedItems = card.items.map((item) => {
            if (item.type === 'device' && item.id === deviceId) {
              return { ...item, state: newState } as Device;
            }
            return item;
          });
          return {
            ...card,
            items: updatedItems,
          };
        });
        return {
          ...tab,
          cards: updatedCards,
        };
      });

      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          tabs: updatedTabs,
        },
      };
    }),
    on(DashboardApiActions.toggleDeviceStateFailure, (state, { deviceId, oldState }) => {
      if (!state.selectedDashboard) return state;

      const updatedTabs = state.selectedDashboard.tabs.map((tab) => {
        const updatedCards = tab.cards.map((card) => {
          const updatedItems = card.items.map((item) => {
            if (item.type === 'device' && item.id === deviceId) {
              return { ...item, state: oldState } as Device;
            }
            return item;
          });
          return {
            ...card,
            items: updatedItems,
          };
        });
        return {
          ...tab,
          cards: updatedCards,
        };
      });

      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          tabs: updatedTabs,
        },
      };
    }),
  ),
});

export const {
    name,
    reducer,
    selectDashboardState,
    selectSelectedDashboard,
    selectIsEditing,
    selectIsLoading,
} = dashboardFeature;