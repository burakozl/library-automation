import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookListComponent } from './user-book-list.component';

describe('UserBookListComponent', () => {
  let component: UserBookListComponent;
  let fixture: ComponentFixture<UserBookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBookListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
