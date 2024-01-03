import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSlotMachineComponent } from './generic-slot-machine.component';

describe('GenericSlotMachineComponent', () => {
  let component: GenericSlotMachineComponent;
  let fixture: ComponentFixture<GenericSlotMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericSlotMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericSlotMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
