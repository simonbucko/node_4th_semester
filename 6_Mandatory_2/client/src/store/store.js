import { writable } from 'svelte/store';

export const defaultUser = {
    isLoading: false,
    isAuthenticated: false,
}

export const defaultChatRoomsSocket = {
    isSet: false
}

export const user = writable(defaultUser);

export const chatRoomsSocket = writable(defaultChatRoomsSocket)