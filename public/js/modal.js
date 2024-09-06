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

const updateResponsableSelect = (selectElement, responsables) => {
    if (!selectElement || !Array.isArray(responsables)) return;

    const responsableSeleccionado = responsables.find(responsable => responsable.fecha_devolucion === null);
    selectElement.value = responsableSeleccionado ? responsableSeleccionado.responsable_id.id : "";
};

const updateHSSelect = (containerId, data, selectType) => {
    const container = document.getElementById(`${containerId}-container-edit`);

    if (!container) {
        console.error(`No se encontró el contenedor con ID ${containerId}`);
        return;
    }
    container.innerHTML = '';
    data.forEach(item => {
        const newField = document.createElement('div');
        newField.classList.add('flex', 'items-center', 'space-x-2', 'mb-2');

        const newSelect = document.createElement('select');
        newSelect.name = selectType;
        newSelect.classList.add('bg-gray-50', 'border', 'border-gray-300', 'text-gray-900', 'text-sm', 'rounded-lg', 'block', 'w-full', 'p-2.5', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:placeholder-gray-400', 'dark:text-white', 'dark:focus:ring-primary-500', 'dark:focus:border-primary-500');

        const defaultOption = document.createElement('option');
        defaultOption.value = item.id;
        defaultOption.text = containerId === 'hardware' ? item.hardware_id.nombre : item.software_id.nombre;
        newSelect.appendChild(defaultOption);

        if (containerId == 'hardware') {
            hardwareData.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.text = item.nombre;
                newSelect.appendChild(option);
            });
        } else {
            softwareData.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.text = item.nombre;
                newSelect.appendChild(option);
            });
        }

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.classList.add('text-red-500', 'hover:text-red-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-red-500', 'font-medium', 'rounded-lg');
        removeButton.innerHTML = `<svg class="w-6 h-6 text-red-700 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>`;
        removeButton.onclick = () => {
            if (container.querySelectorAll('select').length > 1) {
                newField.remove();
            } else {
                alert('Debe haber al menos un hardware y software.');
            }
        };

        newField.appendChild(newSelect);
        newField.appendChild(removeButton);
        container.appendChild(newField);
    });
};

