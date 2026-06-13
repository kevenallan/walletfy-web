import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInformacoes } from './card';

describe('CardInformacoes', () => {
    let component: CardInformacoes;
    let fixture: ComponentFixture<CardInformacoes>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardInformacoes],
        }).compileComponents();

        fixture = TestBed.createComponent(CardInformacoes);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
