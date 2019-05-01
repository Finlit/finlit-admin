import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQusComponent } from './edit-qus.component';

describe('EditQusComponent', () => {
  let component: EditQusComponent;
  let fixture: ComponentFixture<EditQusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
