const sidebar = document.getElementById('sidebar');
const btn_sidebar = document.getElementById('btn_sidebar');
const menu = document.getElementById('sidebarBackdrop');


if (sidebar && btn_sidebar && menu) {

    const toggleSidebarMobile = () => {
        sidebar.classList.toggle('hidden');
        menu.classList.toggle('hidden');
    };

    btn_sidebar.addEventListener('click', () => {
        toggleSidebarMobile();
    });

    menu.addEventListener('click', () => {
        toggleSidebarMobile();
    });
} else {
    console.error('No se encontraron los elementos sidebar, btn_sidebar o menu');
}
