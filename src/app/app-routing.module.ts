import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//Components
import {ListarProductoComponent} from "./components/listar-producto/listar-producto.component";
import {CrearProductoComponent} from "./components/crear-producto/crear-producto.component";
import { MapLocationComponent } from './components/map-location/map-location.component';
import { FbListarProductoComponent } from './components/fb-listar-producto/fb-listar-producto.component';
import { FbCrearProductoComponent } from './components/fb-crear-producto/fb-crear-producto.component';

const routes: Routes = [
  {path: '', component: ListarProductoComponent},
  {path: 'crear-producto', component: CrearProductoComponent},
  {path: 'editar-producto/:id', component: CrearProductoComponent},
  {path: 'ubicaciones', component: MapLocationComponent},
  {path: 'fb', component:FbListarProductoComponent},
  {path: 'fb/crear-producto', component:FbCrearProductoComponent},
  {path: 'fb/editar-producto/:id', component:FbCrearProductoComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'} //redireccionar todo a root
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
