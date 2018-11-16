import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorComponent } from './form-error.component';
import { FormControl } from '@angular/forms';

describe('FormErrorComponent', () => {
  let component: FormErrorComponent;
  let fixture: ComponentFixture<FormErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorComponent);
    component = fixture.componentInstance;
    component.ctrl = new FormControl();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
