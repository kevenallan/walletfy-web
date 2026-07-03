import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Seguranca } from './seguranca';

describe('Seguranca', () => {
    let component: Seguranca;
    let fixture: ComponentFixture<Seguranca>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Seguranca],
        }).compileComponents();

        fixture = TestBed.createComponent(Seguranca);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
