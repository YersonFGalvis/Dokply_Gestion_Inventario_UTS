const openModal = (modal, modalBackground) => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modalBackground.classList.remove('hidden');
};

const closeModal = (modal, modalBackground) => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modalBackground.classList.add('hidden');
};

const updateData = async (entity) => {
    try {
        const response = await fetch(`/${entity}s?format=json`);
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        const data = await response.json();
        window.Data = Array.isArray(data.data) ? data.data : []; // Actualiza los datos globales
        window.updateTable(); // Renderiza la tabla con los datos actualizados
        window.location.reload();
    } catch (error) {
        console.error('Error al obtener datos actualizados:', error);
    }
};

// Manejar clic en botones
document.addEventListener('click', async (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    const action = target.getAttribute('data-action');
    const entity = target.getAttribute('data-entity');
    const id = target.getAttribute('data-id');

    if (entity && action) {
        const modalSelector = action === 'add'
            ? `#add-${entity}-modal`
            : action === 'edit'
                ? `#edit-${entity}-modal`
                : action === 'delete'
                    ? `#delete-${entity}-modal`
                    : null;

        const modal = document.querySelector(modalSelector);
        const modalBackground = document.querySelector(`#modal-background-${action}`);

        if (modalBackground) {
            if (action === 'edit') {
                if (modal) {
                    openModal(modal, modalBackground);

                    try {
                        const response = await fetch(`/${entity}/${id}`);
                        if (!response.ok) throw new Error('Error fetching data');
                        const data = await response.json();

                        // Llenar el modal con datos
                        modal.querySelector('input[name="nombre"]').value = data?.data?.nombre || '';

                        // Configura el botón de guardar para PUT
                        modal.querySelector('#edit').onclick = async (event) => {
                            event.preventDefault();
                            try {
                                const nombre = modal.querySelector('input[name="nombre"]').value;
                                const updateResponse = await fetch(`/${entity}/${id}`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ nombre })
                                });
                                if (!updateResponse.ok) throw new Error('Error updating data');
                                await updateData(entity); // Actualiza los datos globales
                                closeModal(modal, modalBackground);
                            } catch (error) {
                                console.error('Error updating data:', error);
                            }
                        };
                        

                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
            } else if (action === 'delete') {
                if (modal) {
                    openModal(modal, modalBackground);
                    modal.querySelector('#delete').onclick = async () => {
                        try {
                            await fetch(`/${entity}/${id}`, {
                                method: 'DELETE',
                            });
                            await updateData(entity); // Actualiza los datos globales
                            closeModal(modal, modalBackground);
                        } catch (error) {
                            console.error('Error deleting data:', error);
                        }
                    };
                }
            } else if (action === 'add') {
                if (modal) {
                    openModal(modal, modalBackground);
                    modal.querySelector('#add').onclick = async () => {
                        try {
                            const nombre = modal.querySelector('input[name="nombre"]').value;
                            await fetch(`/${entity}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ nombre })
                            });
                            await updateData(entity); // Actualiza los datos globales
                            closeModal(modal, modalBackground);
                        } catch (error) {
                            console.error('Error adding data:', error);
                        }
                    };
                }
            }
        }
    }
    // Cerrar modal al hacer clic en el fondo
    document.querySelectorAll('[id^="modal-background"]').forEach(background => {
        background.addEventListener('click', (event) => {
            const modal = document.querySelector('.modal.flex'); // Selecciona el modal que está visible
            if (modal) {
                closeModal(modal, background);
            }
        });
    });

    // Cerrar modal al hacer clic en el botón de cerrar
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                const modalBackground = document.querySelector(`#modal-background-${action}`);
                if (modalBackground) {
                    closeModal(modal, modalBackground);
                } else {
                    console.error(`Fondo del modal no encontrado para la acción: ${action}`);
                }
            } else {
                console.error('Modal no encontrado.');
            }
        });
    });
});
