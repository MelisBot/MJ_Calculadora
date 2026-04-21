import { Component, OnInit } from '@angular/core';
import { RandomUserService } from '../Services/random-user.service';
import { RandomUser } from '../../Models/random-user';

@Component({
  selector: 'app-random-user',
  templateUrl: './random-user.component.html',
  styleUrls: ['./random-user.component.css'],
})
export class RandomUserComponent implements OnInit{
  users: RandomUser[] = [];

  constructor(private randomUserService: RandomUserService) { }

  ngOnInit(): void {
    
    const storedUser = localStorage.getItem('user');//getItem Guarda los datos
    //Verificar si hay usuario
    if (storedUser) {
      this.users = JSON.parse(storedUser); //JSON.Parse obtiene los datos
    } else {
      //si no hay agregamos desde la API  solo si no hay datos
      this.randomUserService.getAllUsers().subscribe(data => {
        this.users = data.results;
        //guardamos el dato
        localStorage.setItem('user', JSON.stringify(this.users))
      });
    }
  }

  //metodo que se llama al dar click en agregar
  agregarUsuario(): void {
    this.randomUserService.getAllUsers(1).subscribe(data => { //Llamamos al getAllUsers para agregar 1 usuario 
      const nuevoUsuario = data.results[0];
      this.users = [...this.users, nuevoUsuario];
      localStorage.setItem('user', JSON.stringify(this.users)); //se guarda el nuevo usuario
    });

  }
}
