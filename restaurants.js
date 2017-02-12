

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
    //creationNavBar();
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
        co = co + 1;
        $(".container-restaurants.col-md-8").append(containerRestaurant);
    })
}

var hideAll = function () {
    $('.container-restaurant').each(function() {
        $(this).hide();
    })
};

var creationNavBar = function() {
    $(".pagination").attr("id",1);
    var currentPage = 1;
    var index;
    var nombreElement = $('.container-restaurant.col-md-4').length;
    var elementParPage = 4;
    var nombreDePage = nombreElement/elementParPage;

    for(var i=0; i < nombreDePage; i++) {
        var btn = document.createElement("input");
        btn.setAttribute("type","button");
        if (i == 0) {
            var btnPrec = document.createElement("input");
            btnPrec.setAttribute("type","button");
            btnPrec.setAttribute("value","<");
            btnPrec.setAttribute("onclick","changePage(this.value);");
            $(".pagination").append(btnPrec);
        }
        btn.setAttribute("value",i+1);
        $(".pagination").append(btn);
        btn.setAttribute("onclick","changePage(this.value);");
        if (i == nombreDePage-1) {
            var btnSuiv = document.createElement("input");
            btnSuiv.setAttribute("type","button");
            btnSuiv.setAttribute("value",">");
            btnSuiv.setAttribute("onclick","changePage(this.value);");
            $(".pagination").append(btnSuiv);
        }
    }

}


var changePage = function(numPage) {
    var nombreElement = $('.container-restaurant.col-md-4').length;
    var elementParPage = 4;
    var nombreDePage = nombreElement/elementParPage;
    var currentPage = $(".pagination").attr("id");
    hideAll();


    if(numPage == ">" || numPage =="<") {
        if( (currentPage == nombreDePage) || (currentPage == 1) ) {
            if(currentPage == 1 && numPage == ">" ) {
                suiv = parseInt(currentPage) + parseInt(1);
                changePage(suiv);
                $(".pagination").attr("id",suiv);
            }
            if (currentPage == 1 && numPage == "<") {
                alert("Impossible");
                changePage(1);
            }
            if (currentPage == nombreDePage && numPage == ">") {
                alert("Impossible");
                changePage(nombreDePage);
            }
            if(currentPage == nombreDePage && numPage == "<") {
                changePage(currentPage-1);
                $(".pagination").attr("id",currentPage-1);
            }
        }
        else {
            if(numPage == ">") {
                console.log("droite");
                suiv = parseInt(currentPage) + parseInt(1);
                changePage(suiv);
                $(".pagination").attr("id",suiv);
            }
            if (numPage == "<") {
                console.log("gauche");
                changePage(currentPage-1);
                $(".pagination").attr("id",currentPage-1);
            }
        }
    }
    else {
        var premiereDivPage = (numPage-1)*elementParPage;
        $(".pagination").attr("id",numPage);
        for(var i=premiereDivPage; i < premiereDivPage+elementParPage; i++) {
            $('.container-restaurant').eq(i).show();
        }
    }



}
$('.container-selected').hide();
creationNavBar();
changePage(1);
