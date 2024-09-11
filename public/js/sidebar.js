const sidebar = document.getElementById('sidebar');
const btn_sidebar = document.getElementById('btn_sidebar');
const menu = document.getElementById('sidebarBackdrop');

// Función para verificar el estado del sidebar en localStorage
const checkSidebarState = () => {
    const isSidebarOpen = localStorage.getItem('isSidebarOpen') === 'true';
    if (isSidebarOpen) {
        sidebar.classList.remove('hidden'); // Muestra el sidebar
        menu.classList.add('hidden'); // Oculta el botón para abrir
    } else {
        sidebar.classList.add('hidden'); // Oculta el sidebar
        menu.classList.remove('hidden'); // Muestra el botón para abrir
    }
};

// Función para alternar el estado del sidebar y guardarlo en localStorage
const toggleSidebarMobile = () => {
    const isHidden = sidebar.classList.toggle('hidden'); // Alterna la visibilidad del sidebar
    if (isHidden) {
        menu.classList.remove('hidden'); // Si el sidebar está oculto, muestra el botón para abrir
    } else {
        menu.classList.add('hidden'); // Si el sidebar está visible, oculta el botón para abrir
    }
    localStorage.setItem('isSidebarOpen', !isHidden); // Actualiza el estado en localStorage
};

// Verificar la existencia de los elementos antes de agregar los eventos
if (sidebar && btn_sidebar && menu) {
    // Chequea el estado del sidebar al cargar la página
    checkSidebarState();

    // Asignar evento al botón de abrir/cerrar
    btn_sidebar.addEventListener('click', () => {
        toggleSidebarMobile();
    });

    // Asignar evento al botón de backdrop para cerrar
    menu.addEventListener('click', () => {
        toggleSidebarMobile();
    });
} else {
    console.error('No se encontraron los elementos sidebar, btn_sidebar o menu');
}