import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  //MongoDB services
  url = "http://localhost:4000/api/productos/"
  constructor(private http: HttpClient,
    private firestone: AngularFirestore) {}

  getProductos(): Observable<any>{
    return this.http.get(this.url);
  }
  eliminarProducto(id: any): Observable<any>{
    return this.http.delete(this.url + id);
  }
  guardarProducto(producto: Producto): Observable<any>{
    return this.http.post(this.url,producto);
  }
  obtenerProducto(id: any): Observable<any>{
    return this.http.get(this.url + id);
  }
  editarProducto(id: any, producto: Producto): Observable<any>{
    return this.http.put(this.url + id, producto);
  }
  //Firestone services
  fsagregarProducto(producto:any): Promise<any>{
    return this.firestone.collection("producto").add(producto)
  }
  fsgetProductos(): Observable<any>{
    return this.firestone.collection("producto",ref=>ref.orderBy('fechaCreacion','asc')).snapshotChanges();
  }
  fsdeleteProducto(id:any):Promise<any>{
    return this.firestone.collection("producto").doc(id).delete();
  }
  fsobtenerProducto(id: any): Observable<any> {
    return this.firestone.collection('producto').doc(id).snapshotChanges();
  }
  fsupdateProducto(id:any, producto:any): Promise<any>{
    return this.firestone.collection("producto").doc(id).update(producto);
  }
}
