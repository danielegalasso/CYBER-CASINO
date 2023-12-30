import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotErnestoComponent } from './slot-ernesto.component';

describe('SlotErnestoComponent', () => {
  let component: SlotErnestoComponent;
  let fixture: ComponentFixture<SlotErnestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlotErnestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlotErnestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
