import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInputsComponent } from './chat-inputs.component';

describe('ChatInputsComponent', () => {
  let component: ChatInputsComponent;
  let fixture: ComponentFixture<ChatInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
