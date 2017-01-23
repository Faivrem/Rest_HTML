$.getJSON("restaurants.json", function(data) {
    console.log(data);

    $("#adr").html(data[0].adr_address);
    $var = document.getElementById('icons');
    $var.src = data[0].icon;




});
