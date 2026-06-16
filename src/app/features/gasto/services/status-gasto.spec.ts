import { TestBed } from '@angular/core/testing';

import { StatusGasto } from './status-gasto';

describe('StatusGasto', () => {
    let service: StatusGasto;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StatusGasto);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
