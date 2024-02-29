const logo = document.getElementById('desplegable-btn');
const menuLateral = document.querySelector(".barra-lateral");
const navItems = document.querySelectorAll(".nav-link-lateral");
const logoNombre = document.getElementById("logo-nombre");

logo.addEventListener('click', () => {
    rotateSVG()
    menuLateral.classList.toggle("mini-barra-lateral");
    logoNombre.classList.toggle("oculto");
    navItems.forEach((navItem) => {
        navItem.classList.toggle('oculto');
    })
})