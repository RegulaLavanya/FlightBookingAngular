import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTicketDetailsComponent } from './get-ticket-details.component';

describe('GetTicketDetailsComponent', () => {
  let component: GetTicketDetailsComponent;
  let fixture: ComponentFixture<GetTicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTicketDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
