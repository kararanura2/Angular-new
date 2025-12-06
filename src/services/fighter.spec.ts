import { TestBed } from '@angular/core/testing';

import { Fighter } from './fighter';

describe('Fighter', () => {
  let service: Fighter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fighter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
