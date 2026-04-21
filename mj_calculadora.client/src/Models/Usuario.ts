import { Rol } from "./rol";

export interface Usuario {
  idUsuario: number;
  userName: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno?: string;
  email: string;
  password: string;
  fechaNacimiento?: string; //formato?
  sexo: string;
  telefono : string;
  celular?: string;
  estatus:boolean;
  curp?: string;
  imagen?: number;
  idRol: number;
  rol?: Rol; //objeto de la clase Rol 
}
