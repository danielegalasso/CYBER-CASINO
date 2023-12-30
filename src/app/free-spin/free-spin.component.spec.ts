import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeSpinComponent } from './free-spin.component';

describe('FreeSpinComponent', () => {
  let component: FreeSpinComponent;
  let fixture: ComponentFixture<FreeSpinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreeSpinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreeSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
