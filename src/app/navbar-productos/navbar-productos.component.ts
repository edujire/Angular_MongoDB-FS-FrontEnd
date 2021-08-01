import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navbar-productos',
  templateUrl: './navbar-productos.component.html',
  styleUrls: ['./navbar-productos.component.css']
})
export class NavbarProductosComponent implements OnInit {
  constructor(public router:Router) {}

  ngOnInit(): void {
  }

}
