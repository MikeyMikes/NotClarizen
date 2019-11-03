import { TestBed } from '@angular/core/testing';

import { SprintBacklogService } from './sprint-backlog.service';

describe('SprintBacklogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SprintBacklogService = TestBed.get(SprintBacklogService);
    expect(service).toBeTruthy();
  });
});
