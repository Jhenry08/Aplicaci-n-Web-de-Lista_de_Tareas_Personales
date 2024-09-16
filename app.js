

document.addEventListener("DOMContentLoaded", () => {
    const formTarea = document.getElementById('form-tarea');
    const listaTareas = document.getElementById('lista-tareas');
    const listaTareasCompletadas = document.getElementById('lista-tareas-completadas');

   
    cargarTareas();

   
    formTarea.addEventListener('submit', (e) => {
        e.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const descripcion = document.getElementById('descripcion').value;
        const prioridad = document.getElementById('prioridad').value;

        if (titulo) {
            agregarTarea(titulo, descripcion, prioridad);
        }
    });

    
    function cargarTareas() {
        fetch('/api/tareas')
            .then(response => response.json())
            .then(tareas => {
                listaTareas.innerHTML = '';
                listaTareasCompletadas.innerHTML = '';

                tareas.forEach(tarea => {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        ${tarea.titulo} (${tarea.prioridad})
                        <button class="complete" data-id="${tarea.id_tarea}">Completada</button>
                        <button class="delete" data-id="${tarea.id_tarea}">Eliminar</button>
                    `;
                    if (tarea.estado) {
                        li.classList.add('completed');
                        listaTareasCompletadas.appendChild(li);
                    } else {
                        listaTareas.appendChild(li);
                    }

                    // Evento para completar la tarea
                    li.querySelector('.complete').addEventListener('click', (e) => {
                        completarTarea(tarea.id_tarea);
                    });

                    // Evento para eliminar la tarea
                    li.querySelector('.delete').addEventListener('click', (e) => {
                        eliminarTarea(tarea.id_tarea);
                    });
                });
            });
    }

    
    function agregarTarea(titulo, descripcion, prioridad) {
        fetch('/api/tareas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titulo, descripcion, prioridad })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                cargarTareas();
                formTarea.reset();
            });
    }

  
    function completarTarea(id) {
        fetch(`/api/tareas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ estado: true })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                cargarTareas();
            });
    }

   
    function eliminarTarea(id) {
        fetch(`/api/tareas/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                cargarTareas();
            });
    }
});
