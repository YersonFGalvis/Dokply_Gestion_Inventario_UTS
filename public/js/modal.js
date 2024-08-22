const toggleModal = (modal, modalBackground, action) => {
    const isOpen = action === 'open';
    modal.classList.toggle('hidden', !isOpen);
    modal.classList.toggle('flex', isOpen);
    modalBackground.classList.toggle('hidden', !isOpen);
};

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error en la respuesta del servidor');
    return response.json();
};

const updateData = async (entity) => {
    try {
        const response = await fetchData(`/${entity === 'software' || entity === 'hardware' ? entity : entity + 's'}?format=json`);
        window.Data = Array.isArray(response.data) ? response.data : [];
        window.location.reload();
    } catch (error) {
        console.error('Error al obtener datos actualizados:', error);
    }
};

const populateSelect = (selectElement, value) => {
    if (!selectElement) return;
    const options = Array.from(selectElement.options);
    options.forEach(option => {
        if (option.value === String(value)) {
            option.selected = true;
        } else {
            option.selected = false;
        }
    });
};

const handleModalActions = async (action, entity, id) => {
    const modalSelector = `#${action}-${entity}-modal`;
    const modal = document.querySelector(modalSelector);
    const modalBackground = document.querySelector(`#modal-background-${action}`);

    if (!modal || !modalBackground) return;

    toggleModal(modal, modalBackground, 'open');

    const fields = ['numeroidentificacion', 'genero', 'telefono', 'email', 'nombre', 'nombres', 'apellidos', 'letra', 'estado', 'marca', 'version', 'licencia', 'descripcion', 'edificio_id', 'area_id', 'aula_id', 'cargo_id', 'rol', 'pass', 'password_confirm'];

    if (action === 'edit') {
        if (!id) {
            console.error('ID is missing for edit action');
            return;
        }

        try {
            const data = await fetchData(`/${entity}/${id}`);
            fields.forEach(field => {
                const input = modal.querySelector(`input[name="${field}"], select[name="${field}"]`);
                if (input) {
                    const value = data?.data[field];
                    if (input.tagName === 'SELECT') {
                        populateSelect(input, value?.id || value);
                    } else {
                        input.value = value !== undefined && value !== null ? value : '';
                    }
                }
            });

            modal.querySelector('#edit').onclick = async (e) => {
                e.preventDefault();
                try {
                    const body = fields.reduce((obj, field) => {
                        const input = modal.querySelector(`input[name="${field}"], select[name="${field}"]`);
                        if (input) obj[field] = input.value;
                        return obj;
                    }, {});

                    if (body.pass === body.password_confirm) {
                        await fetch(`/${entity}/${id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(body)
                        });
                        await updateData(entity);
                        toggleModal(modal, modalBackground, 'close');
                    } else {
                        alert('Las contraseñas deben ser iguales');
                    }
                } catch (error) {
                    console.error('Error updating data:', error);
                }
            };
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    } else if (action === 'delete') {
        modal.querySelector('#delete').onclick = async () => {
            if (!id) {
                console.error('ID is missing for delete action');
                return;
            }
            try {
                await fetch(`/${entity}/${id}`, { method: 'DELETE' });
                await updateData(entity);
                toggleModal(modal, modalBackground, 'close');
            } catch (error) {
                console.error('Error deleting data:', error);
            }
        };
    } else if (action === 'add') {
        modal.querySelector('#add').onclick = async () => {
            try {
                const body = fields.reduce((obj, field) => {
                    const input = modal.querySelector(`input[name="${field}"], select[name="${field}"]`);
                    if (input) obj[field] = input.value;
                    return obj;
                }, {});

                if (body.pass === body.password_confirm) {
                    await fetch(`/crear/${entity}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(body)
                    });
                    await updateData(entity);
                    toggleModal(modal, modalBackground, 'close');
                } else {
                    alert('Las contraseñas deben ser iguales');
                }
            } catch (error) {
                console.error('Error adding data:', error);
            }
        };
    }
};

// Event listeners for modal actions
document.addEventListener('click', async (event) => {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    const action = target.getAttribute('data-action');
    const entity = target.getAttribute('data-entity');
    const id = target.getAttribute('data-id');

    if (entity && action) {
        await handleModalActions(action, entity, id);
    }
});

// Close modal when clicking outside the modal
document.addEventListener('click', (event) => {
    const target = event.target.closest('[id^="modal-background"]');
    if (target) {
        const visibleModal = document.querySelector('.modal.flex');
        if (visibleModal) toggleModal(visibleModal, target, 'close');
    }
});

// Close modal when clicking on close button
document.addEventListener('click', (event) => {
    const target = event.target.closest('.close-modal-btn');
    if (target) {
        const modal = target.closest('.modal');
        const modalBackground = document.querySelector(`#modal-background-${modal?.getAttribute('data-action')}`);
        if (modal && modalBackground) {
            toggleModal(modal, modalBackground, 'close');
        }
    }
});