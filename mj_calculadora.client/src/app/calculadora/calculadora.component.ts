import { Component } from '@angular/core';

import { Calculadora } from '../../Models/Calculadora';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})

export class CalculadoraComponent {
  //inicializamos el objeto
  operacion: Calculadora = new Calculadora();

  suma() {
    this.operacion.resultado = this.operacion.num1 + this.operacion.num2;
  }
  resta() {
    this.operacion.resultado = this.operacion.num1 - this.operacion.num2;
  }
  multiplicar() {
    this.operacion.resultado = this.operacion.num1 * this.operacion.num2;
  }
  dividir() {
    if (this.operacion.num2 !== 0) {
      this.operacion.resultado = this.operacion.num1 / this.operacion.num2;
    } else {
      alert('No se puede dividir entre cero')
    }
  }
}
