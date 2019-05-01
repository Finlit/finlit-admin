import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QusComponent } from './qus.component';

describe('QusComponent', () => {
  let component: QusComponent;
  let fixture: ComponentFixture<QusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
