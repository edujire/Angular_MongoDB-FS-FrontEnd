import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  listaProductos : Producto[] =[];
  constructor(private productoService: ProductoService,
     private toastr: ToastrService) { 
     }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productoService.getProductos().subscribe(data =>{
      console.log(data);
      this.listaProductos=data;
    },error => {
      console.log(error);
    })
  }
  eliminarProducto(id: any){
    if(confirm("¿Seguro que desea eliminar el producto "+id+"?")){
      this.productoService.eliminarProducto(id).subscribe(data=>{
        this.toastr.info("El producto se elimino exitosamente","Producto eliminado");
        this.obtenerProductos();
      },error=>{
        console.log(error);
      })
    }
  }
}
