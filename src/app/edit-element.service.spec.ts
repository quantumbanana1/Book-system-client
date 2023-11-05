import { TestBed } from '@angular/core/testing';

import { EditElementService } from './edit-element.service';

describe('EditElementService', () => {
  let service: EditElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
