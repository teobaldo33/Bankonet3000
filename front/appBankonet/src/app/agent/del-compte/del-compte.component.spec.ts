import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelCompteComponent } from './del-compte.component';

describe('DelCompteComponent', () => {
  let component: DelCompteComponent;
  let fixture: ComponentFixture<DelCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
