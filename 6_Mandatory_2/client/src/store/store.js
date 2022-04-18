import { writable } from 'svelte/store';

export const defaultUser = {
    isLoading: true,
    isAuthenticated: false,
}

export const user = writable(defaultUser);