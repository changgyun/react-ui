var g_uuidList=["101", "102", "103", "104",
    "201", "202", "203", "204",
    "301", "302", "303", "304",
    "401", "402", "403", "404",
    "501", "502", "503", "504"];

var g_settings = {
    warnEnable: true,
    warnBattery: 500,
    warnTemperature: 400,
    pingInterval: 10000,
    waitInterval: 5000,
    reconnectInterval: 5000
};

var playerStatus;

function objToSetting(settingObj) {
    $("input:checkbox[id='setting:warn']").prop("checked", settingObj.warnEnable);
    $("[id='setting:warn-battery']").val(settingObj.warnBattery);
    $("[id='setting:warn-temperature']").val(settingObj.warnTemperature);
    // TODO remaining setting items
}

function settingToObj(settingObj) {
    settingObj.warnEnable = !!$("input:checkbox[id='setting:warn']").is(":checked");
    settingObj.warnBattery = parseInt($("[id='setting:warn-battery']").val());
    settingObj.warnTemperature = parseInt($("[id='setting:warn-temperature']").val());

    // TODO remaining setting items
    return settingObj;
}

function initControls(){
    $("#play_btn").removeClass("disable");
    $("#stop_btn").addClass("disable");

    $("#play_btn").click(function(){
        $.ajax({
            url: "command/play",
            dataType: "json",
            type: "PUT",
            data: {},
            success: function(result) {
            }
        });
    });
    $("#stop_btn").click(function(){
        $.ajax({
            url: "command/stop",
            dataType: "json",
            type: "PUT",
            data: {},
            success: function(result) {
            }
        });
    });
    $("#rearrange_btn").click(function(){
        $.ajax({
            url: "command/rearrange",
            dataType: "json",
            type: "PUT",
            data: {},
            success: function(result) {
            }
        });
    });
    $("i.icons-reset").click(function(){
        var uuid = $(this).parent().attr("id");
        $.ajax({
            url: "command/rearrange/" + uuid,
            dataType: "json",
            type: "PUT",
            data: {},
            success: function(result) {
            }
        });
    });

    $("[id='btn:setting']").click(function(){
        $('body').addClass('setting');
        $('.board_container .board_view').removeClass('active');
        $('.board_container .board_view > ul > li').removeClass('active');
        $.ajax({
            url: "setting",
            dataType: "json",
            type: "GET",
            data: {},
            success: function(result) {
                g_settings = result;
                objToSetting(result);
            }
        });
    });

    $("[id='btn:setting-default']").click(function(){
        $.ajax({
            url: "setting/default",
            dataType: "json",
            type: "GET",
            data: {},
            success: function(result) {
                g_settings = result;
                objToSetting(result);
            }
        });
    });

    $("[id='btn:setting-save']").click(function(){
        var settingObj = settingToObj(g_settings);
        $.ajax({
            url: "setting",
            dataType: "json",
            type: "PUT",
            data: settingObj,
            success: function(result) {
                g_settings = settingObj;
            }
        });
        $('body').removeClass('setting');
    });

    $("[id='btn:setting-cancel']").click(function(){
        $('body').removeClass('setting');
    });
}

function drawDeviceBattery(uuidJqObj, deviceStatus, charging, level) {
    var batJqObj = uuidJqObj.children("div.bat");
    batJqObj.removeClass("warning");
    if(deviceStatus !== "Disconnected") {
        if(charging) {
            batJqObj.addClass("charge");
            batJqObj.find("span.title").text(level + "%");
            batJqObj.find("span.tum").css("width", level + "%");
        } else {
            batJqObj.removeClass("charge");
            batJqObj.find("span.title").text(level + "%");
            batJqObj.find("span.tum").css("width", level + "%");
        }
        if(g_settings.warnEnable && level <= g_settings.warnBattery) {
            batJqObj.addClass("warning");
        }
    }
}

function drawDeviceTemperature(uuidJqObj, deviceStatus, temperature){
    var temJqObj = uuidJqObj.children("div.tem");
    temJqObj.removeClass("warning");
    if(deviceStatus === "Disconnected") {
        temJqObj.find("span.title").text("-");
        temJqObj.find("span.tum").css("width", "0%");
    } else {
        temJqObj.find("span.title").text(temperature + "℃");
        temJqObj.find("span.tum").css("width", temperature + "%");
        if(g_settings.warnEnable && temperature >= g_settings.warnTemperature) {
            temJqObj.addClass("warning");
        }
    }
}

function drawDeviceStatus(uuidJqObj, status){
    var deviceCount = 0;
    if(status === "Playing") {
        uuidJqObj.removeClass("alert");
        uuidJqObj.children("div.play").removeClass("warning");
        uuidJqObj.children("div.wifi").removeClass("warning");
        deviceCount++;
    } else if(status === "Ready") {
        uuidJqObj.removeClass("alert");
        uuidJqObj.children("div.play").addClass("warning");
        uuidJqObj.children("div.wifi").removeClass("warning");
        deviceCount++;
    } else if(status === "Disconnected") {
        uuidJqObj.addClass("alert");
    }
    return deviceCount;
}

