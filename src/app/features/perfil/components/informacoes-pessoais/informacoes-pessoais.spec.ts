import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesPessoais } from './informacoes-pessoais';

describe('InformacoesPessoais', () => {
    let component: InformacoesPessoais;
    let fixture: ComponentFixture<InformacoesPessoais>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InformacoesPessoais],
        }).compileComponents();

        fixture = TestBed.createComponent(InformacoesPessoais);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
