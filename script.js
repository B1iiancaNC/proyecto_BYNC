const URL_API = 'http://localhost:5000/api/pacientes';


document.addEventListener('DOMContentLoaded', obtenerPacientes);

// Guarda  a los pacientes
document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const datos = {
        nombre: document.getElementById('nombre').value,
        edad: document.getElementById('edad').value,
        sexo: document.getElementById('sexo').value,
        ocupacion: document.getElementById('ocupacion').value,
        diagnostico: document.getElementById('diagnostico').value,
        tratamiento: document.getElementById('tratamiento').value
    };

    try {
        const respuesta = await fetch(URL_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        if (respuesta.ok) {
            alert('¡Paciente guardado en MongoDB! 🚀');
            document.getElementById('formulario').reset(); 
            obtenerPacientes(); 
        } else {
            alert('Hubo un error al guardar.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Obtener y mostrar la lista de pacientes
async function obtenerPacientes() {
    try {
        const respuesta = await fetch(URL_API);
        const pacientes = await respuesta.json();
        
        const contenedor = document.getElementById('lista-pacientes');
        if (!contenedor) return; // Por si acaso estás en otro HTML que no tiene la lista
        
        contenedor.innerHTML = ''; 

        pacientes.forEach(paciente => {
            const div = document.createElement('div');
            div.style.border = "1px solid #ccc";
            div.style.padding = "10px";
            div.style.margin = "10px 0";
            div.style.borderRadius = "5px";
            
            div.innerHTML = `
                <p><strong>Nombre:</strong> ${paciente.nombre} (${paciente.edad} años)</p>
                <p><strong>Sexo:</strong> ${paciente.sexo} | <strong>Ocupación:</strong> ${paciente.ocupacion}</p>
                <p><strong>Diagnóstico:</strong> ${paciente.diagnostico}</p>
                <p><strong>Tratamiento:</strong> ${paciente.tratamiento}</p>
                <button onclick="eliminarPaciente('${paciente._id}')" style="background-color: #ff4d4d; color: white; border: none; padding: 5px 10px; cursor: pointer; border-radius: 3px;">
                    Eliminar
                </button>
            `;
            contenedor.appendChild(div);
        });
    } catch (error) {
        console.error('Error al obtener los pacientes:', error);
    }
}

// Eliminar un paciente
async function eliminarPaciente(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
        try {
            const respuesta = await fetch(`${URL_API}/${id}`, {
                method: 'DELETE'
            });

            if (respuesta.ok) {
                alert('Paciente eliminado correctamente.');
                obtenerPacientes(); 
            } else {
                alert('No se pudo eliminar.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
