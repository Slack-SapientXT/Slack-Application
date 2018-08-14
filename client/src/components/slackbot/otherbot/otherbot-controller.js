import { updateSlackBotOtherbotResponse, 
      createOtherbotService,
      getAllTeamsService } from './otherbot-service';
import { otherbotCreateMsg } from './otherbot-view';
import { Email } from '../../onboarding/invitation/smtp';

// function to create otherbot
export const createOtherbot = function (widgetData) {
  const createWidgetEle = document.getElementById('messageBody');
  // calling service function to create otherbot in firebase database
  createOtherbotService(widgetData).then((firebaseOtherbotlistdRes) => {
    const errorOrSuccDiv = document.createElement('div');
    if (firebaseOtherbotlistdRes.id !== '') {

      getAllTeamsService().then( (teamList) => {
        var teamListArray = Object.keys(teamList);
        if (teamListArray.indexOf(firebaseOtherbotlistdRes.channelName) > -1) {
          // sending mail to recipient
          // const appUrl = window.location.href;
          // const redireURL = `${appUrl}?teamname=${firebaseOtherbotlistdRes.channelName}`;
          // const output = `<p>Please click on the below provided link to join Slack</p><br/><a href="${redireURL}">Join Slack</a>`;
          // Email.send('slackmailing@gmail.com',
          //   firebaseOtherbotlistdRes.targetUser,
          //   'Invitation to join slack',
          //   output,
          //   'smtp.gmail.com',
          //   'slackmailing@gmail.com',
          //   'Slack@246');

        const appUrl = window.location.href;

        const redireURL = `${appUrl}?teamname=${firebaseOtherbotlistdRes.channelName}`;// &useremail=${reciever}`;
        const output = `<div style="border: 6px solid #ccc;font-family:arial;box-sizing:border-box;width: 100%;margin: auto;">
        <div style="text-align:center;padding-top: 50px;"><img src="https://media.licdn.com/dms/image/C560BAQEYp_bjM8rH9w/company-logo_200_200/0?e=2159024400&v=beta&t=YN-rmUmfLXgy7WrKeZ-aDfePrC6cM3GNTQg_wybCpnk" alt="sapient-logo"/></div>
        <div style="padding-bottom: 120px;padding-left: 50px;padding-right: 50px;padding-top: 30px;"><h1 style="color: #bd1414;">Welcome to Sapient-Slack!</h1>
        <p>You’re added to new Sapient-Slack workspace <strong style="color:#0d73f1;font-size: 20px;">${firebaseOtherbotlistdRes.channelName}</strong>. Want to join the workspace??</p>
        <div><a style="border-top:13px solid; border-bottom:13px solid; border-right:24px solid; border-left:24px solid; border-color:#2ea664; border-radius:4px; background-color:#2ea664; color:#ffffff; font-size:18px; line-height:18px; word-break:break-word; display:inline-block; text-align:center; font-weight:900; text-decoration:none!important" href="${redireURL}">Yes Join!</a></div></div></div>`;
        Email.send('slackmailing@gmail.com',
        firebaseOtherbotlistdRes.targetUser,
          'Invitation to join Sapient-Slack',
          output,
          'smtp.gmail.com',
          'slackmailing@gmail.com',
          'Slack@246');





          const newRepowidget = document.createElement('div');
          newRepowidget.innerHTML = otherbotCreateMsg(
            `I have sent an acceptance request to (${widgetData.targetUser}).`,widgetData);
          createWidgetEle.appendChild(newRepowidget);
          createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
          // update firebase database with slackbot response for creating otherbot.
          updateSlackBotOtherbotResponse(widgetData,
            `I have sent an acceptance request to (${widgetData.targetUser}).`);
      } else {
        const newRepowidget = document.createElement('div');
        newRepowidget.innerHTML = otherbotCreateMsg(
          `Team (${firebaseOtherbotlistdRes.channelName}) does not exists.`, widgetData);
        createWidgetEle.appendChild(newRepowidget);
        createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
        // update firebase database with slackbot response for creating otherbot.
        updateSlackBotOtherbotResponse(widgetData,
          `Team (${firebaseOtherbotlistdRes.channelName}) does not exists.`);
      }
      });
      
    } else {
      errorOrSuccDiv.innerHTML = otherbotCreateMsg(
'Your request did not process due to technical issue, please try after some time.', widgetData);
      createWidgetEle.appendChild(errorOrSuccDiv);
      createWidgetEle.scrollTop = createWidgetEle.scrollHeight;
      // update firebase database with slackbot response for creating otherbot.
      updateSlackBotOtherbotResponse(widgetData,
        'Your request did not process due to technical issue, please try after some time.');
    }
  }).catch((err) => {
    console.log(err, 'Error occured while creating otherbot in firebase database..');
  });
};
