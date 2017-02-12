/*$.getJSON("restaurants.json", function(data) {
    console.log(data);

    $("#adr").html(data[0].adr_address);
    $var = document.getElementById('icons');
    $var.src = data[0].icon;
});*/

/*$(function() {
    $.getJSON('restaurants.json', function(data) {
        $.each(data, function(index, d) {
            $('#contenu').append('Adresse : ' + d.adr_address + '<br>');
            $('#contenu').append('<img src=' + d.icon + '>');
        });
    });
});*/

/*var xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function() {
  if (this.readyState === 4 && this.status === 200) {
    callback(JSON.parse(this.responseText));
  }
};
xmlHttp.open("GET", localhost, true);
xmlHttp.send();*/

$('.container-restaurant').click(function() {
    $('.container-selected').show();
    //$('.container-selected').append(this.id);
    $('.container-selected .title').text(db[this.id].name);
    $('.container-selected .address').replaceWith(db[this.id].adr_address);
    $('.container-selected .img').attr("src", db[this.id].icon);
    $('.container-selected .tel').text(db[this.id].international_phone_number);

    //Schedule
    var sch;
    db[this.id].opening_hours.weekday_text.forEach(function(i) {
        sch = i + sch;
    })
    $('.container-selected .schedule').text(sch);
    if (db[this.id].opening_hours.open_now == true) {
        $('.container-selected .schedule').append("OUI");
    } else {
        $('.container-selected .schedule').append("NON");
    }
    $('.container-selected .review').text('');
    // Reviews
    db[this.id].reviews.forEach(function(i) {
        var com = $("<div></div>").addClass('Com');
        com.addClass('bg-primary');
        com.append('<img src="https://cdn3.iconfinder.com/data/icons/black-easy/512/538474-user_512x512.png" alt="..." class="img-rounded" height=30px>');
        com.append("<b>" + i.author_name + "</b><br>");
        for (var t = 1; t <= 5; t++) {
            if (t < i.rating) {
                com.append('★');
            } else {
                com.append('☆');
            }
        }
        com.append("<br>" + i.text);
        com.appendTo('.container-selected .review');
    })

});

var post = function() {
    var pseudo = $('#user').val();
    var com = $('#comment').val();

    var div = $("<div></div>").addClass('Com');
    div.addClass('bg-primary');
    div.append('<img src="https://cdn3.iconfinder.com/data/icons/black-easy/512/538474-user_512x512.png" alt="..." class="img-rounded" height=30px>');
    div.append("<b>" + pseudo + "</b><br>");
    div.append("<br>" + com);
    div.prependTo('.container-selected .review');

}

var search = function() {
    var text = $('#recherche').val();
    if (text != "") {
        var words = text.split(" ");

        $('.container-restaurant').each(function() {
            $(this).hide();
        })
        words.forEach(function(i) {
            var regex = new RegExp(i, 'i');
            console.log(regex);
            $('.name').each(function() {
                if ($(this).text().match(regex)) {
                    console.log("match");
                    var div = $(this).parent().parent().parent();
                    div.show();
                }
                console.log($(this).text());
            })



        })
    }
}

var chargement = function() {
    var co = 0;
    db.forEach(function(obj) {
        var containerRestaurant = document.createElement("div");
        containerRestaurant.className = "container-restaurant col-md-4";
        //containerRestaurant.setAttribute("class","container-restaurant col-md-4");

        var containerRestaurantSousDiv1 = document.createElement("div");

        var img = document.createElement("img");
        img.src = obj.icon;
        var containerInformations = document.createElement("div");
        containerRestaurant.setAttribute("id", co);

        var containerInformationsAdresse = document.createElement("div");
        containerInformationsAdresse.innerHTML = obj.name;
        containerInformationsAdresse.setAttribute("class", "name");

        $(containerRestaurant).append(containerRestaurantSousDiv1);
        $(containerRestaurantSousDiv1).append(img);
        $(containerRestaurantSousDiv1).append(containerInformations);
        $(containerInformations).append(containerInformationsAdresse);

        //var containerRestaurants = document.getElementsByClassName("container-restaurants col-md-8")[0];
        //var containerRestaurants = $(".container-restaurants col-md-8");
        //console.log(containerRestaurants);
        co = co + 1;
        $(".container-restaurants.col-md-8").append(containerRestaurant);
    })
}
chargement();
$('.container-selected').hide();

/*<div>
    <img src="https://goo.gl/Y5CqQG">
    <div id="novotel-s">
        <h1>Novotel Ottawa</h1>
        <p>allo allo allo</p>
    </div>
</div>*/
