const rp = require('request-promise');

rp('http://www.google.com')
.then(function (htmlString) {
console.log(htmlString +  " the result google")
})
.catch(function (err) {
console.log(err +  " the result err ")
});

var SDK = lpTag.agentSDK || {};
$(function() {
    SDK.init({
        notificationCallback: getLogFunction('INFO', 'Notification received!'),
        visitorFocusedCallback: getLogFunction('INFO', 'Visitor Focused received!'),
        visitorBlurredCallback: getLogFunction('INFO', 'Visitor Blurred received!')
    });
});

var userSelections;

function setUserSelections(firstChoice, secondChoice, thirdChoice){
    userSelections = {
        "firstChoice" : firstChoice,
        "secondChoice" : secondChoice,
        "thirdChoice" : thirdChoice
    }

    return console.log("Variables assigned");
}

function getUserSelections(){
    return userSelections;
}

function selection() {
    var firstChoice = $('.dropDown1').val();
    var secondChoice = $('.dropDown2').val();
    var thirdChoice = $('.dropDown3').val();
    setUserSelections(firstChoice, secondChoice, thirdChoice);
    $(".agentChoice").html(JSON.stringify(getUserSelections()));

}


function getLogFunction(type, message){
    return function(data) {
        if (typeof data === 'object') {
            data = JSON.stringify(data, null, 2);
        }
        logger(type, message + ' The ' + type + ' data: ' + data);
    }
}

function bindUser() {
    var bindId = "visitorInfo";
    SDK.bind(bindId, processData, createCallback('Bind'));
}
function processData(data) {
    var visitorId = JSON.stringify(data.newValue.visitorId);
    var visitorDevice = JSON.stringify(data.newValue.device);
    var visitorOS = JSON.stringify(data.newValue.operatingSystem);
    var OS = visitorOS.split(" ")[0].replace(/['"]+/g, '');
    console.log(OS);
    // var userOS = visitorOS.replace(/['"]+/g, '').toLower();
    // var userOS = visitorOS.length;
    $(".userId").html("Visitor ID: " + visitorId);
    $(".userDevice").html(visitorDevice);
    $(".userOS").html(visitorOS);
    // var userOS = visitorOS.replace(/['"]+/g, '').split(" ")[0].toLower();
    // var userOS = visitorOS.split(" ")[0].toLower();
    
    console.log("USER OS: " + OS + " " + visitorOS.length);

    //for some reason having the variable "userOS" or the method .toLower, broke the function at the point where either of these were... WTF
    if(OS === "Windows" || OS === "WINDOWS") {
        //.userOS button goes blue
        $(".userOS").css({"background-color":"blue"});
    }
    else if(OS === "ANDROID"){
        //.userOS button goes green
        $(".userOS").css({'background-color' : 'green'});
    }
    else if(OS === "OSX"){
        $('.userOS').css({"background-color" : "white"});
    }
    getLogFunction('INFO', 'bind success!')(data);
}
{"ass"}
// function writeCommand() {
//     var commandVal = $(".commandInput").val();
//     SDK.command('Write ChatLine',{text:commandVal}, createCallback('Write'));
// }

//the below selects the element with class "getInput" and takes its 'value'
function get() {
    var getKey = $(".getInput").val();
    SDK.get(getKey, getSuccess, getLogFunction('ERROR', 'Error in get!'));
}
function bind() {
    var bindKey = $(".bindInput").val();
    SDK.bind(bindKey, bindSuccess, createCallback('Bind'));
}
function unbind() {
    clearLogger();
    var bindKey = $(".bindInput").val();
    SDK.unbind(bindKey, bindSuccess, createCallback('Unbind'));
}

function createCallback(name) {
    return function(error) {
        if (error) {
            getLogFunction('ERROR', 'Error in ' + name + '!')(error);
        } else {
            getLogFunction('INFO', name + ' success!')();
        }
    }
}

function getSuccess(data){
    //the below selects an element and adds text by using the .html command
    $(".getResults").html(JSON.stringify(data));
    getLogFunction('INFO', 'Get success!')(data);
}
function bindSuccess(data){
    $(".bindResults").html(JSON.stringify(data));
    getLogFunction('INFO', 'Bind success!')(data);
}

function logger(type, text){
    if (typeof text === 'object') {
        text = JSON.stringify(text, null, 2);
    }
    var area = $(".logBox textarea");
    area.val(new Date().toTimeString() + ":  " + type + " - " + text + '\n' + area.val());
}
