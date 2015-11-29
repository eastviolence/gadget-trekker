$(document).ready(function(){
    getPeople();
});

function randomizeTickets() {
    $.fn.randomize=function(a){(a?this.find(a):this).parent().each(function(){$(this).children(a).sort(function(){return Math.random()-0.5}).detach().appendTo(this)});return this};
    $('#tickets').randomize('button');
}

function getPeople() {
    $.ajax({
        type: "GET",
        url: "people.csv",
        dataType: "text",
        success: function(data) {dataLoaded(data);}
     });
}

function dataLoaded(data) {
    var lodd = parseData(data);
    renderData(lodd);
    randomizeTickets();
    $('#nrOf').text(lodd.length);
}

function renderData(lodd) {
    var source   = $("#lodd-template").html();
    var template = Handlebars.compile(source);
    for(var i = 0; i < lodd.length; i++) {
        var html = template(lodd[i]);
        $('#tickets').append(html);
    }
}

function parseData(data) {
    var lodd = new Array();
    var peopleWithActivitiesArray = data.split(/\r\n|\n/);
    for(var i = 3; i < peopleWithActivitiesArray.length; i++) {
        var personAndActivitiesString = peopleWithActivitiesArray[i];
        var personAndActivities = personAndActivitiesString.split(",")
        var name = personAndActivities[0];
        var activities = new Array();
        for(var j = 1; j < personAndActivities.length; j++) {
            var personAndActivity = new Object();
            personAndActivity.name = name;
            var activity = personAndActivities[j];
            // Since out .csv file contains max nr entries for each person, we just keep the ones who are filled out
            if(activity !== "") {
                personAndActivity.activity = activity
                lodd.push(personAndActivity);
            }
        }
    }
    return lodd;
}