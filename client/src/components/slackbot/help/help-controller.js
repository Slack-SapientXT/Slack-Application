import { openHelpView, openHelpViewList } from './help-view';
// function to open help modal
export const openHelp = function () {
    const createWidgetEle = document.getElementById('messageBody');
    const newRepowidget = document.createElement('div');
    newRepowidget.innerHTML = openHelpView();
    createWidgetEle.appendChild(newRepowidget);

    //to remove old calendar value from modal                
    var oldDOMcalendarlist = document.getElementById('helpElementsItem');
    while(oldDOMcalendarlist.firstChild){
      oldDOMcalendarlist.removeChild(oldDOMcalendarlist.firstChild);
    }

    const calendarlistElementsItem = document.getElementById('helpElementsItem');
    const newCalendarlistItem = document.createElement('div');
    newCalendarlistItem.innerHTML = openHelpViewList();
    calendarlistElementsItem.appendChild(newCalendarlistItem);
    $('#helpModal').modal('show'); 
};