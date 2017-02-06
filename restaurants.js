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

var extraction_donnees = function() {
  var d = [];
  $.getJSON('restaurants.json', function(data) {
    d.push(data);
  });
  return d;
};

var creation_html = function(data) {
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
};

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


  var d = extraction_donnees();
  creation_html(d);
