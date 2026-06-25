import { TestBed } from '@angular/core/testing';

import { CoresBadge } from './cores-badge';

describe('CoresBadge', () => {
    let service: CoresBadge;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CoresBadge);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
