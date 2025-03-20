import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Bear {
  id: number,
  name: string,
}

interface BearStore {
  //Properties
  blackBears: number,
  polarBears: number,
  pandaBears: number,

  bears: Bear[],

  //computed: {
  //  totalBears: number
  //},

  totalBears: () => number,
  //Actions
  increaseBlackBears: (by: number) => void
  increasePolarBears: (by: number) => void
  increasePandaBears: (by: number) => void

  doNothing: () => void
  addBear: () => void
  clearBears: () => void
}

export const useBearStore = create<BearStore> () (

  persist(
  
    (set, get) => ({
      blackBears: 10,
      polarBears: 5,
      pandaBears: 2,

      bears: [
        {id: 1, name: 'Oso # 1'}
      ],

      totalBears: () => {
        return get().blackBears + get().pandaBears + get().polarBears + get().bears.length;
      },

      //computed: {
      //  get totalBears(){
      //    return get().blackBears + get().pandaBears + get().polarBears + get().bears.length
      //  } 
      //},

      increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
      increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
      increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

      doNothing: () => set(state => ({bears: [...state.bears]})),
      addBear: () => set(state => ({
        bears: [...state.bears, {
          id: state.bears.length + 1,
          name: `Oso # ${state.bears.length + 1}`,
        }]
      })),
      clearBears: () => set({bears: []}),
      //removeAllBears: () => set({ bears: 0 }),
      //updateBears: (newBears) => set({ bears: newBears }),
    }),
    {
      name: "bears-store"
    }
  )
);



/*export const useBearStore = create<BearStore> () ((set, get) => ({
  blackBears: 10,
  polarBears: 0,
  pandaBears: 0,

  bears: [
    {id: 1, name: 'Oso # 1'}
  ],

  computed: {
    get totalBears(){
      return get().blackBears + get().pandaBears + get().polarBears + get().bears.length
    } 
  },

  increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

  doNothing: () => set(state => ({bears: [...state.bears]})),
  addBear: () => set(state => ({
    bears: [...state.bears, {
      id: state.bears.length + 1,
      name: `Oso # ${state.bears.length + 1}`,
    }]
  })),
  clearBears: () => set({bears: []}),
  //removeAllBears: () => set({ bears: 0 }),
  //updateBears: (newBears) => set({ bears: newBears }),
}))*/


