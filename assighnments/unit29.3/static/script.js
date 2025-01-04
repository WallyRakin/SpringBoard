document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        if (document.querySelector(".flashed_msgs") != undefined) {
            document.querySelector(".flashed_msgs").remove();
        }
    }, 3000);
});

const goToHome = () => {
    location.href="/";
}
async function getCupCakes() {
    await axios.get("/api/cupcakes").then(response => {
        const cupcakeContainer = $("#cupcakes");
        for (item of response.data.cupcakes){
            $("<img>")
                .attr({"src": item.image, "data-id": item.id})
                .css({"max-height":'150px', "max-width":'150px'})
            .appendTo($("<p>").text(`Flavor: ${item.flavor}
                                     Size: ${item.size}
                                     Rating: ${item.rating}`))
            .appendTo(cupcakeContainer);
        }
    }).catch(exception => { console.log(exception) });
}
function loadForm() {
    const form = $("<form>").attr({"method":"POST", "action":"/api/cupcakes"});
    $("<h3>").text("Add New Cupcake").appendTo($(form));

    $("<label>").attr({"for":"flavor"}).text("Flavor").appendTo($(form));
    $("<br>").appendTo($(form));
    $("<input>").attr({"id":"flavor","type":"text","placeholder":"Flavor",
    "value":"TestFlavor"}).appendTo($(form));

    $("<br>").appendTo($(form));
    $("<label>").attr({"for":"image"}).text("Image").appendTo($(form));
    $("<br>").appendTo($(form));
    $("<input>").attr({"id":"image","type":"text", "placeholder":"Image URL"})
    .appendTo($(form));

    $("<br>").appendTo($(form));
    $("<label>").attr({"for":"rating"}).text("Rating").appendTo($(form));
    $("<br>").appendTo($(form));
    $("<input>").attr({"id":"rating","type":"text", "placeholder":"Rating",
    "value":"0"}).appendTo($(form));

    $("<br>").appendTo($(form));
    $("<label>").attr({"for":"size"}).text("Size").appendTo($(form));
    $("<br>").appendTo($(form));
    $("<input>").attr({"id":"size","type":"text", "placeholder":"Size",
    "value":"1"}).appendTo($(form));

    form.appendTo($("#cupcakesForm"));
    $("#subloadbtn").text("Submit");
    $("#subloadbtn").attr("onclick","sendAPIPost();");
    $("#subloadbtn").change();
}
async function sendAPIPost(){
    await axios({
        url: "/api/cupcakes",
        method: "POST",
        params: {
            flavor: $('#flavor').val(),
            //image: $('#image').val(),
            rating: $('#rating').val(),
            size: $('#size').val()
        }}).then(response => {
        const cupcakeContainer = $("#cupcakes");
        $("<img>")
            .attr({"src": response.data.cupcake.image, "data-id": item.id})
            .css({"max-height":'150px', "max-width":'150px'})
        .appendTo($("<p>").text(`Flavor: ${response.data.cupcake.flavor}
                                 Size: ${response.data.cupcake.size}
                                 Rating: ${response.data.cupcake.rating}`))
        .appendTo(cupcakeContainer);
    }).catch(exception => { console.log(exception) });
}


$(window).on('load', getCupCakes);
