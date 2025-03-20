import {create, type StateCreator} from "zustand";
import { devtools, persist } from "zustand/middleware";
//import { customSessionStorage } from "../storages/session.storage";
//import { firebaseStorage } from "../storages/firebase.storage";
//import { logger } from "../middlewares/logger.middleware";

interface PersonState {
  firstName: string,
  lastName: string,
}
interface ActionsPerson {
  setFirstName: ( value: string ) => void;
  setLastName: ( value: string ) => void;
}

const storeAPI: StateCreator<PersonState & ActionsPerson, [["zustand/devtools", never]]> =
  (set) => ({
    firstName: '',
    lastName: '',

    setFirstName: ( value: string ) => set( ({ firstName: value }), false, 'setFirstName'),
    //setFirstName: ( value: string ) => set( state => ({ firstName: value }), false, 'setFirstName'),
    setLastName: ( value: string ) => set( ({lastName: value}), false, 'setLastName' ),
    //setLastName: ( value: string ) => set( state => ({lastName: value}), false, 'setLastName' )
  })

export const usePersonStore = create<PersonState & ActionsPerson>()(
  
  devtools(
    persist(
      storeAPI,
      {
        name: 'person-store',
        //storage: customSessionStorage
        //storage: firebaseStorage
      }
    )
  )
  
);