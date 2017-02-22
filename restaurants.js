//Fonction qui créer le HTML
var chargement = function() {
  var co = 0;
  db.forEach(function(obj) {
    var containerRestaurant = document.createElement("div");
    containerRestaurant.className = "container-restaurant col-md-4";
    var containerRestaurantSousDiv1 = document.createElement("div");
    var img = document.createElement("img");
    img.src = obj.icon;
    var containerInformations = document.createElement("div");
    containerRestaurant.setAttribute("id", co);
    containerRestaurant.setAttribute("onclick", "afficheInformations(id);");
    var containerInformationsAdresse = document.createElement("div");
    containerInformationsAdresse.innerHTML = obj.name;
    containerInformationsAdresse.setAttribute("class", "name");

    $(containerRestaurant).append(containerRestaurantSousDiv1);
    $(containerRestaurantSousDiv1).append(img);
    $(containerRestaurantSousDiv1).append(containerInformations);
    $(containerInformations).append(containerInformationsAdresse);
    co = co + 1;
    $(".container-restaurants").append(containerRestaurant);
  })
}

// Fonction permettant de faire apparaitre les détails du restaurants
var afficheInformations = function(id) {
  $('.container-selected').show();
  //$('.container-selected').append(id);
  $('.container-selected .title').text(db[id].name);
  $('.container-selected .address').replaceWith(db[id].adr_address);
  $('.container-selected .img').attr("src", db[id].icon);
  $('.container-selected .tel').text("Téléphone : " + db[id].international_phone_number);

  //Pour les horaires
  var sch = "";
  db[id].opening_hours.weekday_text.forEach(function(i) {
    var tab = i.split(": ");
    sch = sch + "<tr>" + "<td>" + tab[0] + "</td>" + "<td>" + tab[1] + "</td>" + "</tr>";
  })
  $('.container-selected .schedule').html(sch);

  if (db[id].opening_hours.open_now == true) {
    $('.container-selected .ouverture').text("OUVERT");
  } else {
    $('.container-selected .ouverture').text("FERME");
  }
  $('.container-selected .review').text('');

  //Liens
  $(".website").attr("href", db[id].website);
  $(".website").text(db[id].website);
  $(".googlemaps").attr("href", db[id].url);
  $(".googlemaps").text(db[id].url);

  // Reviews
  db[id].reviews.forEach(function(i) {
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
}

//Poster un commentaire
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

var updatePageAfterSearch = function(result) {
  $(".container-restaurants").children().remove();
  var co = 0;
  result.forEach(function(div) {
    $(".container-restaurants").append(div);
    co = co + 1;
  })
  changePage(1);
}

var search = function() {
  var result = [];
  var nombreDeResulat = 0;
  var text = $('#recherche').val();

  //Recharge la page avant de rechercher
  $(".container-restaurants").children().remove();
  chargement();
  $(".pagination").attr("id", 1);
  changePage(1);

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
          nombreDeResulat++;
          var div = $(this).parent().parent().parent();
          //div.show();
          result.push(div);
        }
      })
    })
    $(".pagination").attr("id", 1);
    updatePageAfterSearch(result);
  }
}

/*
Fonctions suivante sont pour la pagination
hideAll() : Cache tous les restaurants sur la page
creationNavBar : Creer les différents boutons des pages
changePage : Permet de changer de page 
*/

var hideAll = function() {
  $('.container-restaurant').each(function() {
    $(this).hide();
  })
}

var creerBoutonPagination = function(value) {
  var btn = document.createElement("input");
  btn.setAttribute("type", "button");
  btn.setAttribute("class", "btn btn-default");
  btn.setAttribute("value", value);
  btn.setAttribute("onclick", "changePage(this.value);");
  $(".pagination").append(btn);
}

var creationNavBar = function(nombreDePage) {
  $(".pagination").children().remove();
  var id = $(".pagination").attr("id");
  var currentPage = parseInt(id);
  var nombreDeBoutons = 3;
  var valeurDernierBouton = currentPage + nombreDeBoutons;

  for (var i = currentPage; i < valeurDernierBouton; i++) {
    if (i == currentPage) {
      if (i != 1) {
        creerBoutonPagination("<");
      }
    }
    if (i <= nombreDePage) {
      creerBoutonPagination(i);
    }
    if (i == valeurDernierBouton - 1) {
      if (valeurDernierBouton <= nombreDePage) {
        creerBoutonPagination(">");
      }
    }
  }
}

var changePage = function(numPage) {
  var nombreElement = $('.container-restaurant').length;
  var elementParPage = 4;
  var nombreDePage = Math.trunc(nombreElement / elementParPage);
  var reste = nombreElement % elementParPage;
  var currentPage = $(".pagination").attr("id");

  if (reste > 0) {
    nombreDePage++;
  }

  hideAll();

  if (numPage == ">" || numPage == "<") {
    if ((currentPage == nombreDePage) || (currentPage == 1)) {
      if (currentPage == 1 && numPage == ">") {
        suiv = parseInt(currentPage) + parseInt(1);
        changePage(suiv);
        $(".pagination").attr("id", suiv);
      }
      if (currentPage == 1 && numPage == "<") {
        alert("Impossible");
        changePage(1);
      }
      if (currentPage == nombreDePage && numPage == ">") {
        alert("Impossible");
        changePage(nombreDePage);
      }
      if (currentPage == nombreDePage && numPage == "<") {
        changePage(currentPage - 1);
        $(".pagination").attr("id", currentPage - 1);
      }
    } else {
      if (numPage == ">") {
        suiv = parseInt(currentPage) + parseInt(1);
        changePage(suiv);
        $(".pagination").attr("id", suiv);
      }
      if (numPage == "<") {
        changePage(currentPage - 1);
        $(".pagination").attr("id", currentPage - 1);
      }
    }
  } else {
    var premiereDivPage = (numPage - 1) * elementParPage;
    $(".pagination").attr("id", numPage);
    for (var i = premiereDivPage; i < premiereDivPage + elementParPage; i++) {
      $('.container-restaurant').eq(i).show();
    }
  }
  creationNavBar(nombreDePage);
}

//Au démarrage ce qui se lance aussi
$('.container-selected').hide();
changePage(1);
