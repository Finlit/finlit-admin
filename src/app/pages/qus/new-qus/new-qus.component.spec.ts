import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQusComponent } from './new-qus.component';

describe('NewQusComponent', () => {
  let component: NewQusComponent;
  let fixture: ComponentFixture<NewQusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewQusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
