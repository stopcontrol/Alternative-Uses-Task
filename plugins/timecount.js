
function startTime() {
    var today = new Date();

    var s = today.getSeconds();

    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
