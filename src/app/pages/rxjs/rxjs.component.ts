import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervaloSubs: Subscription;

  constructor() {

    /*//En este caso no se esta emitiendo este valor en nuestro log
    //ya que no se encuentra nadie subscrito a nuestro observable
    //por eso no se va a disparar hasta que se tenga alguien subscrito a este
    //lo unico que se necesita es lo siguiente, para que nuestro observable
    //pueda trabajar
    this.retornaObservable().pipe(
      //la funcion pipe nos permite transformar la informacion que pasa por nuestro observable
      //y tambien nos permite reintentar el proceso de nuestro observable
      //no sotros podemos poner cuantas veces lo puede intentar
      retry(1)
    ).subscribe(
      //pero ahora queremos obtener el valor de nuestro observable
      //pero nuestro mensaje no se muestra por que nuestro observable
      //no esta emitiendo ningun valor
      valor => console.log('Subs:', valor),
      (error) => console.log('Error', error),
      () => console.log('Obs terminado')
      //despues de realizar los cambios para que nuestro observable este
      //emitiendo un valor configuramos las otras opciones quenos
      //permite el observable, que son el manejo de errores y un
      //mensaje cuando nuestro observable este completo
    );*/

    //estaremos  agregando nueva funcionalidad
    this.intervaloSubs = this.retornaIntervalo().subscribe( console.log )

    //cunado queramos limpiar estecomponente debemos utilizar el onDestroy
  }

  ngOnDestroy(): void {
    this.intervaloSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(100)
              .pipe(
                //take(10),
                // map nos permite transforma
                //la informacion del observable padre este emitiendo
                map( valor => valor + 1),
                //en nuestro filter estamos evaluando
                //el valor que esta resultando de nuestro map
                filter( valor => ((valor % 2) === 0) ? true : false ),
                //nos permite indicar cuantas emisiones
                //del observable queremos
              );
  }

  //esta es la forma mas comun en la que estaremos trabajando con nuestro observable
  //a partir de una funcion que regrese nuestro observable
  retornaObservable(): Observable<number> {
    let i = -1;
    //creamos nuestro primer observable
    //cuando usamos una referencia a un observable que nosotros queremos almacenar
    //le agregamos el símbolo de $ al igual que las promesas
    //internamente nuestros observables deben tener su cuerpo de lo que queremos
    //que realice nuestro observable

    //Nota nueva: como buena practica siempre es bueno saber el tipo de informacion
    //esta fluyendo en nuestro observable es por eso que lo indicamos de la siguiente manera
    return new Observable<number>( observer => {

      //en este caso nuestro observer será el que este emitiendo
      //el valor de i, pero para poder informarle a los elementos
      //que están subscritos debemos realizar lo siguiente

      //para probar esto creamos un Interval elcual tiene un cuerpo
      //que  es lo que se estara ejecutando y despues el tiempo en el
      //que queremos ejecutarlo, esta es una funcion anonima por lo cual
      //no se tiene forma de hacer referencia por lo que creamos una variable
      const intervalo = setInterval( () => {
        i++;
        //Para que nuestro observable pueda emitir un valor debemos
        //utilizar nuestro observer que configuramos y utilizar
        //la funcion de next para poder emitir el cambio
        observer.next(i);

        //Para poder detener nuestro observable
        //usamos la siguiente funcion complete.
        //para que no sigua emitiendo
        if (i === 4) {
          clearInterval( intervalo );
          observer.complete();
        }

        if (i === 2) {
          //Si queremos probar nuestro mensaje de error
          //podemos usar la funcion de error.
          observer.error('i llego al valor de 2')
        }
      }, 1000)

    });

    //return obs$;
  }

}
