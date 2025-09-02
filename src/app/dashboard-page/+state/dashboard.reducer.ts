import { createReducer, on, ActionReducer, createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardPageActions, DashboardApiActions } from './dashboard.actions'; // Added DashboardApiActions
import { toKebabCase } from '../../utils';
import { Dashboard, Tab, Card, CardItem } from '../../models'; // Added Tab, Card, CardItem

// Definiowanie stanu
export interface DashboardState {
  selectedDashboard: Dashboard | null;
  dashboardSnapshot: Dashboard | null; // Added for discard functionality
}

// Początkowy stan
export const initialState: DashboardState = {
  selectedDashboard: null,
  dashboardSnapshot: null, // Initialize snapshot
};

// Feature key
export const dashboardFeatureKey = 'dashboard';

// Tworzenie reduktora
export const dashboardReducer = createReducer(
  initialState,

  // Existing on functions
  on(DashboardPageActions.removeTab, (state, { tabId }) => {
    if (!state.selectedDashboard) {
      return state;
    }

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.filter((tab) => tab.id !== tabId),
      },
    };
  }),

  on(DashboardPageActions.renameTab, (state, { tabId, newTitle }) => {
    if (!state.selectedDashboard) {
      return state;
    }

    const updatedTabs = state.selectedDashboard.tabs.map((tab) => {
      if (tab.id === tabId) {
        return {
          ...tab,
          title: newTitle,
          id: toKebabCase(newTitle),
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

  on(DashboardPageActions.reorderTab, (state, { tabId, direction }) => {
    if (!state.selectedDashboard) {
      return state;
    }

    const tabs = [...state.selectedDashboard.tabs];
    const index = tabs.findIndex((tab) => tab.id === tabId);

    if (index === -1) {
      return state;
    }

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

  // New reducer logic starts here

  on(DashboardApiActions.loadDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
  })),

  on(DashboardApiActions.saveDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
    dashboardSnapshot: null, // Clear snapshot after successful save
  })),

  on(DashboardApiActions.createDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
  })),

  on(DashboardApiActions.deleteDashboardSuccess, (state) => ({
    ...state,
    selectedDashboard: null,
    dashboardSnapshot: null,
  })),

  on(DashboardPageActions.enterEditMode, (state) => ({
    ...state,
    dashboardSnapshot: state.selectedDashboard ? JSON.parse(JSON.stringify(state.selectedDashboard)) : null, // Deep copy
  })),

  on(DashboardPageActions.discardChanges, (state) => ({
    ...state,
    selectedDashboard: state.dashboardSnapshot,
    dashboardSnapshot: null, // Clear snapshot after discard
  })),

  on(DashboardPageActions.addTab, (state, { title }) => {
    if (!state.selectedDashboard) {
      return state;
    }
    const newTab: Tab = {
      id: toKebabCase(title),
      title: title,
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

  on(DashboardPageActions.addCard, (state, { tabId, layout }) => {
    if (!state.selectedDashboard) {
      return state;
    }
    const newCard: Card = {
      id: Date.now().toString(), // Simple unique ID for now
      title: '',
      layout: layout,
      items: [],
    };
    const updatedTabs = state.selectedDashboard.tabs.map((tab) => {
      if (tab.id === tabId) {
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
    if (!state.selectedDashboard) {
      return state;
    }
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
    if (!state.selectedDashboard) {
      return state;
    }
    const updatedTabs = state.selectedDashboard.tabs.map((tab) => {
      if (tab.id === tabId) {
        const cards = [...tab.cards];
        const cardToMove = cards.find((card) => card.id === cardId);
        if (cardToMove) {
          const oldIndex = cards.indexOf(cardToMove);
          cards.splice(oldIndex, 1);
          cards.splice(newIndex, 0, cardToMove);
        }
        return {
          ...tab,
          cards: cards,
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
    if (!state.selectedDashboard) {
      return state;
    }
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
    if (!state.selectedDashboard) {
      return state;
    }
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

  on(DashboardApiActions.toggleDeviceStateSuccess, (state, { deviceId, newState }) => {
    if (!state.selectedDashboard) {
      return state;
    }
    const updatedDashboard = JSON.parse(JSON.stringify(state.selectedDashboard)); // Deep copy to modify nested state
    updatedDashboard.tabs.forEach((tab: Tab) => {
      tab.cards.forEach((card: Card) => {
        card.items.forEach((item: CardItem) => {
          if (item.type === 'device' && item.id === deviceId) {
            item.state = newState;
          }
        });
      });
    });
    return {
      ...state,
      selectedDashboard: updatedDashboard,
    };
  }),

  on(DashboardApiActions.toggleDeviceStateFailure, (state, { deviceId, oldState }) => {
    if (!state.selectedDashboard) {
      return state;
    }
    const updatedDashboard = JSON.parse(JSON.stringify(state.selectedDashboard)); // Deep copy to modify nested state
    updatedDashboard.tabs.forEach((tab: Tab) => {
      tab.cards.forEach((card: Card) => {
        card.items.forEach((item: CardItem) => {
          if (item.type === 'device' && item.id === deviceId) {
            item.state = oldState;
          }
        });
      });
    });
    return {
      ...state,
      selectedDashboard: updatedDashboard,
    };
  })
);

// Selectors
export const selectDashboardState = createFeatureSelector<DashboardState>(dashboardFeatureKey);

export const selectSelectedDashboard = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.selectedDashboard
);

export const selectIsEditing = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.dashboardSnapshot !== null
);