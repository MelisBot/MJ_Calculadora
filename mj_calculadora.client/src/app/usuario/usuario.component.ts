import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Models/Usuario';
import { UsuarioApiService } from '../Services/usuario-api.service';
import { Result } from '../../Models/result';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{
  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = this.inicializarUsuario();
  mensaje: string = '';
  mostrarFormulario: boolean = false; //oculto hasta precionar Agregar Usuario
  modoActualizar: boolean = false; //actualiza usuario

  //Update
  private inicializarUsuario(): Usuario {
    return {
      idUsuario: 0,
      userName: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      email: '',
      password: '',
      fechaNacimiento: '',
      sexo: '',
      telefono: '',
      celular: '',
      estatus: true,
      curp: '',
      imagen: 0,
      idRol: 0,
      rol: { idRol: 0, nombre: '' }
    };
  }
  //Add
  nuevoUsuarioAdd: Usuario = {
    idUsuario: 0,
    userName: '',
    nombre: '',
    apellidoPaterno: '',
    email: '',
    password: '',
    sexo: '',
    telefono: '',
    estatus: true,
    idRol: 1
  };
  constructor(private usuarioService: UsuarioApiService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  //GetAll
  getUsuarios() {
    this.usuarioService.getAll().subscribe({
      next: (result: Result) => {
        if (result.correct) {
          this.usuarios = result.objects as Usuario[];
        } else {
          this.mensaje = result.errorMessage ?? 'Error al obtener usuarios';
        }
      },
      error: (err) => {
        this.mensaje = 'Error en la peticion de la api' + err.message;
      }
    });
  }
  agregarUsuario(): void {
    this.mostrarFormulario = true;
    this.modoActualizar = false;
    this.nuevoUsuario = { ...this.nuevoUsuarioAdd };
  }

  editarUsuario(usuario: Usuario): void {
    this.mostrarFormulario = true;
    this.modoActualizar = true;
    this.nuevoUsuario = { ...usuario }; // cargamos datos al formulario
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.modoActualizar = false;
    this.nuevoUsuario = this.inicializarUsuario();
  }

  guardarUsuario(): void {
    if (this.modoActualizar) {
      // Actualizar
      this.usuarioService.update(this.nuevoUsuario.idUsuario, this.nuevoUsuario).subscribe({
        next: (result: Result) => {
          if (result.correct) {
            this.mensaje = 'Usuario actualizado correctamente';
            this.getUsuarios();
            this.cancelar();
          } else {
            this.mensaje = result.errorMessage ?? 'Error al actualizar usuario';
          }
        },
        error: (err) => {
          this.mensaje = 'Error en la petición: ' + err.message;
        }
      });
    } else {
      // Agregar
      const usuarioAgregar = { ...this.nuevoUsuarioAdd, ...this.nuevoUsuario };
      this.usuarioService.add(usuarioAgregar).subscribe({
        next: (res: Result) => {
          if (res.correct) {
            this.mensaje = 'Usuario agregado correctamente';
            this.getUsuarios();
            this.cancelar();
          } else {
            this.mensaje = res.errorMessage ?? 'Error al agregar usuario';
          }
        },
        error: (err) => {
          this.mensaje = 'Error en la petición: ' + err.message;
        }
      });
    }
  }
  eliminarUsuario(idUsuario: number): void {
    this.usuarioService.delete(idUsuario).subscribe({
      next: (res: Result) => {
        if (res.correct) {
          this.mensaje = 'Usuario eliminado correctamente';
          this.getUsuarios();
        } else {
          this.mensaje = res.errorMessage ?? 'Error al eliminar usuario';
        }
      },
      error: (err) => {
        this.mensaje = 'Error en la petición: ' + err.message;
      }
    });
  }
}
