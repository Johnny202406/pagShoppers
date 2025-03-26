import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsCarritoComponent } from './cards-carrito.component';

describe('CardsCarritoComponent', () => {
  let component: CardsCarritoComponent;
  let fixture: ComponentFixture<CardsCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
