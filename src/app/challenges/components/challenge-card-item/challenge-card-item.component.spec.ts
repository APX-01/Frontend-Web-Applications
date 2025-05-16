import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeCardItemComponent } from './challenge-card-item.component';

describe('ChallengeCardItemComponent', () => {
  let component: ChallengeCardItemComponent;
  let fixture: ComponentFixture<ChallengeCardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeCardItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
