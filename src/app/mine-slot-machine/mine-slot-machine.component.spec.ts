import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineSlotMachineComponent } from './mine-slot-machine.component';

describe('MineSlotMachineComponent', () => {
  let component: MineSlotMachineComponent;
  let fixture: ComponentFixture<MineSlotMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MineSlotMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MineSlotMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
