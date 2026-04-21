import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UsuarioComponent } from '../app/usuario/usuario.component';
import { CalculadoraComponent } from '../app/calculadora/calculadora.component';
import { RandomUserComponent } from './random-user/random-user.component';


const routes: Routes = [
  { path: '', redirectTo: '/usuario', pathMatch: 'full' }, // ruta por defecto
  { path: 'calculadora', component: CalculadoraComponent },  //mostrar la calculadora
  { path: 'random-user', component: RandomUserComponent },   //mostrar API
  {path:'usuario', component: UsuarioComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
