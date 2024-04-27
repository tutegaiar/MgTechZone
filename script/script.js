/*const productos = [{ id: 1, producto: "Arroz" },
                  { id: 2,  producto: "Fideo" },
                  { id: 3,  producto: "Pan" }];

for (const producto of productos) {
    console.log(producto.id);
    console.log(producto.producto);
}*/
/*let integrantes=[];
let entrada = prompt("ingrese nombre del jugador");
while(entrada!="esc"){
integrantes.push(entrada);
entrada=prompt("ingrese oro jugador o escriba 'esc' para salir")
}
console.log(integrantes);*/
/*let entrada = prompt("INGRESAR JUGADOR");
const equipo = [];
while (entrada != 'ESC') {
    equipo.push(entrada);
    entrada = prompt("INGRESAR JUGADOR");
}
for (let index = 0; index < equipo.length; index++) {
    alert("POSICION " + index + " JUGADOR " + equipo[index])
}*/


/*class jugador {
    constructor (nombre,nro,edad){
        this.nombre = nombre.toUpperCase();
        this.nro = nro;
        this.edad = parseInt(edad);
        this.lesionado = false;
       }
       }
       let jugadores=[];
       jugadores.push(new jugador("tute",7,24));
       jugadores.push(new jugador("gordu",6,23));
       jugadores.push(new jugador("pabi",15,24));
       jugadores.push(new jugador('rama',2,23));
       jugadores.push(new jugador("bro",10,24));
    
       /*function busqueda (jugadores , nombre){
        return jugadores.find((el)=>el.nombre===nombre.toUpperCase())

    }
    for(let i=1;i<=3;i++){
        let buscar=busqueda(jugadores,prompt("ingrese el nombre del jugador"))
            if(buscar!=undefined){
                alert("El juador es " + buscar.nombre + " y lleva el nro " + buscar.nro);
            }
            else{
                alert("No existe ese jugador");
            }
        }*/
        /*function filtroJugadores(jugadores,edad){
            return jugadores.filter((el)=>el.edad===edad)
                }
                let filtrar=filtroJugadores(jugadores,23);
                console.log(filtrar)
             */

let carrito=[];
indiceCarrito=0;
function buscarProducto(productos,nombre){
  return productos.find((el)=>el.nombre===nombre.toUpperCase())
};
let entrada=0;
let respuesta="";

function filtrarProductos(productos,precio){
  return productos.filter((el)=>el.precio<=precio)
};
function eliminarProductoDelCarrito(carrito, productos) {
  if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
  }
  // Preguntamos al usuario si desea eliminar el último producto del carrito
  let respuesta = prompt("¿Desea eliminar el último producto del carrito? (si/no)");
  if (respuesta == "si") {
      // Obtenemos el último producto del carrito y lo buscamos en la lista de los productos originales
      let productoAEliminar = carrito[carrito.length - 1];
      let productoOriginal = buscarProducto(productos, productoAEliminar.nombre);
      
      productoOriginal.cantidad++;
      carrito.pop();
      alert("Producto eliminado del carrito: " + productoAEliminar.nombre);
  }
};
//utilizo la siguiente funcion para pasar on objeto a una cadena de texto ya que con alert no lo puedo mostrar
function objetoACadena(filtrarProductos){
  return `Nombre: ${filtrarProductos.nombre}, Precio: $${filtrarProductos.precio}, stock: ${filtrarProductos.cantidad} ` 
}

/*creamos la clase para contruir los productos */
class producto{
  constructor (nombre,precio,cantidad){
    this.nombre=nombre.toUpperCase();
    this.precio=precio;
    this.cantidad=parseInt(cantidad);
  }
}
/*ingresamos los productos a la base da datos */
let productos=[];
productos.push (new producto("notebook lenovo",331735,5));
productos.push (new producto("amd ryzen 7 5700g",300000,3));
productos.push (new producto("Mother mpg b550 gaming",267000,0));
productos.push (new producto("mouse g pro superlight blanco",130000,10));
productos.push (new producto("Memoria 16gb 2300mhz",40000,20));


do {
    entrada = parseInt(prompt("Bienvenido al carrito de MG TECH ZONE\n1- INGRESAR UN PRODUCTO\n2- ELIMINAR UN PRODUCTO\n3- FILTRAR POR PRECIO\n4- VISTA PREVIA DEL CARRITO\nIngrese una opción (0 para salir)"));

    switch (entrada) {
        case 1:
          alert ("Agregar un producto")
            let ingresarProducto = buscarProducto(productos,prompt("ingrese el nombre del producto"));
            if(ingresarProducto.nombre!=undefined){
             if(ingresarProducto.cantidad>0){
              carrito.push(ingresarProducto);
              ingresarProducto.cantidad--;
             }
             else{
              alert("No hay mas stock de " + ingresarProducto.nombre);
             }
          }
          else{
              alert("No existe este producto");
          }
            break;
            case 2:
              alert("Eliminar un producto");
              eliminarProductoDelCarrito(carrito, productos);
              break;

        case 3:
          alert("FILTRO DE PRODUCTOS");
                let filtrar=filtrarProductos(productos,prompt("ELIJA EL PRECIO MAXIMO DE LOS PRODUCTOS QUE DESEA VER"));
                console.log(filtrar);
                let mensajes = filtrar.map(objetoACadena);
  let mensajeFinal = mensajes.join("\n");
  alert("Productos:\n" + mensajeFinal);

          
            break;
        case 4:
          let acumuladorCarrito=0;
          carrito.forEach(producto => {
            alert(`Producto: ${producto.nombre} | Precio: $${producto.precio}`);
            acumuladorCarrito += producto.precio;
        });
        alert(`El precio total del carrito es: $${acumuladorCarrito}`)

            break;
        default:
            if (entrada !== 0) {
                alert("Opcion no valida. Por favor, seleccione una opcion valida.");
            }
    }
} while (entrada !== 0);
carrito.forEach(carrito => {console.log("Producto:", carrito.nombre, "| Precio:", carrito.precio);} );
console.log(productos);