const handleModalActions = async (action, entity, id) => {
    const modalSelector = `#${action}-${entity}-modal`;
    const modal = document.querySelector(modalSelector);
    const modalBackground = document.querySelector(`#modal-background-${action}`);

    if (!modal || !modalBackground) return;

    toggleModal(modal, modalBackground, 'open');

    const fields = ['numeroidentificacion', 'genero', 'telefono', 'email', 'nombre', 'nombres', 'apellidos', 'letra', 'estado', 'marca', 'version', 'licencia', 'descripcion', 'edificio_id', 'area_id', 'aula_id', 'cargo_id', 'rol_id', 'pass', 'confirm_password', 'responsable_id', 'equipoHardware[]', 'equipoSoftware[]'];

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
                        if (field === 'responsable_id') {
                            updateResponsableSelect(input, data.data.responsableEquipos || []);
                        } else {
                            populateSelect(input, value?.id || value);
                        }
                    } else {
                        input.value = value !== undefined && value !== null ? value : '';
                    }
                }
            });
            updateHSSelect('hardware', data.data.equipoHardware, 'equipoHardware[]');
            updateHSSelect('software', data.data.equipoSoftware, 'equipoSoftware[]');

            const qrBtn = document.getElementById('qr-btn');
            const exportarBtn = document.getElementById('exportar-btn');

            if (qrBtn) {
                qrBtn.onclick = () => {
                    const baseURL = window.location.origin;
                    const url = `${baseURL}/generar-pdf/pdf/${data.data.id}`;

                    const qrUrl = `/generarQR?url=${encodeURIComponent(url)}`;

                    const fileName = `EQUIPO_${data.data.id}_AULA_${data.data.aula_id.nombre}_EDIFICIO_${data.data.aula_id.edificio_id.nombre}.png`;

                    fetch(qrUrl, { method: 'GET' })
                        .then(response => response.blob())
                        .then(blob => {
                            const url = URL.createObjectURL(blob);
                            const tempLink = document.createElement('a');
                            tempLink.href = url;
                            tempLink.download = fileName;
                            document.body.appendChild(tempLink);
                            tempLink.click();
                            document.body.removeChild(tempLink);
                            URL.revokeObjectURL(url);
                        })
                        .catch(error => console.error('Error:', error));
                };
            }

            if (exportarBtn) {
                exportarBtn.onclick = () => {
                    const baseURL = window.location.origin;
                    const url = `${baseURL}/generar-pdf/pdf/${data.data.id}`;

                    fetch(url, {
                        method: 'GET',
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.blob();
                    }).then(blob => {
                        const link = document.createElement('a');
                        link.href = window.URL.createObjectURL(blob);
                        link.download = `Equipo_${data.data.id}.pdf`; // Nombre del archivo PDF
                        link.click();
                    }).catch(error => console.error('Error:', error));
                };
            }

            modal.querySelector('#edit').onclick = async (e) => {
                e.preventDefault();
                try {
                    const body = fields.reduce((obj, field) => {
                        const input = modal.querySelector(`input[name="${field}"], select[name="${field}"]`);
                        if (input) obj[field] = input.value;
                        return obj;
                    }, {});

                    if (body.pass === body.confirm_password) {
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
                    const inputs = modal.querySelectorAll(`input[name="${field}"], select[name="${field}"]`);

                    if (inputs.length > 1) {
                        obj[field] = Array.from(inputs).map(input => input.value);
                    } else if (inputs.length === 1) {
                        obj[field] = inputs[0].value;
                    }

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

document.addEventListener('click', (event) => {
    const target = event.target.closest('[id^="modal-background"]');
    if (target) {
        const visibleModal = document.querySelector('.modal.flex');
        if (visibleModal) toggleModal(visibleModal, target, 'close');
    }
});

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

let hardwareData = [];
let softwareData = [];

function loadData() {
    fetch('/hardware?format=json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de hardware');
            }
            return response.json();
        })
        .then(data => {
            hardwareData = Array.isArray(data) ? data : data.data || [];
            return fetch('/software?format=json');
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de software');
            }
            return response.json();
        })
        .then(data => {
            softwareData = Array.isArray(data) ? data : data.data || [];
            initializeDefaultFields();
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

function initializeDefaultFields() {
    const hardwareContainer = document.getElementById('hardware-container');
    const softwareContainer = document.getElementById('software-container');

    if (!Array.isArray(hardwareData) || !Array.isArray(softwareData)) {
        console.error('hardwareData o softwareData no son arrays');
        return;
    }

    if (hardwareContainer.querySelectorAll('select').length === 0) {
        const defaultHardwareField = document.createElement('div');
        defaultHardwareField.classList.add('flex', 'items-center', 'space-x-2', 'mb-2');

        const defaultHardwareSelect = document.createElement('select');
        defaultHardwareSelect.name = 'equipoHardware[]';
        defaultHardwareSelect.classList.add('bg-gray-50', 'border', 'border-gray-300', 'text-gray-900', 'text-sm', 'rounded-lg', 'block', 'w-full', 'p-2.5', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:placeholder-gray-400', 'dark:text-white', 'dark:focus:ring-primary-500', 'dark:focus:border-primary-500');

        // Añadir la opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = '- Seleccione el hardware -';
        defaultHardwareSelect.appendChild(defaultOption);

        hardwareData.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.text = item.nombre;
            defaultHardwareSelect.appendChild(option);
        });

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.classList.add('text-red-500', 'hover:text-red-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-red-500', 'font-medium', 'rounded-lg');
        removeButton.innerHTML = `<svg class="w-6 h-6 text-red-700 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>`;
        removeButton.onclick = () => {
            if (hardwareContainer.querySelectorAll('select').length > 1) {
                defaultHardwareField.remove();
            } else {
                alert('Debe haber al menos un hardware.');
            }
        };

        defaultHardwareField.appendChild(defaultHardwareSelect);
        defaultHardwareField.appendChild(removeButton);
        hardwareContainer.appendChild(defaultHardwareField);
    }

    if (softwareContainer.querySelectorAll('select').length === 0) {
        const defaultSoftwareField = document.createElement('div');
        defaultSoftwareField.classList.add('flex', 'items-center', 'space-x-2', 'mb-2');

        const defaultSoftwareSelect = document.createElement('select');
        defaultSoftwareSelect.name = 'equipoSoftware[]';
        defaultSoftwareSelect.classList.add('bg-gray-50', 'border', 'border-gray-300', 'text-gray-900', 'text-sm', 'rounded-lg', 'block', 'w-full', 'p-2.5', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:placeholder-gray-400', 'dark:text-white', 'dark:focus:ring-primary-500', 'dark:focus:border-primary-500');

        // Añadir la opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = '- Seleccione el software -';
        defaultSoftwareSelect.appendChild(defaultOption);

        softwareData.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.text = item.nombre;  // Ajusta esto según la estructura de tu objeto software
            defaultSoftwareSelect.appendChild(option);
        });

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.classList.add('text-red-500', 'hover:text-red-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-red-500', 'font-medium', 'rounded-lg');
        removeButton.innerHTML = `<svg class="w-6 h-6 text-red-700 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>`;
        removeButton.onclick = () => {
            if (softwareContainer.querySelectorAll('select').length > 1) {
                defaultSoftwareField.remove();
            } else {
                alert('Debe haber al menos un software.');
            }
        };

        defaultSoftwareField.appendChild(defaultSoftwareSelect);
        defaultSoftwareField.appendChild(removeButton);
        softwareContainer.appendChild(defaultSoftwareField);
    }
}

