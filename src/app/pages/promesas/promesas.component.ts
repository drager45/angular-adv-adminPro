import { Component, OnInit, resolveForwardRef } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  //configuramos nuestra primer promesa
  ngOnInit(): void {
    //Las promesas son muy utilizadas cuando queremos ejecutar tareas de manera a destiempo
    //o cuando queremos ejecutar algo despues de que alguna tarea suceda o algun procedimiento termine
    //el ejemplo de abajo es una promesa basica.

    //son parte de javScript, cuando se declara una promesa se debe agregar el cuerpo
    //de la misma el cual es sincrono y es parte del hilo principal
    /*const promesa = new Promise( ( resolve, reject ) => {

      //pero en dado caso que queramos manejar el error
      if (false) {
        //usamos el resolve cuando la promesa se ejecuta correctamente
        resolve('Hola mundo');
      } else {
        //Nos permite  regresar  el resultado de cuando ocurre un error
        reject('Algo salio mal');
      }

    });

    //para poder ver el resultado de nuestra promesa nosotros debemos
    //subscribirnos para obtener el resultado y eso lo realizamos de la siguiente forma:
    //este procedimiento es el que asincrono
    //en este caso si quermeos obtener el resultado del resolve lo debemos agregar como un argumento
    //Pero en dado caso de que  ocurra un error y lo queramos atrapar nosotros debemos usar lo siguiente
    promesa.then( (mensaje) => {
      console.log(mensaje);
    })
    .catch(error => console.log('Error en mi promesa', error ));

    console.log('Fin del init');*/

    //d esta forma podemos trabajar con una promesa
    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    });

  }

  getUsuarios() {
    //generamos una promesa que nos permite obtener la informacion de usuarios
    //con fetch que es propio de javaScript, esta resuleve algo de Tipo Response
    /*fetch('https://reqres.in/api/users')
      .then( resp => {
      //para poder obtener la informacion de nuestra peticion vamos a utilizar
      //json la cual tambien regresa una promesa
      resp.json().then( body => console.log(body))
      }
    );*/

    //lo que vamos a realizar es regresar el resultado de nuestra peticion como una promesa
    //para poder trabajar con la informacion
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => resolve(body.data));
    });
  }

}
