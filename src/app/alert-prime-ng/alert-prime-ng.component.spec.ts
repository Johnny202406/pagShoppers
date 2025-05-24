import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPrimeNgComponent } from './alert-prime-ng.component';

describe('AlertPrimeNgComponent', () => {
  let component: AlertPrimeNgComponent;
  let fixture: ComponentFixture<AlertPrimeNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertPrimeNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertPrimeNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
