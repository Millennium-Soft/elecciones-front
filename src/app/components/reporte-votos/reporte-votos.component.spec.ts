import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVotosComponent } from './reporte-votos.component';

describe('ReporteVotosComponent', () => {
  let component: ReporteVotosComponent;
  let fixture: ComponentFixture<ReporteVotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteVotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteVotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
