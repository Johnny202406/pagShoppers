import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCategorieComponent } from './select-categorie.component';

describe('SelectCategorieComponent', () => {
  let component: SelectCategorieComponent;
  let fixture: ComponentFixture<SelectCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectCategorieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
