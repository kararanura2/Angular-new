import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterDetails } from './fighter-details';

describe('FighterDetails', () => {
  let component: FighterDetails;
  let fixture: ComponentFixture<FighterDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FighterDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FighterDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
