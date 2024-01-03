import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumSlotMachineComponent } from './premium-slot-machine.component';

describe('PremiumSlotMachineComponent', () => {
  let component: PremiumSlotMachineComponent;
  let fixture: ComponentFixture<PremiumSlotMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PremiumSlotMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumSlotMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
