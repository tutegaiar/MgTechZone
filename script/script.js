//Creamos la clase del producto
class producto {
  constructor(nombre, precio, cantidad) {
    this.nombre = nombre.toUpperCase();
    this.precio = precio;
    this.cantidad = parseInt(cantidad);
  }
}
//creamos la clase carrito y sus respectivas funciones
class Carrito {
  constructor() {
    this.productos = JSON.parse(localStorage.getItem('productos')) || [];
  }
  //funcion para agregar prodcutos
  agregarProducto(producto) {
    if (producto != null) {
      this.productos.push(producto);
      let notificacionCarrito = document.querySelector(".puntoRojo"); 
      notificacionCarrito.style.setProperty("visibility", "visible");
   

      //se actualiza el localstorage
      localStorage.setItem('productos', JSON.stringify(this.productos));
      const eliminar = document.getElementsByClassName("mostrarProductos");
      eliminar.innerHTML = "";
    }

  }
  //esta funcion nos sirve para calcular el total
  calcularTotal() {
    return this.productos.reduce((total, producto) => total + producto.precio, 0);
  }
  //funcion para eliminar productos
  eliminarProducto(indiceProducto) {
    this.productos.splice(indiceProducto, 1);
    localStorage.setItem('productos', JSON.stringify(this.productos));
    if (localStorage.getItem('productos') === '[]') {
      localStorage.removeItem('productos');
    }
    location.reload();
  }
  //boton para vaciar el carrito
  vaciarCarrito() {
    this.productos = [];
    localStorage.removeItem("productos");
    this.imprimirProductos();
    location.reload(); // Encontre esta funcion que me actualiza el dom 

  }
  // esta siguiente funcion imprime los productos y cuando hay porductos en el carrito crea los botones de eliminar todos los productos
  imprimirProductos() {
    if (localStorage.getItem('productos') !== null) {
      const mostrarProductos = document.querySelector(".mostrarProductos");
      mostrarProductos.innerHTML = " "; // Limpiamos el contenido previo del contenedor
      this.productos.forEach(producto => {
        // Creamos un nuevo elemento de párrafo para cada producto y lo agregamos al contenedor
        const nuevoProductoContenedor = document.createElement("div");
        nuevoProductoContenedor.className = "productoContainer";
        const nuevoProducto = document.createElement("p");
        nuevoProducto.id = "produc";
        nuevoProducto.textContent = `${producto.nombre} - Precio: $${producto.precio}`;
        const imagenBasura = document.createElement("img");
        imagenBasura.id = "basura";
        imagenBasura.src = "../imagenes/compartimiento.png";
        imagenBasura.alt = "basura";
        imagenBasura.classList.add("eliminarProucto");
        imagenBasura.addEventListener("click", () => {
          const indiceProducto = this.productos.findIndex(p => p.nombre === producto.nombre);
          this.eliminarProducto(indiceProducto);
          this.imprimirProductos();
        });
        nuevoProductoContenedor.appendChild(nuevoProducto);
        nuevoProductoContenedor.appendChild(imagenBasura);
        mostrarProductos.appendChild(nuevoProductoContenedor);
      })
      let nuevoBoton = document.createElement("button")
      nuevoBoton.id = "eliminarCarritoBoton";
      nuevoBoton.textContent = "Eliminar productos del carrito";
      mostrarProductos.appendChild(nuevoBoton);
      nuevoBoton.addEventListener("click", () => {
        this.vaciarCarrito();
      })

      //este segundo boton el el que se crea a donde se va a poner el total del carrito
      let mostrarTotal = document.querySelector(".resumenDeCompra")
      mostrarTotal.innerHTML = " ";
      let nuevoTotal = document.createElement("p");
      nuevoTotal.textContent = `El total del carrito es $${this.calcularTotal()}`;
      mostrarTotal.appendChild(nuevoTotal);
      let botonComprar = document.createElement("button")
      botonComprar.id = "botonComprar";
      botonComprar.textContent = "Finalizar Compra";
      mostrarTotal.appendChild(botonComprar);
    }
  }


}

//introducimos las variables con cada uno de los productos (no se si esta bien armar 1 producto po variable)
let notebook = new producto("notebook lenovo", 331735, 5);
let procesador = new producto("amd ryzen 7 5700g", 300000, 3);
let mother = new producto("Mother mpg b550 gaming", 267000, 0);
let mouse = new producto("mouse g pro superlight blanco", 130000, 10);
let ram = new producto("Memoria 16gb 2300mhz", 40000, 20);

//creamos el carrito
const carrito = new Carrito();
//creamos una funcion para el evento click que aparte trae las alertas de sweetalert2
function clikearBoton(boton, producto) {
  if (boton) {
    boton.addEventListener("click", () => {
      let contadorProductosNotificacion = document.querySelector(".puntoRojo");
      contadorProductosNotificacion.innerHTML = `${carrito.productos.length+1}`;
      if (producto.cantidad > 0) {
        carrito.agregarProducto(producto);
        Swal.fire({
          position: "top-start",
          icon: "success",
          toast: true,
          title: "Se agrego el producto al carrito",
          showConfirmButton: false,
          backdrop: false,
          timer: 1500
        });
        producto.cantidad--;
      } else {
        Swal.fire({
          position: "top-start",
          icon: "error",
          title: "No hay stock del prodcuto",
          toast: true,
          showConfirmButton: false,
          backdrop: false,
          timer: 1500
        });
      }

    });
  }
}
//agregamos el evento para agregar al carrito
const botonAgregarNotebook = document.querySelector("#producto1", ".AgregarAlCarrito");
clikearBoton(botonAgregarNotebook, notebook);
const botonAgregarProcesador = document.querySelector("#producto2", ".AgregarAlCarrito");
clikearBoton(botonAgregarProcesador, procesador);
const botonAgregarMother = document.querySelector("#producto3", ".agregarAlCarrito");
clikearBoton(botonAgregarMother, mother);
const botonAgregarMouse = document.querySelector("#producto4", ".agregarAlCarrito");
clikearBoton(botonAgregarMouse, mouse);
const botonAgregarRam = document.querySelector("#producto5", ".agregarAlCarrito");
clikearBoton(botonAgregarRam, ram);
//imprimimos el contenido del carrito que puede ser vacio
carrito.imprimirProductos();
