// Type
import { RootState } from "../store"


export const getMessages = (store: RootState) => store.dialogPage.messages
export const getUsers = (store: RootState) => store.dialogPage.users
