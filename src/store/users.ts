import { defineStore } from "pinia";
import { MOCK_USERS } from "./mockData.ts";

export interface User {
    id: number;
    name: string;
    photo: string;
    gender?: string;
    age?: number;
    friendCount?: number;
}

const LOCAL_STORAGE_KEY = "userStore";

interface UserStoreState {
    searchResults: User[];
    sourceList: User[];
    friends: User[];
    isLoading: boolean;
}

export const useUserStore = defineStore<"userStore", UserStoreState, {}, UserStoreActions>("userStore", {
    state: (): UserStoreState => {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        const parsedData = savedData ? JSON.parse(savedData) : {};

        return {
            searchResults: [] as User[],
            sourceList: (parsedData.sourceList || []) as User[],
            friends: (parsedData.friends || []) as User[],
            isLoading: false,
        };
    },

    actions: {
        mockFetchUsers(query: string): void {
            this.isLoading = true;
            setTimeout(() => {

                this.searchResults = MOCK_USERS
                    .filter((user: User) =>
                        !this.sourceList.some((addedUser) => addedUser.id === user.id) &&
                        user.name.toLowerCase().includes(query.toLowerCase())
                    );

                this.isLoading = false;
            }, 500);
        },

        addUser(user: User): void {
            if (!this.sourceList.find((u) => u.id === user.id)) {
                this.sourceList.push(user);
                this.saveToLocalStorage();
            }
        },

        removeUser(id: number): void {
            this.sourceList = this.sourceList.filter((user) => user.id !== id);
            this.saveToLocalStorage();
        },

        buildFriendList(): void {
            this.isLoading = true;
            setTimeout(() => {
                this.friends = [...this.sourceList]
                    .map((u) => ({
                        ...u,
                        age: Math.floor(Math.random() * 30) + 20,
                        friendCount: Math.floor(Math.random() * 300),
                    }))
                    .sort((a, b) => a.name.localeCompare(b.name));
                this.saveToLocalStorage();
                this.isLoading = false;
            }, 500);
        },

        saveToLocalStorage(): void {
            const dataToSave = {
                sourceList: this.sourceList,
                friends: this.friends,
            };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
        },

        getFullUserList() {
            this.searchResults = MOCK_USERS.filter(
                (user) => !this.sourceList.some((addedUser) => addedUser.id === user.id)
            );
        },
    },
});

interface UserStoreActions {
    mockFetchUsers(query: string): void;
    addUser(user: User): void;
    removeUser(id: number): void;
    buildFriendList(): void;
    saveToLocalStorage(): void;
    getFullUserList(): void;
}
