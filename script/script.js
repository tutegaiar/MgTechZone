//Creamos la clase del producto
class producto{
  constructor (nombre,precio,cantidad){
    this.nombre=nombre.toUpperCase();
    this.precio=precio;
    this.cantidad=parseInt(cantidad);
  }
}
//creamos la clase carrito y sus respectivas funciones
class Carrito{
  constructor(){
    this.productos=JSON.parse(localStorage.getItem('productos'))||[];
  }
//funcion para agregar prodcutos
agregarProducto(producto) {
  if(producto!=null){
    this.productos.push(producto);
    
    //se actualiza el localstorage
    localStorage.setItem('productos',JSON.stringify(this.productos));
    const eliminar = document.getElementsByClassName("mostrarProductos");
    eliminar.innerHTML="";
  }

}
//esta funcion nos sirve para calcular el total
calcularTotal(){
  return this.productos.reduce((total,producto)=>total + producto.precio,0);
}
// esta siguiente funcion imprime los productos y cuando hay porductos en el carrito crea los botones de eliminar todos los productos, creo que ahi esta el problema de mi codigo
imprimirProductos(){
  if (localStorage.getItem('productos') !== null) {
    const mostrarProductos = document.querySelector(".mostrarProductos");
    mostrarProductos.innerHTML = " "; // Limpiamos el contenido previo del contenedor
    this.productos.forEach(producto => {
      // Creamos un nuevo elemento de párrafo para cada producto y lo agregamos al contenedor
      const nuevoProducto = document.createElement("p");
      nuevoProducto.textContent = `${producto.nombre} - Precio: $${producto.precio}`;
      mostrarProductos.appendChild(nuevoProducto);
    })
    let nuevoBoton = document.createElement("button")
    nuevoBoton.id="eliminarCarritoBoton";
    nuevoBoton.textContent="Eliminar productos del carrito";
    mostrarProductos.appendChild(nuevoBoton);

    //este segundo boton el el que se crea a donde se va a poner el total del carrito pero es en otro contenedor
    let mostrarTotal=document.querySelector(".resumenDeCompra")
  mostrarTotal.innerHTML=" ";
  let nuevoTotal=document.createElement("p");
  nuevoTotal.textContent=`El total del carrito es $${this.calcularTotal()}`;
  mostrarTotal.appendChild(nuevoTotal);
  let botonComprar = document.createElement("button")
    botonComprar.textContent="Finalizar Compra";
    mostrarTotal.appendChild(botonComprar);
  }
}

//funcion que todavia no implemente pero eliminaria de a uno los productos
eliminarProducto(nombreProducto){
  this.productos=this.productos.filter(producto=>producto.nombre!==nombreProducto);
  localStorage.setItem('productos',JSON.stringify(this.productos));
}
//la funcion que contiene el problema...
vaciarCarrito(){
  this.productos=[];
  localStorage.removeItem('productos');
  
  
 }
}

//introducimos las variables con cada uno de los productos (no se si esta bien armar 1 producto pot variable)
let notebook=new producto("notebook lenovo",331735,5);
let procesador=new producto("amd ryzen 7 5700g",300000,3);
let mother= new producto("Mother mpg b550 gaming",267000,0);
let mouse= new producto("mouse g pro superlight blanco",130000,10);
let ram=new producto("Memoria 16gb 2300mhz",40000,20);

//creamos el carrito
const carrito = new Carrito();
//agregamos el evento para agregar al carrito
const botonAgregar= document.getElementById("producto1");
if(botonAgregar){
  botonAgregar.addEventListener("click",()=>{
    carrito.agregarProducto(notebook);
  
  })
}
// y agregamos el evento para eliminar todo el carrito
const vaciarCarritoBoton = document.getElementById("eliminarCarritoBoton");
if (vaciarCarritoBoton) {
  vaciarCarritoBoton.addEventListener("click", () => {
    console.log("Eliminando todos los productos...");
    carrito.vaciarCarrito();
  });
}

//imprimimos el contenido del carrito que puede ser vacio
carrito.imprimirProductos();
