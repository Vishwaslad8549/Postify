import { TestBed } from '@angular/core/testing';

import { WelcomedataService } from './welcomedata.service';

describe('WelcomedataService', () => {
  let service: WelcomedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
