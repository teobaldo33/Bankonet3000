import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentConnexionComponent } from './agent-connexion.component';

describe('AgentConnexionComponent', () => {
  let component: AgentConnexionComponent;
  let fixture: ComponentFixture<AgentConnexionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentConnexionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
