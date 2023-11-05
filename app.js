//variables
const formulario = document.querySelector("#formulario");
const tituloform = document.querySelector("#titulo-form");
const task = document.querySelector(".tareas");
const total = document.querySelector("#total");
const completadas = document.querySelector("#completadas");
let tareas = [];


//eventos
(()=>{
    formulario.addEventListener("submit", validarFormulario);
    task.addEventListener("click", eliminarTarea);
    task.addEventListener("click", tareaCompletada);
})()


//funciones
function validarFormulario(e){
    e.preventDefault();

    //validar datos del input
    const tarea = document.querySelector("#tarea").value;
    
    if(!tarea.trim()){
        tituloform.textContent = 'Formulario Vacío';

        setTimeout( ()=>{
            tituloform.textContent = 'Formulario';
        }, 2000 )
        return
    }

    //crear objeto
    const objTarea = {
        id: Date.now(),
        tarea: tarea,
        estado: false
    }
    
    tareas = [...tareas, objTarea];
    formulario.reset();

    mostrarHTML();
}

function mostrarHTML(){
    task.innerHTML = '';

    if(tareas.length < 1){
        const mensaje = document.createElement("h5");
        mensaje.textContent = "Sin Tareas";
        return
    }
        
    tareas.forEach( (item) => {
        const itemTarea = document.createElement("div");
        itemTarea.classList.add("item-tarea");
        itemTarea.innerHTML = `
            ${item.estado ? (
                `<p class="completa"> ${item.tarea} </p>`
            ) : (
                `<p>${item.tarea}</p>`
                )   }
            <div class="botones">
                <button data-id="${item.id}" class="eliminar">❌</button>
                <button data-id="${item.id}" class="completada">✔</button>
            </div>
        `;

        task.appendChild(itemTarea);
    })

    //Mostrar total y completadas
    const totalTareas = tareas.length;
    total.textContent = `Total tareas: ${totalTareas}`;

    const tareasCompletadas = tareas.filter( item => item.estado === true).length;
    completadas.textContent = `Completadas: ${tareasCompletadas}`;
}

function eliminarTarea(e){
    if(e.target.classList.contains("eliminar")){
        const tareaId = Number(e.target.getAttribute("data-id"));
        
        //eliminar tarea
        const nuevoTask = tareas.filter( (item) => item.id !== tareaId);
        tareas = nuevoTask;
        mostrarHTML();
    }
}

function tareaCompletada(e){
    if(e.target.classList.contains("completada")){
        const tareaId = Number(e.target.getAttribute("data-id"));
        
        //completar tarea
        const nuevoTask = tareas.map( (item) =>{
            if(item.id === tareaId){
                item.estado = !item.estado;
                return item;
            } else{
                return item;
            }
        })
        mostrarHTML();
    }
}