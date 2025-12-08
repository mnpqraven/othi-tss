import { Store } from "@tanstack/react-store";

export const sidebarStore = new Store({
  open: false,
});

export const cmdkStore = new Store({
  open: false,
});

export const cmdkStoreReducers = {
  setOpen: (open: boolean) =>
    cmdkStore.setState((state) => ({ ...state, open })),
  toggleOpen: () =>
    cmdkStore.setState((state) => ({ ...state, open: !state.open })),
};
