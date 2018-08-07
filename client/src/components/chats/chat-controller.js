export const ADD_CHAT = 'ADD_CHAT';
import { hitEnter } from '../slackbot/command-line';

//action creators
export function addChatToStore(message, currentDateTime, sentBy) {
    return {
        type: ADD_CHAT,
        message,
        currentDateTime,
        sentBy
    }
}

$("#enteredCommand").emojioneArea({
    inline: false,
    events: {
        keypress: function (editor, event) {
            if (event.which == 13) {
                event.preventDefault();
                var enteredValue = $('#enteredCommand').data("emojioneArea").getText();;
                hitEnter(enteredValue);
            }
        }
    }
});
