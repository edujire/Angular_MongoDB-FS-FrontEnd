import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Producto} from "../../models/producto";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { ProductoService } from 'src/app/services/producto.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-fb-crear-producto',
  templateUrl: './fb-crear-producto.component.html',
  styleUrls: ['./fb-crear-producto.component.css']
})
export class FbCrearProductoComponent implements OnInit {

  productForm: FormGroup
  tittle="crear producto";
  id:string | null;

  constructor(private fb: FormBuilder, 
    private router: Router, 
    private toastr: ToastrService,
    private productoService: ProductoService,
    private aRoute: ActivatedRoute,
    firestore: AngularFirestore ) {
    this.productForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    });
    this.id=this.aRoute.snapshot.paramMap.get("id");
  }
  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){
    const PRODUCTO: any = {
      nombre : this.productForm.get('producto')?.value,
      categoria : this.productForm.get('categoria')?.value,
      precio : this.productForm.get('precio')?.value,
      ubicacion : this.productForm.get('ubicacion')?.value,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    const UPDATE_PRODUCTO: any = {
      nombre : this.productForm.get('producto')?.value,
      categoria : this.productForm.get('categoria')?.value,
      precio : this.productForm.get('precio')?.value,
      ubicacion : this.productForm.get('ubicacion')?.value,
      fechaActualizacion: new Date()
    };
    if (this.id != null){
      //Editar producto
      if(confirm("¿Seguro que desea actualizar el producto?")){
        this.productoService.fsupdateProducto(this.id,UPDATE_PRODUCTO).then(()=>{
          console.log("Producto editado");
        })
        this.toastr.success("El producto se edito con exito","Producto Editado!");
        this.router.navigate(['/fb'])
      }
      
    }
    else{
      //Alta producto
      this.productoService.fsagregarProducto(PRODUCTO).then(()=>{
        console.log("Producto agregado")
      });
      console.log(PRODUCTO);
      this.toastr.success("El producto se edito con exito","Producto Editado!");
      this.router.navigate(['/fb'])
    }

  }
  esEditar(){
    if (this.id!==null){
      this.tittle="Actualiza producto";
      this.productoService.fsobtenerProducto(this.id).subscribe(data=>{
        this.productForm.setValue({
          producto : data.payload.data().nombre,
          categoria : data.payload.data().categoria,
          precio : data.payload.data().precio,
          ubicacion : data.payload.data().ubicacion
        });
      });
    }
  }
}