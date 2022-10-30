const contenedorCursos = document.getElementById("contenedorCursos")
const contenedorCarrito = document.getElementById("contenedorCarrito")
let carrito = []
const vaciarCarrito = document.getElementById("vaciarCarrito")
const contadorCarrito = document.getElementById("contadorCarrito")
const precioTotal = document.getElementById("precioTotal")



document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
        actualizarCarrito()
    }
})

let cursos = [
  {
    "id": 1,
    "nombre": "aprende javascript",
    "cantidad": 1,
    "descripcion": "aprender ja",
    "precio": 9.99,
    "valoraciones": 3645,
    "puntuacion": 3.4
  },
  {
    "id": 2,
    "nombre": "aprende java",
    "cantidad": 1,
    "descripcion": "aprender ja",
    "precio": 9.99,
    "valoraciones": 3615,
    "puntuacion": 3.9
  },
  {
    "id": 3,
    "nombre": "aprende html",
    "cantidad": 1,
    "descripcion": "aprender ht",
    "precio": 9.99,
    "valoraciones": 1645,
    "puntuacion": 3.1
  }
]


cursos.forEach((curso) => {
    const desc = document.createElement('div');
    desc.className = "col-12 col-md-6 col-lg-4 d-flex justify-content-center"

  desc.innerHTML = `
 

  <div class="card" style="width: 18rem;">
      <img src="fotos/java.jpg" class="card-img-top" alt="...">
      <div class="card-body">
          <div class="tooltip1">
              <p class="tituloCurso">${curso.nombre}</p>

              <div class="tooltiptext">
                  <div>
                      <h3>${curso.nombre}</h3>
                      <p>${curso.descripcion}</p>
                  </div>
                  <button>agregar al carrito</button>
              </div>

          </div>

      </div>
      <div class="contenedorEstrellas">
          <p>${curso.puntuacion}</p>
          <div id="resenas">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
          </div>
          <p>(${curso.valoraciones})</p>
      </div>
      <p class="precio">${curso.precio}€</p>
      <button id="agregar${curso.id}" class="botonAnadir">anadir</button>
  </div>

    
    

    `

    contenedorCursos.appendChild(desc)
  const boton = document.getElementById(`agregar${curso.id}`)
  boton.addEventListener("click", () => {
      agregarCarrito(curso.id)
      
  })

 
})



 



const agregarCarrito = (cursoID) => {
    const existe = carrito.some((curso) => curso.id == cursoID)

    if (existe) {
        const curso = carrito.map(curso => {
            if (curso.id == cursoID) {
                curso.cantidad++
            }
        })
    } else {
        const item = cursos.find((curso) => curso.id == cursoID)
        carrito.push(item)

    }


    actualizarCarrito()
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""
    carrito.forEach((curso) => {
        const div = document.createElement("div")
        div.className="cursoCarrito"
        div.innerHTML = `
            <p>${curso.nombre}</p>
            <p>${curso.cantidad}</p>
            <button onclick="eliminarDelCarrito(${curso.id})" class="botonEliminar">eliminar</button>
        `

        contenedorCarrito.appendChild(div)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    })


    contadorCarrito.innerText =  carrito.reduce((acc1, curso) => acc1 = acc1 + curso.cantidad, 0)+" elementos"
    precioTotal.innerText = carrito.reduce((acc, curso) => acc = acc + curso.precio*curso.cantidad, 0)+" €"
   

}

const eliminarDelCarrito = (cursoID) => {
    const item = carrito.find((curso) => cursoID == curso.ID)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()

}

vaciarCarrito.addEventListener("click", () => {
    carrito.length = 0
    actualizarCarrito()
})


//falta el carrito bien diseño
// que al anadir salga pop up
//footer


