import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPrimeNgComponent } from './confirm-prime-ng.component';

describe('ConfirmPrimeNgComponent', () => {
  let component: ConfirmPrimeNgComponent;
  let fixture: ComponentFixture<ConfirmPrimeNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPrimeNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPrimeNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
