import firebase from 'firebase';
import viewHtml from './view';
import globallist from './controller';
import moment from 'moment';

export function getAllChannels(teamId) {
    const db = firebase.database().ref('teams/' + teamId + '/channels');
    db.on('value', (channelList) => {
        channelList.forEach((channelIndex) => {
            let flag = true;
            for (let i = 0; i < globallist[0].channels.length; i++) {
                if (globallist[0].channels[i].label === channelIndex.child('channelName').val())
                    flag = false;
            }
            if (flag === true) {
                let data = {
                    category: "channel",
                    label: channelIndex.child('channelName').val(),
                    channelId: channelIndex.key
                }
                globallist[0].channels.push(data);
                globallist[3].all.push(data);
            }
        });
    });
}

export function getAllUsers(teamId) {
    const db = firebase.database().ref('/teams/' + teamId + '/directMessages/users');
    db.on('value', (userList) => {
        userList.forEach((user) => {
            let flag = true;
            for (let i = 0; i < globallist[1].users.length; i++) {
                if (globallist[1].users[i].label == user.key)
                    flag = false;
            }
            if (flag == true) {
                let data = {
                    category: "people",
                    label: user.key
                }
                globallist[1].users.push(data);
                globallist[3].all.push(data);
            }
        });
    });
}

function getDirectMessages(teamId) {
    const users = firebase.database().ref('teams/' + teamId + '/directMessages/users');
    users.on('value', (snapshot) => {
        console.log("snapshot" + snapshot.val());
        const getAllUserIds = Object.values(snapshot.val());
        const abc = getAllUserIds.map((msgVal) => {
            Object.entries(msgVal).forEach(([key, value]) => {
                const msgsList = value;
                Object.entries(msgsList).forEach(([key, value]) => {
                    const msgData = value;
                    let message = msgData.messageText;
                    let sentOn=msgData.date;

                    let by = msgData.sentByUserName;
                    let byDis=msgData.sentByDisplayName;
                    if(byDis===null)
                        byDis=by;

                    let to = msgData.sentToUserName;
                    let toDis=msgData.sentToDisplayName;
                    if(toDis ===null)
                        toDis= to;
                    let flag = true;
                    for (let i = 0; i < globallist[2].messages.length; i++) {
                        if (globallist[2].messages[i].label === message &&
                            globallist[2].messages[i].sentby === byDis &&
                            globallist[2].messages[i].sentTo === toDis
                        )
                            flag = false;
                    }
                    if (flag == true) {
                        let data = {
                            category: "message",
                            label: message,
                            byUser:by,
                            sentBy: byDis,
                            toUser:to,
                            sentTo: to,
                            date:sentOn,
                            direct: true
                        }
                        globallist[2].messages.push(data);
                        globallist[3].all.push(data);
                    }
                });
            });
        });
    });
}

function getChannelMessages(teamId){
    const channelMsg = firebase.database().ref('teams/' + teamId + '/channels/');
    channelMsg.on('value',(channels)=>{
        channels.forEach((channel)=>{
            let messages = channel.child(`messages`);
            let name=channel.child('channelName').val();
            messages.forEach(message => {
                    let msg = message.val().messageText;
                    let sentOn=message.val().date;
                    let by = message.val().sentByUserName;

                    let byDis=message.val().sentByDisplayName;
                    if(byDis===null)
                        byDis=by;

                    let to = name;
                    console.log("to"+to);

                    let flag = true;
                    for (let i = 0; i < globallist[2].messages.length; i++) {
                        if (globallist[2].messages[i].label === msg &&
                            globallist[2].messages[i].sentBy === byDis &&
                            globallist[2].messages[i].sentTo === to
                        )
                            flag = false;
                    }
                    if (flag == true) {
                        let data = {
                            category: "message",
                            label: msg,
                            byUser:by,
                            sentBy: byDis,
                            sentTo: to,
                            date:sentOn,
                            direct: false
                        }
                        globallist[2].messages.push(data);
                        globallist[3].all.push(data);
                    }
            })
        })
    })
}


export function getAllMessages(teamId) {
    getDirectMessages(teamId);
    // getChannelMessages(teamId);
}

