import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexImageComponent } from './complex-image.component';

describe('ComplexImageComponent', () => {
  let component: ComplexImageComponent;
  let fixture: ComponentFixture<ComplexImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplexImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplexImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
