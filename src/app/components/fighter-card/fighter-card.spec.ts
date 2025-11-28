import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterCard } from './fighter-card';

describe('FighterCard', () => {
  let component: FighterCard;
  let fixture: ComponentFixture<FighterCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FighterCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FighterCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
