import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Producto} from "../../models/producto";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  productForm: FormGroup
  tittle: string = "Crear Producto";
  id: string|null;

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private toastr: ToastrService,
    private productoService: ProductoService,
    private aRoute: ActivatedRoute) {
    this.productForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    })
    this.id=this.aRoute.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.esEditar()
  }

  agregarProducto(){
    const PRODUCTO: Producto = {
      nombre : this.productForm.get('producto')?.value,
      categoria : this.productForm.get('categoria')?.value,
      precio : this.productForm.get('precio')?.value,
      ubicacion : this.productForm.get('ubicacion')?.value
    };
    if (this.id !== null){
      //Editar producto
      if(confirm("¿Seguro que desea actualizar el producto?")){
        this.productoService.editarProducto(this.id,PRODUCTO).subscribe(data=>{
          this.toastr.success("El producto se edito con exito","Producto Editado!");
          this.router.navigate(['/'])
        },error=>{
          console.log(error);
          this.productForm.reset();
          this.toastr.error("Error al modificar el producto","Error al Editar!");
        })
      }   
    }
    else{
      //Alta producto
      this.productoService.guardarProducto(PRODUCTO).subscribe(data=>{
        this.toastr.success("El producto se agrego con exito","Producto Registrado!");
        this.router.navigate(['/'])
      },error=>{
        console.log(error);
        this.toastr.error("Error al crear el producto","Error de Registro!")
      })
    }
  }
  esEditar(){
    if (this.id!==null){
      this.tittle="Actualiza producto";
      this.productoService.obtenerProducto(this.id).subscribe(data=>{
        this.productForm.setValue({
          producto : data.nombre,
          categoria : data.categoria,
          precio : data.precio,
          ubicacion : data.ubicacion
        });
      });
    }
  }
}
