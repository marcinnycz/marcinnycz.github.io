import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosturesComponent } from './postures.component';

describe('PosturesComponent', () => {
  let component: PosturesComponent;
  let fixture: ComponentFixture<PosturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
