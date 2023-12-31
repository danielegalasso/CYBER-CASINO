import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonusModuleComponent } from './bonus-module.component';

describe('BonusModuleComponent', () => {
  let component: BonusModuleComponent;
  let fixture: ComponentFixture<BonusModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BonusModuleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BonusModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
