import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilebusinessplansComponent } from './profilebusinessplans.component';

describe('ProfilebusinessplansComponent', () => {
  let component: ProfilebusinessplansComponent;
  let fixture: ComponentFixture<ProfilebusinessplansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilebusinessplansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilebusinessplansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
