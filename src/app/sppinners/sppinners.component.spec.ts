import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppinnersComponent } from './sppinners.component';

describe('SppinnersComponent', () => {
  let component: SppinnersComponent;
  let fixture: ComponentFixture<SppinnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppinnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
