import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableFactagComponent } from './table-factag.component';

describe('TableFactagComponent', () => {
  let component: TableFactagComponent;
  let fixture: ComponentFixture<TableFactagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableFactagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableFactagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
