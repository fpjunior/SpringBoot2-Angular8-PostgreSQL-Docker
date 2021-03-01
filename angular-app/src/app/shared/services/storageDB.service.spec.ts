/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StorageDBService } from './storageDB.service';

describe('Service: StorageDB', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageDBService]
    });
  });

  it('should ...', inject([StorageDBService], (service: StorageDBService) => {
    expect(service).toBeTruthy();
  }));
});
