import {removeChannel} from "./userSettingService";

export function userEventListner(){
    $(document).on('click', '.removeChannel', function (e) {
        e.preventDefault;
        const channelID = $(this).parents('span').data('channelid');
        const teamID = $(this).parents('span').data('teamid');
        removeChannel(channelID, teamID);
        $(this).parents('li').remove();
      });
}