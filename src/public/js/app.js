let list = document.querySelector(".list_icon");
let nav = document.getElementById("ul_nav");

list.addEventListener("click", () => {
  nav.classList.toggle("nav_active");
});

// Js product_img_small

// let productimg = document.getElementById("product_img");
// let smallimg = document.getElementsByClassName("small_img");

// smallimg[0].onclick = function () {
//   productimg.src = smallimg[0].src;
// };

// smallimg[1].onclick = function () {
//   productimg.src = smallimg[1].src;
// };

// smallimg[2].onclick = function () {
//   productimg.src = smallimg[2].src;
// };

// related_content

const leftRelated = document.getElementById("btn_related_left");
const rightRelated = document.getElementById("btn_related_right");
const related = document.getElementsByClassName("related_product_item")[0];

rightRelated.addEventListener("click", () => {
  related.scrollLeft += 654;
});

leftRelated.addEventListener("click", () => {
  related.scrollLeft -= 654;
});

// function navSide() {
//   const burger = document.getElementById("burger");
//   const as = document.querySelector(".ul_nav");

//   burger.addEventListener("click", () => {
//     as.classList.toggle('nav_active');
//   });
// }

// navSide();

// function searchShow(){
//   const search_icon = document.getElementById('search_icon');
//   const inSearch = document.querySelector('.in_search');

//   search_icon.addEventListener("click",() => {
//     inSearch.classList.toggle('input_active');
//     console.log('124');
//   })
// }

// searchShow();


