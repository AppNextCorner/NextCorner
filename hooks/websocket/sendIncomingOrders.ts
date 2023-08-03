import { websocket } from "hooks/handleUsers/useGetUserData"

export const sendNewOrder = (payload: any[]) => {
    websocket.send(JSON.stringify(payload));
}