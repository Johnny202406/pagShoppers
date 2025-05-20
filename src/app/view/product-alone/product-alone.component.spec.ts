import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAloneComponent } from './product-alone.component';

describe('ProductAloneComponent', () => {
  let component: ProductAloneComponent;
  let fixture: ComponentFixture<ProductAloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAloneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
