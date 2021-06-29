import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonographComponent } from './monograph.component';

describe('MonographComponent', () => {
  let component: MonographComponent;
  let fixture: ComponentFixture<MonographComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonographComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonographComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
