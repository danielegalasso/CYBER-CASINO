import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorseRaceComponent } from './horse-race.component';

describe('HorseRaceComponent', () => {
  let component: HorseRaceComponent;
  let fixture: ComponentFixture<HorseRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HorseRaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorseRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
