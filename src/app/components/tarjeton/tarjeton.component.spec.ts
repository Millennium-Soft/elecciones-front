import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetonComponent } from './tarjeton.component';

describe('TarjetonComponent', () => {
  let component: TarjetonComponent;
  let fixture: ComponentFixture<TarjetonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
