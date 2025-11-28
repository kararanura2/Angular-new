import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightersList } from './fighters-list';

describe('FightersList', () => {
  let component: FightersList;
  let fixture: ComponentFixture<FightersList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightersList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightersList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
