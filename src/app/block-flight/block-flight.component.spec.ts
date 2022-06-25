import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockFlightComponent } from './block-flight.component';

describe('BlockFlightComponent', () => {
  let component: BlockFlightComponent;
  let fixture: ComponentFixture<BlockFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
