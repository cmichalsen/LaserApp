import { TestBed } from '@angular/core/testing';

import { GpioSocketService } from './gpio-socket.service';

describe('GpioSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GpioSocketService = TestBed.get(GpioSocketService);
    expect(service).toBeTruthy();
  });
});
