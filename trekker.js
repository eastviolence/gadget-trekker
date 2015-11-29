var drawer;

var speed = {
    superslow:  4000,
    slow:       3000,
    medium:     2000,
    fast:       1000
};

$(document).ready(function(){
    $('#start-draw').on("click", startDrawing);
});

function startDrawing() {
    $('#start-draw').remove();
    drawer = setTimeout(draw, speed.fast);
};


function updateCounter() {
    $('#nrOf').text($('#tickets .btn-primary').length);
}

function draw() {
    removeLoosers();
    proceed();
}

function removeLoosers() {
    var looser = drawLooser();
    setLooser(looser);
}

function drawLooser() {
    var tickets = $("#tickets .in").length;
    var youreOutMotherFucka = Math.floor((Math.random() * tickets));
    console.log("length: " + tickets + ", removing: " + youreOutMotherFucka);
    return $("#tickets .in").eq(youreOutMotherFucka);
}

function setLooser(looser) {
    looser.addClass("btn-danger");
    looser.addClass("out");
    looser.removeClass("btn-primary");
    looser.removeClass("in");
}

function setWinner() {
    $("#tickets .in").addClass("btn-success");
    $("#tickets .in").addClass("btn-large");
}

function doFinale() {
    $("#tickets .out").remove();
    $('h2').text('And the winner is...');
    drawer = setTimeout(function() {
        var looser = drawLooser();
        setLooser(looser);
        setWinner();
        clearTimeout(drawer);
    }, 4000);
}

function proceed() {
    var remainingTickets = $("#tickets .in").length;

    if(remainingTickets == 2) {
        doFinale();
    }
    else if(remainingTickets <= 5) {
        drawer = setTimeout(draw, speed.medium);
    }
    else if(remainingTickets <= 10) {
        drawer = setTimeout(draw, speed.medium);
    }
    else {
        drawer = setTimeout(draw, speed.fast);
    }



    updateCounter();
}