function addField(type, edit) {
    let container = '';
    edit ? container = document.getElementById(`${type}-container${edit}`) : container = document.getElementById(`${type}-container`);
    if (!container) return;

    const newField = document.createElement('div');
    newField.classList.add('flex', 'items-center', 'space-x-2', 'mb-2');

    const newSelect = document.createElement('select');
    newSelect.name = `equipo${type.charAt(0).toUpperCase() + type.slice(1)}[]`;
    newSelect.classList.add('bg-gray-50', 'border', 'border-gray-300', 'text-gray-900', 'text-sm', 'rounded-lg', 'block', 'w-full', 'p-2.5', 'dark:bg-gray-700', 'dark:border-gray-600', 'dark:placeholder-gray-400', 'dark:text-white', 'dark:focus:ring-primary-500', 'dark:focus:border-primary-500');

    // Añadir la opción por defecto
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = type === 'hardware' ? '- Seleccione el hardware -' : '- Seleccione el software -';
    newSelect.appendChild(defaultOption);

    const defaultOptions = type === 'hardware' ? hardwareData : softwareData;
    defaultOptions.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.text = item.nombre;
        newSelect.appendChild(option);
    });

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.classList.add('text-red-500', 'hover:text-red-700', 'focus:outline-none', 'focus:ring-2', 'focus:ring-red-500', 'font-medium', 'rounded-lg');
    removeButton.innerHTML = `<svg class="w-6 h-6 text-red-700 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>`;
    removeButton.onclick = () => {
        if (container.querySelectorAll('select').length > 1) {
            newField.remove();
        } else {
            alert(`Debe haber al menos un ${type}.`);
        }
    };

    newField.appendChild(newSelect);
    newField.appendChild(removeButton);
    container.appendChild(newField);
}

const addHardwareBtn = document.getElementById('add-hardware-btn');
const addSoftwareBtn = document.getElementById('add-software-btn');
const addHardwareBtnEdit = document.getElementById('add-hardware-btn-edit');
const addSoftwareBtnEdit = document.getElementById('add-software-btn-edit');

if (addHardwareBtn) {
    addHardwareBtn.onclick = () => addField('hardware');
}

if (addSoftwareBtn) {
    addSoftwareBtn.onclick = () => addField('software');
}

if (addHardwareBtnEdit) {
    addHardwareBtnEdit.onclick = () => addField('hardware', '-edit');
}

if (addSoftwareBtnEdit) {
    addSoftwareBtnEdit.onclick = () => addField('software', '-edit');
}


document.addEventListener('DOMContentLoaded', loadData);