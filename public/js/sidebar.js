const sidebar = document.getElementById('sidebar');
const btn_sidebar = document.getElementById('btn_sidebar');
const menu = document.getElementById('sidebarBackdrop');

const checkSidebarState = () => {
    const isSidebarOpen = localStorage.getItem('isSidebarOpen') === 'true';
    if (isSidebarOpen) {
        sidebar.classList.remove('hidden');
        menu.classList.add('hidden');
    } else {
        sidebar.classList.add('hidden');
        menu.classList.remove('hidden');
    }
};

const toggleSidebarMobile = () => {
    const isHidden = sidebar.classList.toggle('hidden');
    if (isHidden) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
    localStorage.setItem('isSidebarOpen', !isHidden);
};

if (sidebar && btn_sidebar && menu) {
    checkSidebarState();

    btn_sidebar.addEventListener('click', () => {
        toggleSidebarMobile();
    });

    menu.addEventListener('click', () => {
        toggleSidebarMobile();
    });
} else {
    console.error('No se encontraron los elementos sidebar, btn_sidebar o menu');
}