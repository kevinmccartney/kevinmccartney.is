import { AppStoreState } from 'modules/core/models';

export const saveState = (state: AppStoreState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};
