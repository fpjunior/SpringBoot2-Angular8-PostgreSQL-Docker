import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTableColumnComponent } from './dialog-table-column.component';

describe('DialogTableColumnComponent', () => {
  let component: DialogTableColumnComponent;
  let fixture: ComponentFixture<DialogTableColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTableColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTableColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
