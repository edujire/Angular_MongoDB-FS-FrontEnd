import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { Toast, ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { element } from 'protractor';

import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-fb-listar-producto',
  templateUrl: './fb-listar-producto.component.html',
  styleUrls: ['./fb-listar-producto.component.css']
})
export class FbListarProductoComponent implements OnInit {
  listaProductos : any[] =[];
  campos = new FormControl();
  listaCampos: string[]=["nombre","categoria","ubicacion"];
  searchForm: FormGroup;

  constructor(private productoService: ProductoService,
    private toastr: ToastrService,
    firestore: AngularFirestore,
    private fb: FormBuilder) {
      this.searchForm = this.fb.group({
        campo: ['', Validators.required],
        valor: ['', Validators.required],
      });
     }

  ngOnInit(): void {
    this.obtenerProductos()
    // this.buscarProductos("categoria","computo")
  }
  obtenerProductos(){
    this.productoService.fsgetProductos().subscribe(data =>{
      this.listaProductos=[];
      data.forEach((element:any) => {
        this.listaProductos.push({
          _id:element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      console.log(this.listaProductos);
    },error => {
      console.log(error);
    })
  }
  eliminarProducto(id: string){
    if(confirm("¿Seguro que desea eliminar el producto "+id+"?")){
      this.productoService.fsdeleteProducto(id).then(()=>{
        console.log("producto eliminado")
      })
        this.toastr.info("El producto se elimino exitosamente","Producto eliminado");
        this.obtenerProductos();
    }
  }
  buscarProductos(){
    console.log("en buscar productos")
    const key=this.searchForm.get("campo")?.value;
    const value=this.searchForm.get("valor")?.value;
    console.log(key + ":" + value)
    this.productoService.fssearchProducto(key,value).subscribe(data=>{
      this.listaProductos=[];
      data.forEach((element:any) => {
        this.listaProductos.push({
          ...element.payload.doc.data()
        });
      });
      console.log(this.listaProductos);
    },error => {
      console.log(error);
    })
  }
}
