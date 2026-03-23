[
    ...document.querySelectorAll(".faqs-tarjetas__container__cards__item"),
].forEach(function (item) {
    item.addEventListener("click", function () {
        if (item.classList.contains("card-switch")) {
            item.classList.add("card-active");
            item.classList.add("card-active");
            item.classList.remove("card-switch");
        } else {
            item.classList.remove("card-active");
            item.classList.add("card-switch");
        }
    });
});
