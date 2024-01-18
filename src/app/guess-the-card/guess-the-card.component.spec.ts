import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessTheCardComponent } from './guess-the-card.component';

describe('GuessTheCardComponent', () => {
  let component: GuessTheCardComponent;
  let fixture: ComponentFixture<GuessTheCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuessTheCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuessTheCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
