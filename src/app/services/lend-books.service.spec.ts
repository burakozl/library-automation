import { TestBed } from '@angular/core/testing';

import { LendBooksService } from './lend-books.service';

describe('LendBooksService', () => {
  let service: LendBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LendBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
