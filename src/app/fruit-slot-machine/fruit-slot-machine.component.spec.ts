import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitSlotMachineComponent } from './fruit-slot-machine.component';

describe('FruitSlotMachineComponent', () => {
  let component: FruitSlotMachineComponent;
  let fixture: ComponentFixture<FruitSlotMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FruitSlotMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FruitSlotMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
