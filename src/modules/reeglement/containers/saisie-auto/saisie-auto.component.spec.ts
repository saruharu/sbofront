import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieAutoComponent } from './saisie-auto.component';

describe('SaisieAutoComponent', () => {
  let component: SaisieAutoComponent;
  let fixture: ComponentFixture<SaisieAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaisieAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisieAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
