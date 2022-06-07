import { writable } from 'svelte/store';

export const defaultUser = {
    isLoading: false,
    isAuthenticated: false,
}

export const defaultChatRoomsSocket = {
    isSet: false,
    socket: null
}

export const defaultChatRoomSocket = {
    isSet: false,
    socket: null
}

export const user = writable(defaultUser);

export const chatRoomSocket = writable(defaultChatRoomsSocket)

export const chatRoomsSocket = writable(defaultChatRoomsSocket)