$('document').ready(function() {
    welcome_message();
});

// global variables
var settings;
var nick;
var male;
var age;
var mode;

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
function start_training_gil() {
    $('#training_gil').toggle(100);
    $('#next').toggle(100);
    setTimeout(end_training_gil, settings['trainingGilTime']);
}

function end_training_gil() {
    $('#measured_gil_text').html(settings['measuredGilMessage']);
    $('#measured_gil_time').html(settings['RMBTimeout']);
    $('#measured_gil').toggle(400);
    $('#next').unbind("click").click(start_measured_gil).toggle(100);
}

function start_measured_gil() {

}

// helper functions
