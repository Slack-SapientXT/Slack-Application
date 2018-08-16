import { fnCreateChannel } from "./adminSettingService";

export function userEventListner(){
    document.getElementById('createChannel1').addEventListener('click', fnCreateChannel);
}