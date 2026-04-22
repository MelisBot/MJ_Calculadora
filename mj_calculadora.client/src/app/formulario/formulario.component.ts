import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../Models/Usuario';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{
  //recibir usuario
  @Input() usuario: Usuario | null = null;
  @Output() onGuardar = new EventEmitter<Usuario>();
  formUsuario!: FormGroup;

  //constructor
  constructor(private fb: FormBuilder) { }
  ngOnInit()
  {
    this.formUsuario = this.fb.group({
      userName: [this.usuario ? this.usuario.userName : '', Validators.required],
      nombre: [this.usuario ? this.usuario.nombre : '', Validators.required],
      apellidoPaterno: [this.usuario ? this.usuario.apellidoPaterno : '', Validators.required],
      apellidoMaterno: [this.usuario ? this.usuario.apellidoMaterno : ''],
      email: [this.usuario ? this.usuario.email : '', [Validators.required, Validators.email]],
      password: [this.usuario ? this.usuario.password : '', Validators.required],
      fechaNacimiento: [this.usuario ? this.usuario.fechaNacimiento : ''],
      sexo: [this.usuario ? this.usuario.sexo : '', Validators.required],
      telefono: [this.usuario ? this.usuario.telefono : '', Validators.required],
      celular: [this.usuario ? this.usuario.celular : ''],
      estatus: [this.usuario ? this.usuario.estatus : true],
      curp: [this.usuario ? this.usuario.curp : ''],
      idRol: [this.usuario ? this.usuario.idRol : 0, Validators.required]

    });
  }
  guardar(): void {
    if (this.formUsuario.valid) {
      const usuarioForm: Usuario = this.formUsuario.value;
      if (this.usuario) {
        usuarioForm.idUsuario = this.usuario.idUsuario; // conservar Id en actualización
      }
      this.onGuardar.emit(usuarioForm); // envía al padre
    }
  }
}
