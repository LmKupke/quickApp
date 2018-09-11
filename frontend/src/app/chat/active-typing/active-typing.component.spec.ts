import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTypingComponent } from './active-typing.component';

describe('ActiveTypingComponent', () => {
  let component: ActiveTypingComponent;
  let fixture: ComponentFixture<ActiveTypingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveTypingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
