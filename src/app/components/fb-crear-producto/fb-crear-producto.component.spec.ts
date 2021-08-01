import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbCrearProductoComponent } from './fb-crear-producto.component';

describe('FbCrearProductoComponent', () => {
  let component: FbCrearProductoComponent;
  let fixture: ComponentFixture<FbCrearProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbCrearProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FbCrearProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
