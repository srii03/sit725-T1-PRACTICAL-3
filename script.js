const cardList = [
    {
        title: "Flower1",
        image: "flower1.webp",
        link: "About flower 1",
        description: "Demo description about flower 1"
    },
    {
        title: "Flower2",
        image: "flower2.webp",
        link: "About flower 2",
        description: "Demo description about flower 2"
    }
];

const clickMe = () => {
    alert("Thanks for clicking me. Hope you have a nice day!");
};

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
    console.log("Form Data Submitted: ", formData);
    // Additional logic to process form data if needed
};

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = `<div class="col s4 center-align">
            <div class="card medium">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator materialboxed materialboxed-image" src="${item.image}">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">${item.title}<i class="material-icons right">more_vert</i></span>
                    <p><a href="#">${item.link}</a></p>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">${item.title}<i class="material-icons right">close</i></span>
                    <p class="card-text">${item.description}</p>
                </div>
            </div>
        </div>`;
        $("#card-section").append(itemToAppend);
    });
    // Initialize Materialize materialboxed for newly added images
    $('.materialboxed').materialbox();
};

$(document).ready(function () {
    $('#formSubmit').click(() => {
        submitForm();
    });
    addCards(cardList);
    $('.modal').modal();
});
