import { Component,Input,OnInit} from '@angular/core';
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-map-location',
  templateUrl: './map-location.component.html',
  styleUrls: ['./map-location.component.css']
})
export class MapLocationComponent implements OnInit {
  @Input()
  ubicacion: string = "Centro_Cuidad_Mexico";
  mapUrl: SafeResourceUrl = "";
  
  constructor(public sanitizer:DomSanitizer) {
    this.generateMapUrl();
   }

  ngOnInit(): void {
  }
  generateMapUrl(){
    this.mapUrl=this.sanitizer.bypassSecurityTrustResourceUrl("https://maps.google.com/maps?q="+this.ubicacion+"&t=&z=9&ie=UTF8&iwloc=&output=embed");
  }
  updateLocation(){
    const mxLocation= document.getElementById("cdmxRadio") as HTMLInputElement;
    const mtyLocation= document.getElementById("mtyRadio") as HTMLInputElement;
    const gdlLocation= document.getElementById("gdlRadio") as HTMLInputElement;
    if(mxLocation.checked){
      this.ubicacion="Centro_Cuidad_Mexico"
    }
    else if(mtyLocation.checked){
      this.ubicacion="Centro_Monterrey"
    }
    else if(gdlLocation.checked){
      this.ubicacion="Centro_Guadalajara"
    }
    else{
      this.ubicacion="Centro_Ciudad_Mexico"
    }
    this.generateMapUrl();
    console.log(this.mapUrl)
  }
}
