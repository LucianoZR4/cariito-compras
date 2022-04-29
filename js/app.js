// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

// funciones
function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    //Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito=[];//Reseteamos el arreglo

        vaciarCarrito();//Eliminamos el html
    })

}


// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);
     }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')

        //Elimina del arreglo articuloCarrito por el data id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);
        
        carritoHTML(); //Iterar sobr el carrito y mostrar su HTML
    }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }

     //revisa si un objeto ya pertenece al carrito
     const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
     if(existe){
         //Actualizamos la cantidad
         const cursos = articulosCarrito.map( curso =>{
             if(curso.id === infoCurso.id){
                 curso.cantidad++;
                 return curso; //retorna el objeto actualizado
             }else{
                return curso; // retorna los objetos que no son duplicados pero son importante para nuestro carrito
             }
         });
         articulosCarrito = [...cursos];
     }else{
         //Agregamos el curso al carrito
         articulosCarrito = [...articulosCarrito, infoCurso];
     }


     //Agrega elementos al arreglo de carrito
    

    console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
         const {imagen, titulo, precio, cantidad, id} = curso;
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${imagen}" width=100>
               </td>
               <td>
                  ${titulo}
               </td>
               <td>
                  ${precio}
               </td>
               <td>
                  ${cantidad}
               </td>
               <td>
                  <a href="#" class="borrar-curso" data-id="${id}" > X </a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}
