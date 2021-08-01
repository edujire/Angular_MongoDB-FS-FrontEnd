import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ListarProductoComponent } from './components/listar-producto/listar-producto.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NavbarProductosComponent } from './navbar-productos/navbar-productos.component';
import { MapLocationComponent } from './components/map-location/map-location.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { FbListarProductoComponent } from './components/fb-listar-producto/fb-listar-producto.component';
import { FbCrearProductoComponent } from './components/fb-crear-producto/fb-crear-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearProductoComponent,
    ListarProductoComponent,
    NavbarProductosComponent,
    MapLocationComponent,
    FbListarProductoComponent,
    FbCrearProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
