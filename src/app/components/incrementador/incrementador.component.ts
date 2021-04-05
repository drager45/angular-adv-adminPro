import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit() {
    this.btnClass = `btn  ${this.btnClass}`;
  }

  //Para indicar que ahora puede recibir un valor desde el padre
  //agregamos nuestro decorador Input
  @Input() progreso: number = 50;
  @Input() btnClass: string = 'btn-primary'

  //Para poder notificar al padre cualquier cambio que se sufrio en el componente
  //configuramos nuestro Output.
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  //definimos un get para poder obtener el valor del progress
  //y poder actualizar nuestra barra
  //get getPorcentaje() {
  //  return `${this.progreso}%`
  //}

  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor >=0 ) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange(newValue: number) {
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    this.valorSalida.emit(this.progreso);
  }

}
