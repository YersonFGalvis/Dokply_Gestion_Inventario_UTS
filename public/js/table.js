document.addEventListener("DOMContentLoaded", function () {
  const tableElement = document.getElementById('table');
  const datos = JSON.parse(tableElement.getAttribute('data-datos'));
  const columnsData = tableElement.getAttribute('data-columnas');
  const entity = tableElement.getAttribute('data-entity');
  const rowData = tableElement.getAttribute('data-filas');
  const rowDataArray = JSON.parse(rowData);

  let activoData = null;
  let isActive = null;
  const indexActivo = rowDataArray.findIndex(expr => expr === 'data.activo');

  if (indexActivo !== -1) {
    rowDataArray.splice(indexActivo, 1);
    activoData = 'data.activo';
  }

  const crearBotones = (id, entity, activo) =>

    `
  <button 
    id="modal_edit"
    data-id="${id}"
    class="group text-blue-700 border border-blue-700 font-medium rounded-lg text-sm px-5 text-center me-2 mb-2 hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 py-2.5 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
    data-action="edit"
    data-entity="${entity}">
    <svg class="w-6 h-6 text-blue-700 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
    </svg>
  </button>
  ${entity !== 'registroMantenimiento' && entity !== 'usuario' ? `
  <button 
    id="modal_delete" 
    data-id="${id}"
    class="group text-red-700 border border-red-700 font-medium rounded-lg text-sm px-5 text-center me-2 mb-2 hover:text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 py-2.5 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
    data-action="delete"
    data-entity="${entity}">
    <svg class="w-6 h-6 text-red-700 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
    </svg>
  </button>
  ` : ''}
  ${entity == 'usuario' && activo ? `
    <button 
      id="modal_desactivar"
      data-id="${id}"
      class="group text-red-700 border border-red-700 font-medium rounded-lg text-sm px-5 text-center me-2 mb-2 hover:text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 py-2.5 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
      data-action="active"
      data-entity="${entity}">
      <svg class="w-6 h-6 text-red-700 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
      </svg>
    </button>
    ` : ''}
    ${entity == 'usuario' && !activo ? `
      <button 
      id="modal_activar" 
      data-id="${id}"
      class="group text-green-700 border border-green-700 font-medium rounded-lg text-sm px-5 text-center me-2 mb-2 hover:text-white hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 py-2.5 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900"
      data-action="active"
      data-entity="${entity}">
      <svg class="w-6 h-6 text-green-700 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
        <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
      </svg>
    </button>
      ` : ''}
  `;

  const renderTable = () => {
    window.Data = Array.isArray(datos) ? datos : [];
    const tableContainer = document.getElementById('table');

    // Limpiar el contenedor antes de renderizar la nueva tabla
    tableContainer.innerHTML = '';

    new gridjs.Grid({
      search: true,
      pagination: {
        limit: 5,
      },
      sort: true,
      resizable: true,
      language: {
        'search': {
          'placeholder': 'Buscar'
        },
        'pagination': {
          'previous': 'Anterior',
          'next': 'Siguiente',
          'showing': 'Mostrando',
          'to': 'a',
          'of': 'de',
          'results': () => 'Registros'
        },
        'empty': {
          'message': 'No hay datos disponibles'
        },
      },
      columns: eval(columnsData),
      data: window.Data.map(data => {
        const rowValues = rowDataArray.map(expr => eval(expr));
        if (activoData) {
          isActive = eval(activoData);
        }
        return [...rowValues, gridjs.html(crearBotones(data.id, entity, isActive))];
      }),
      style: {
        table: {
          'font-size': '15px'
        },
        td: {
          'padding': '1rem',
          'font-size': '0.875rem',
          'font-weight': '400',
          'color': '#1f2937',
          'white-space': 'normal',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
          'word-wrap': 'break-word',
          'max-width': '200px'
        },
        tr: {
          'hover': 'green-100'
        }
      }
    }).render(tableContainer);
  };

  // Renderizar tabla inicial
  renderTable();

  // Exponer función para actualizar la tabla desde el script del modal
  window.updateTable = () => {
    let response = '';
    if (entity === 'software' || entity === 'hardware') {
      response = fetch(`/${entity}?format=json`)
    } else {
      response = fetch(`/${entity}s?format=json`)
    }
    response
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        window.Data = data.data; // Actualiza los datos globales
        renderTable(); // Renderiza la tabla con los datos actualizados
      })
      .catch(error => {
        console.error('Error al obtener datos actualizados1:', error);
      });
  };
});