export function searchAllChannels(teamId) {
    const html = document.getElementById("searchResult");
    html.innerHTML = "";

    $(function () {
        $("#tags").autocomplete({
            minLength: 0,
            source: globallist[0].channels,
            appendTo: "#searchResult",
            focus: function (event, ui) {
                $("#tags").val(ui.item.value);
                return false;
            },
            select: function (event, ui) {
                $("#tags").val(ui.item.value);
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = { name: "", value: "No results found" };
                    ui.content.push(noResult);
                }
            }
        })
            .autocomplete("instance")._renderItem = function (ul, item) {
                return $(`<li class="list-group-item search-channels" data-teamid="${teamId}"  data-channelname="${item.label}" data-channelId="${item.channelId}">${item.value}</li>`)
                    .appendTo(ul);
            };
    });
}

export function searchAllUsers(teamId) {
    const html = document.getElementById("searchResult");
    html.innerHTML = "";

    $(function () {
        $("#tags").autocomplete({
            minLength: 0,
            source: globallist[1].users,
            appendTo: "#searchResult",
            focus: function (event, ui) {
                $("#tags").val(ui.item.value);
                return false;
            },
            select: function (event, ui) {
                $("#tags").val(ui.item.value);
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = { name: "", value: "No results found" };
                    ui.content.push(noResult);
                }
            }
        })
            .autocomplete("instance")._renderItem = function (ul, item) {
                return $(`<li class="list-group-item search-users" data-teamid="${teamId}" data-username="${item.label}">${item.value}</li>`)
                    .appendTo(ul);
            };
    });
}

export function searchAll(teamId) {
    const html = document.getElementById("searchResult");
    html.innerHTML = "";
    $(function () {
        $.widget("custom.catcomplete", $.ui.autocomplete, {
            _create: function () {
                this._super();
                this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
            },
            _renderItem: function (ul, item) {
                if (item.category === "message") {
                    return $(`<li class="searchMessage" data-teamid="${teamId}" data-message="${item.label}" data-sentBy="${item.sentBy}" data-sentTo="${item.to}" data-state="${item.direct}" data-date="${item.date}">`)
                        .attr("data-value", item.value)
                        .append(`<i id=sentTo>sentTo:${item.sentTo}</i>`)
                        .append(`<i id=sentBy>sentBy:${item.sentBy}</i><br>`)
                        .append(item.label)
                        .appendTo(ul);
                }
                else if (item.category === "people") {
                    return $(`<li class="search-users" data-teamid="${teamId}" data-username="${item.label}">`)
                        .attr("data-value", item.value)
                        .append(item.label)
                        .appendTo(ul);
                } else {
                    return $(`<li class="search-channels" data-teamid="${teamId}"  data-channelname="${item.label}" data-channelId="${item.channelId}">`)
                        .attr("data-value", item.value)
                        .append(item.label)
                        .appendTo(ul);
                }
            },
            _renderMenu: function (ul, items) {
                var that = this,
                    currentCategory = "";
                $.each(items, function (index, item) {
                    var li;
                    if (item.category != currentCategory) {
                        ul.append("<li class='ui-autocomplete-category'><strong>" + item.category + "</strong></li>");
                        currentCategory = item.category;
                    }
                    li = that._renderItemData(ul, item);
                    if (item.category) {
                        li.attr("aria-label", item.category + " : " + item.label);
                    }
                });
            }
        });
        $("#tags").catcomplete({
            minLength: 0,
            source: globallist[3].all,
            appendTo: "#searchResult",
            focus: function (event, ui) {
                $("#tags").val(ui.item.value);
                return false;
            },
            select: function (event, ui) {
                $("#tags").val(ui.item.value);
                return false;
            },
            response: function (event, ui) {
                if (!ui.content.length) {
                    var noResult = { name: "", label: "No results found" };
                    ui.content.push(noResult);
                }
            }
        });
    });
}

export function findMessage(date, sentBy, msg) {
    let chatBox = document.getElementById('messageBody');
    chatBox.innerHTML = '';
    const paraElement = document.createElement('p');
    const formattedTime = moment(date).fromNow();
    paraElement.innerHTML = `<strong>${sentBy}</strong> - ${formattedTime}<br>
                                ${msg}`;
    chatBox.appendChild(paraElement);
    chatBox.scrollTo(0, document.body.scrollHeight);
}