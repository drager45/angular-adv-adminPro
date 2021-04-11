import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private elemento = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.elemento.setAttribute('href', url);
  }

  //este  metodo estara realizando el cambio del color
  //actualizando la informaicon del elemento por medio del id
  //en este caso seria el de theme y para  esto se debe actualizar
  //toda la url
  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    //agregamos el atributo que queremos cambiar que seria el href
    this.elemento.setAttribute('href', url);
    //guardamos nuestra configuracion en el localStorage
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    links.forEach( element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.elemento.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }

    });
  }

}
