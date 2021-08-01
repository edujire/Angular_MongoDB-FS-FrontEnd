import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FbListarProductoComponent } from './fb-listar-producto.component';

describe('FbListarProductoComponent', () => {
  let component: FbListarProductoComponent;
  let fixture: ComponentFixture<FbListarProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FbListarProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FbListarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
