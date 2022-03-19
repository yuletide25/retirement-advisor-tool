window.onload = function () {
    // タイマー用データ
    var timerSettings = {};
    timerSettings["テスト"] = "6:40";
    timerSettings["スタート(0km)"] = "9:40";
    timerSettings["名古屋市博物館(6km)"] = "10:30";
    timerSettings["妙音通4交差点(10.4km)"] = "11:55";
    timerSettings["大久手交差点(15.7km)"] = "12:35";
    timerSettings["若宮北交差点(21.5km)"] = "12:52";
    timerSettings["丸の内中学校(26.2km)"] = "13:37";
    timerSettings["秩父通交差点(29.9km)"] = "14:11";
    timerSettings["中日新聞社(35.0km)"] = "14:59";
    timerSettings["桜通車道交差点(38.6km)"] = "15:32";
    timerSettings["ドーム駐車場入口(41.7km)"] = "16:05";
    timerSettings["フィニッシュ(42.195km)"] = "16:10";

    // タイマー表示を作成
    for (var key in timerSettings) {
        var timerPanel = document.getElementById("timer-panel");
        var timerUnit = document.createElement("div");
        timerUnit.className = "timer-unit";
        timerUnit.innerHTML = "<div class=\"timer-input-row\">" +
            "<span class=\"timer-name\">" + key + "</span>" +
            "&nbsp;" +
            "<span class=\"time-limit\">" + timerSettings[key] + "</span>" +
            "&nbsp;" +
            "まで" +
            "</div>" +
            "<div class=\"timer-display-row\">" +
            "あと" +
            "<span class=\"timer-display\">--:--:--</span>" +
            "</div>"
        timerPanel.appendChild(timerUnit);
    };

    // タイマーを動作させる
    setInterval(function () {
        var timers = document.getElementsByClassName("timer-unit");
        for (var timer in timers) {
            var timerUnit = timers[timer];
            var timeLimit = timerUnit.getElementsByClassName("time-limit")[0].innerHTML;
            var timelimithour = parseInt(timeLimit.split(":")[0]);
            var timelimitmin = parseInt(timeLimit.split(":")[1]);
            var timeLimitDateTime = new Date();
            timeLimitDateTime.setHours(timelimithour, timelimitmin, 00, 000);
            var currentDateTime = new Date();
            var remainingTime = timeLimitDateTime.getTime() - currentDateTime.getTime();
            if (remainingTime < 0) {
                timerDisplayRow = timerUnit.getElementsByClassName("timer-display-row")[0];
                timerDisplayRow.classList.add("end");
                timerDisplayRow.innerHTML = "終了";
            } else {
                var hour = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
                var min = Math.floor(remainingTime / 1000 / 60) % 60;
                var sec = Math.floor(remainingTime / 1000) % 60 + 1;
                var remainingTimeString = ("00" + hour).slice(-2)
                    + ":" + ("00" + min).slice(-2)
                    + ":" + ("00" + sec).slice(-2);
                var timerDisplay = timerUnit.getElementsByClassName("timer-display")[0];
                timerDisplay.innerHTML = remainingTimeString;
            }
        }
    }, 1000, 1000 - (new Date()).getTime() % 1000);
}