function drawDeviceBoard(clientsList) {
    var clientsInfoObject = {};
    for (var i = 0; i < clientsList.length; i++) {
        clientsInfoObject[clientsList[i].uuid] = clientsList[i];
    }
    var deviceCount = 0;
    g_uuidList.forEach(function(uuid){
        var uuidJqObj = $("#" + uuid);
        uuidJqObj.removeClass("alert");
        if(clientsInfoObject.hasOwnProperty(uuid)) { //once connected
            var deviceInfo = clientsInfoObject[uuid];
            deviceCount += drawDeviceStatus(uuidJqObj, deviceInfo.status);
            drawDeviceBattery(uuidJqObj,
                deviceInfo.status,
                deviceInfo.charge === "Charging",
                deviceInfo.battery);
            drawDeviceTemperature(uuidJqObj,
                deviceInfo.status,
                deviceInfo.temperature
            );
        } else { //never connected
            drawDeviceStatus(uuidJqObj, "Disconnected");
            drawDeviceBattery(uuidJqObj, "Disconnected");
            drawDeviceTemperature(uuidJqObj, "Disconnected");
        }
    });
    $("[id='ui:number-of-devices']").text(deviceCount);
}

function drawServerInfo(serverInfo) {
    playerStatus = serverInfo['Player Status'];
    var ActivatedMediaSelectorStr = "[id='" + serverInfo["Activated Item"] +
                                    serverInfo["Activated Order"] +  "']";
    $(".list_view").find(".play").not(ActivatedMediaSelectorStr).removeClass("play");

    var playRatio = 0;
    if(serverInfo["Activated Duration"] > 0) {
        playRatio = (100 * serverInfo["Duration"]) / serverInfo["Activated Duration"];
    }
    $(ActivatedMediaSelectorStr + " .bar").css("width", playRatio + "%");
    $(ActivatedMediaSelectorStr).addClass("play");

    if(serverInfo["Player Status"] === "playing") {
        $("#play_btn").addClass("disable");
        $("#stop_btn").removeClass("disable");
    } else if(serverInfo["Player Status"] === "stop") {
        $("#play_btn").removeClass("disable");
        $("#stop_btn").addClass("disable");
    } else if(serverInfo["Player Status"] === "hold") {
        $("#play_btn").removeClass("disable");
        $("#stop_btn").removeClass("disable");
    }

    if(serverInfo["Chair Status"] === "Connected") {
        $(".icons-seat").addClass("on");
    } else {
        $(".icons-seat").removeClass("on");
    }
}

function adjustDuration(duration) {
    var hh = Math.floor(duration / 3600);
    duration -= 3600 * hh;
    var mm = Math.floor(duration / 60);
    var ss = duration % 60;

    if (mm < 10)
        mm = '0' + mm;
    if (ss < 10)
        ss = '0' + ss;
    if (hh > 0) {
        return hh + ':' + mm + ':' + ss;
    } else {
        return mm + ':' + ss;
    }
}

function drawMediaTable(mediaList) {
    var listJqObj = $("ul.list_view");
    listJqObj.text(""); //clear list

    for (var i = 0; i < mediaList.length; i++) {
        var mediaHtmlStr = '<li class="is-click" id="' + mediaList[i].name + mediaList[i].order +
            '"><span class="title">' + mediaList[i].name +
            '</span><span class="time">' + adjustDuration(mediaList[i].duration) +
            '</span><span class="bar"></span></li>';
        listJqObj.append(mediaHtmlStr);
        var appendedMediaJqObj = $("[id='" + mediaList[i].name + mediaList[i].order + "']");
        appendedMediaJqObj.attr("order", i+1);
        if (mediaList[i].selected === "Yes") {
            appendedMediaJqObj.addClass("active");
        } else {
            appendedMediaJqObj.removeClass("active");
        }
        appendedMediaJqObj.click(function(evt) {
            if (playerStatus === 'stop') {
                var selected;
                $(this).toggleClass('active')
                if ($(this).hasClass("active")) {
                    selected = 'Yes';
                } else {
                    selected = 'No';
                }
                $.ajax({
                    url: "media/select/" + $(this).attr("order"),
                    dataType: "json",
                    type: "PUT",
                    data: { 'Selected' : selected },
                    success: function(result) {
                    }
                });
            }
        });
    }
}

function getDevicesInfo(){
    $.ajax({
        url: 'devices',
        dataType: 'json',
        type: 'GET',
        data: {},
        success: function(result) {
            drawDeviceBoard(result);
        }
    });
}

function getMediaInfo(){
    $.ajax({
        url: 'media',
        dataType: 'json',
        type: 'GET',
        data: {},
        success: function(result) {
            drawMediaTable(result);
        }
    });
}

function getServerInfo(){
    $.ajax({
        url: 'info',
        dataType: 'json',
        type: 'GET',
        data: {},
        success: function(result) {
            drawServerInfo(result);
        }
    });
}

function getSettingInfo(){
    $.ajax({
        url: 'setting',
        dataType: 'json',
        type: 'GET',
        data: {},
        success: function(result) {
            g_settings = result;
        }
    });
}

function getStatus(){
    getDevicesInfo();
    getServerInfo();
    getSettingInfo();
}

function initPolling(){
    setInterval(getStatus, 200);
}

function initContents(){
    getMediaInfo();
}

function init(){
    initControls();
    initContents();
    initPolling();
}

init();
