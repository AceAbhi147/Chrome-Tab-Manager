chrome.browserAction.onClicked.addListener(function () { //Fired when User Clicks ICON
    console.log(clickedData)
    $("#start").click(function () {
        var start = new Date;
        setInterval(function () {
            $('#timer').text(Math.round((new Date - start) / 1000, 0) + " Seconds");
        }, 1000);
    })

    var arrayVariable = [];
    chrome.tabs.query({ active: false, currentWindow: true }, function (tabs) {
        for (var i = 0; i < tabs.length; ++i) {
            arrayVariable.push({
                'title': tabs[i].title,
                'url': tabs[i].url,
                'positionedAt': i + 1
            })
        }

        // $.each(arrayVariable, function (index,  value) {
        // $('<div />', {
        //     'text': '<p>'+value.title+'</p>'
        // }).appendTo('body');
        // });
        parentElement = document.getElementById('tabs');
        for (var i = 0; i < arrayVariable.length; ++i) {
            pEle = document.createElement('p');
            appendPEle = parentElement.appendChild(pEle)

            titleDivEle = document.createElement('div')
            appTitleDivEle = appendPEle.appendChild(titleDivEle)
            appTitleDivEle.innerHTML = "<span>Title: </span>" + arrayVariable[i].title

            urlDivEle = document.createElement('div')
            appUrlDivEle = appendPEle.appendChild(urlDivEle)
            appUrlDivEle.innerHTML = "<span>URL: </span>" + arrayVariable[i].url
        }
    })
});

let timerID;
let timerTime;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.cmd === 'START_TIMER') {
        timerTime = new Date(request.when);
        timerID = setTimeout(() => {
            // the time is app, alert the user.
        }, timerTime.getTime() - Date.now());
    } else if (request.cmd === 'GET_TIME') {
        sendResponse({ time: timerTime });
    }
});