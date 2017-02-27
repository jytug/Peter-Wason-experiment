$('document').ready(function() {
    welcome_message(); console.log(shuffle([1,2,3,4,5,6]));
});

// global variables
var settings;
var nick;
var male;
var age;
var mode;
var lastClicks;
var tasks;

function welcome_message() {
    $.ajax({url: "/settings",
    success: function(result) {
        settings = JSON.parse(result)
        $("#welcome_text").html(settings['welcome'])
        $("#welcome").toggle(100);
        $("#next").unbind("click").click(welcome_next);
    }});
}

function welcome_next() {
    $("#welcome").toggle(100);
    $("#form").toggle(500);
    $("#next").unbind("click").click(form_next);
}

function form_next() {
    nick = $('#nick').val();
    male = $('#male').is(":checked");
    age = $('#age').val();
    mode = $('#mode').val();
    console.log(nick + " " + male + " " + age + " " + mode);
    if (nick != "" && mode != null && age > 0) {
        $('#form').toggle(100);
        $('#training_gil_text').html(settings['trainingGilMessage']);
        $('#training_gil_time').html(settings['RMBTimeout']);
        $('#training_gil').toggle(400);
        $('#next').unbind("click").click(start_training_gil);
    } else {
        alert("Proszę, sprawdź wprowadzone dane.\nMusisz wybrać tryb, a także wpisać nick i wiek");
    }
}

var last_click
var alert_timeout;

function start_training_gil() {
    $('#training_gil').toggle(100);
    $('#next').toggle(100);
    right_clicked();
    $(document).bind("contextmenu", function(event) {
        event.preventDefault();
        right_clicked();
    });
    setTimeout(end_training_gil, settings['trainingGilTime']);
}

function end_training_gil() {
    undo_timeout();
    $(document).unbind("contextmenu");
    $('#measured_gil_text').html(settings['measuredGilMessage']);
    $('#measured_gil_time').html(settings['RMBTimeout']);
    $('#measured_gil').toggle(400);
    $('#next').unbind("click").click(start_measured_gil).toggle(100);
}

function start_measured_gil() {
    $('#measured_gil').toggle(100);
    $('#next').toggle(100);
    right_clicked();
    $(document).bind("contextmenu", function(event) {
        event.preventDefault();
        right_clicked();
    });
    setTimeout(end_measured_gil, settings['measuredGilTime']);
}

function end_measured_gil() {
    undo_timeout();
    $(document).unbind("contextmenu");
    $('#training_card').toggle(400);
    $('#training_card_text').html(settings['trainingCardMessage']);
    if (mode == 1) {
        $('.training_mode1_first').toggle(50);
    } else {
        $('.training_mode2_first').toggle(50);
    }
    $('#next').unbind("click").click(start_training_card).toggle(100);
}

lastClicks = [];

function start_training_card() {
    if (mode == 1) {
       $('.training_mode1_second').toggle(200); 
    } else {
       $('.training_mode2_second').toggle(200); 
       right_clicked();
       $(document).bind("contextmenu", function(event) {
           event.preventDefault();
           right_clicked();
           lastClicks.push(new Date().getTime());
           if (mode == 3)
               checkRhythm();
           console.log(lastClicks);
       });
    }
    $('.training_cards').toggle(200);
    $('.card').click(function() {
        $(this).toggleClass("w3-black");
    });
    $('#next').toggle(100);
    setTimeout(end_training_card, settings['trainingCardTime']);
}

function end_training_card() {
    $('#next').toggle(100);
    undo_timeout();
    $(document).unbind("contextmenu");
    $('#training_card').toggle(100);
    $.ajax({url: "/tasks",
    success: function(result) {
        tasks = JSON.parse(result);
        tasks = shuffle(tasks);         // shuffle the tasks randomly
        start_measured_card();
        //$("#next").unbind("click").click(start_measured_card);
    }});
}

function start_measured_card() {
    $('#measured_card').toggle(400);
    show_task(0);
}

function show_task(i) {
    undo_timeout();
    $(document).unbind("contextmenu");
    console.log("showing task " + i);
    if (i < tasks.length) {
        $('.measured_cards').hide(20);
        $('#measured_card_text').html(tasks[i]['intro']);
        if (mode == 1) {
            $('.measured_mode1_second').hide(20); 
            $('.measured_mode1_first').show(50);
        } else {
            $('.measured_mode2_second').hide(20); 
            $('.measured_mode2_first').show(50);
        }
        $('#next').unbind("click").click(function() { run_task(i) }).show(100);
    } else {
        $('#measured_card').hide(10);
        $('#bye_text').html(settings['thankYouMessage']);
        $('#bye').show(100);
        $('#next').hide(100);
        // koniec
    }
}

function run_task(i) {
    lastClicks = [];
    if (mode == 1) {
       $('.measured_mode1_second').show(200); 
    } else {
       $('.measured_mode2_second').show(200); 
       right_clicked();
       $(document).bind("contextmenu", function(event) {
           event.preventDefault();
           right_clicked();
           lastClicks.push(new Date().getTime());
           if (mode == 3)
               checkRhythm();
           console.log(lastClicks);
       });
    }
    $('.measured_cards').show(200);
    $('.card').removeClass("w3-black").unbind("click").click(function() {
        $(this).toggleClass("w3-black");
    });
    $('#next').hide(100);
    console.log(settings['measuredCardTime']);
    setTimeout(function() { show_task(i+1); }, settings['measuredCardTime']);
}

// helper functions
function red_alert() {
    $('body').css("background-color", "red");
}

function undo_timeout() {
    clearTimeout(alert_timeout);
    $('body').css("background-color", "white"); 
}

function right_clicked() {
    undo_timeout(alert_timeout);
    alert_timeout = setTimeout(red_alert, settings['RMBTimeout']);
}

function checkRhythm() {
    console.log("Sprawdzam rytm");
    if (lastClicks.length >= 4) {
        console.log("są 4 kliknięcia");
        len = lastClicks.length;
        var t3 = lastClicks[len - 1];
        var t2 = lastClicks[len - 2];
        var t1 = lastClicks[len - 3];
        var t0 = lastClicks[len - 4];
        var X = ((t3 - t2) + (t2 - t1) + (t1 - t0)) / 3;
        var Q = (Math.pow(t3 - t2 - X, 2) + Math.pow(t2 - t1 - X, 2) + Math.pow(t1 - t0 - X, 2))
        if (Q < 10000) {
            $('body').css("background-color", "green");
        }
        console.log("Q wyszło " + Q);
    }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (2 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * (currentIndex - 2)) + 2;
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
