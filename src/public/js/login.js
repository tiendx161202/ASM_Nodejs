const user = document.getElementById("user");
const drop_menu = document.getElementById("drop_menu");

user.addEventListener("click",()=>{
  drop_menu.classList.toggle('drop_actice');
});