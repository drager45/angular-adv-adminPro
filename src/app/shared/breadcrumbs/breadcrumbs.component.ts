import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: []
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.tituloSubs$ = this.getArgumentosRuta()
                          //en este caso estamos utilizando la desestructuracion del objeto
                           .subscribe(({ titulo }) => {
                             this.titulo = titulo;
                             document.title = `AdminPro - ${titulo}`;
                           });
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta() {
    //este es un observable
    return this.router.events
      //nos permite  utilizar  los operadores de los observables
      //para poder trabajar con la informacion
      .pipe(
        //para validar los eventos que queremos recuperar con nuestro filter
        //vamos a usar el instanceof para que solo pasen los que necesitamos
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map(event => event.snapshot.data)
      );
  }

}
