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

$('.container-restaurant').click(function(){
  //$('.container-selected').append(this.id);
  $('.container-selected #title').text(db[this.id].name);
  $('.container-selected #address').replaceWith(db[this.id].adr_address);
  $('.container-selected #img').attr("src",db[this.id].icon);
  $('.container-selected #tel').text(db[this.id].international_phone_number);
  var sch;
  db[this.id].opening_hours.weekday_text.forEach(function (i){
    sch=i+sch;
  })
  $('.container-selected #schedule').text(sch);
  if(db[this.id].opening_hours.open_now==true){
    $('.container-selected #schedule').append("OUI");
  }
  else {
    $('.container-selected #schedule').append("NON");
  }


});

var chargement = function() {
  var co=0;
    db.forEach(function(obj) {
        var containerRestaurant = document.createElement("div");
        containerRestaurant.className = "container-restaurant col-md-4";
        //containerRestaurant.setAttribute("class","container-restaurant col-md-4");

        var containerRestaurantSousDiv1 = document.createElement("div");

        var img = document.createElement("img");
        img.src = obj.icon;
        var containerInformations = document.createElement("div");
        containerRestaurant.setAttribute("id",co);

        var containerInformationsAdresse = document.createElement("div");
        containerInformationsAdresse.innerHTML = obj.adr_address;

        $(containerRestaurant).append(containerRestaurantSousDiv1);
        $(containerRestaurantSousDiv1).append(img);
        $(containerRestaurantSousDiv1).append(containerInformations);
        $(containerInformations).append(containerInformationsAdresse);

        //var containerRestaurants = document.getElementsByClassName("container-restaurants col-md-8")[0];
        //var containerRestaurants = $(".container-restaurants col-md-8");
        //console.log(containerRestaurants);
        co=co+1;
        $(".container-restaurants.col-md-8").append(containerRestaurant);
    })
}
chargement();

/*<div>
    <img src="https://goo.gl/Y5CqQG">
    <div id="novotel-s">
        <h1>Novotel Ottawa</h1>
        <p>allo allo allo</p>
    </div>
</div>*/
