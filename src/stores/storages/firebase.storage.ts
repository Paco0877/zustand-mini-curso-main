import { createJSONStorage, StateStorage } from "zustand/middleware";

const firebaseUrl = "https://zustand-storage-8f5dd-default-rtdb.firebaseio.com/zustand";

const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`)
        .then(resp => resp.json());
        //console.log('En el getItem ', data);
      return JSON.stringify(data);
    } catch (error) {
      console.log('Error en el getItem ',error)
      return null;
    }
  },

  setItem: async function (name: string, value: string): Promise<void>  {

    await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value
    }).then(resp => resp.json());
    //console.log('En el setItem ', data);
    return;

  },

  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', name); 
  }
}

export const firebaseStorage = createJSONStorage( () => storageApi )