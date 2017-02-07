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
//<p id="adr"> </p>
//<img id="icons" src="" alt="test">

/*var extractionDonnees = function() {
  var d = [];
  $.getJSON('restaurants.json', function(data) {
    d.push(data);
  });
  return d;
};

var creationHtml = function(data) {
  data.forEach(function(obj) {
    for(var i in obj) {
      var divTmp = document.createElement("div");
      var idDiv = document.createAttribute("id");
      idDiv = obj[i].name;
      divTmp.setAttribute("id",idDiv);
      var img = ajoutImage(obj[i].icon);
      var adresse = ajoutAdresse(obj[i].adr_address,obj[i].name);
      divTmp.appendChild(img);
      divTmp.appendChild(adresse);
      document.getElementById("contenu").appendChild(divTmp);
    }

  })
};*/

var chargement = function() {
  $.getJSON('restaurants.json', function(data) {
    data.forEach(function(obj) {

      var containerRestaurant = document.createElement("div");
      containerRestaurant.className = "container-restaurant col-md-4";
      //containerRestaurant.setAttribute("class","container-restaurant col-md-4");

      var containerRestaurantSousDiv1 = document.createElement("div");

      var img = document.createElement("img");
      img.src = obj.icon;

      var containerInformations = document.createElement("div");
      containerInformations.setAttribute("id",obj.id);

      var containerInformationsAdresse = document.createElement("div");
      containerInformationsAdresse.innerHTML = obj.adr_address;

      containerRestaurant.appendChild(containerRestaurantSousDiv1);
      containerRestaurantSousDiv1.appendChild(img);
      containerRestaurantSousDiv1.appendChild(containerInformations);
      containerInformations.appendChild(containerInformationsAdresse);

      var containerRestaurants = document.getElementsByClassName("container-restaurants col-md-8")[0];
      //console.log(containerRestaurants);
      containerRestaurants.appendChild(containerRestaurant);

    })
  })
}
/*<div>
    <img src="https://goo.gl/Y5CqQG">
    <div id="novotel-s">
        <h1>Novotel Ottawa</h1>
        <p>allo allo allo</p>
    </div>
</div>*/

chargement();


var ajoutImage = function(src) {
  var img = document.createElement("img");
  img.src = src;
  return img;
}
//Essayer de split l'adresse avec les </span>
var ajoutAdresse = function(adr,id) {
  //var adresse = document.createElement("p");
  var divTmp = document.createElement("div");
  divTmp.innerHTML = adr;
  return divTmp;
}
