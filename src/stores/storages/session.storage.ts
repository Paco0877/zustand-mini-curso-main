import { createJSONStorage, StateStorage } from "zustand/middleware";

const StorageApi: StateStorage = {
  getItem: function (name: string): string | null | Promise<string | null> {
    //console.log('getItem', name);
    //return null;
    const data = sessionStorage.getItem(name);
    return data;
  },

  setItem: function (name: string, value: string): void | Promise<void> {
    //console.log('setItem', {name, value});
    sessionStorage.setItem(name, value);
  },

  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', name); 
  }
}

export const customSessionStorage = createJSONStorage( () => StorageApi )