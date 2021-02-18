import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JogControlsComponent } from './jog-controls.component';

describe('JogControlsComponent', () => {
  let component: JogControlsComponent;
  let fixture: ComponentFixture<JogControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JogControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JogControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
