import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { Toast, ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { element } from 'protractor';

@Component({
  selector: 'app-fb-listar-producto',
  templateUrl: './fb-listar-producto.component.html',
  styleUrls: ['./fb-listar-producto.component.css']
})
export class FbListarProductoComponent implements OnInit {
  listaProductos : any[] =[];

  constructor(private productoService: ProductoService,
    private toastr: ToastrService,
    firestore: AngularFirestore) {
     }

  ngOnInit(): void {
    this.obtenerProductos()
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
}
