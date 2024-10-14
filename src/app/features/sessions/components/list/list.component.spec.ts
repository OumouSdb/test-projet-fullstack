import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { ListComponent } from './list.component';
import { of } from 'rxjs';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let sessionServiceMock: jest.Mocked<SessionService>;
  const mockSessionInformation = {
    token: 'mockToken',
    type: 'admin',
    id: 'mockId',
    username: 'mockUser',
    admin: true
  };

  beforeEach(async () => {

    sessionServiceMock = {
      sessionInformation: mockSessionInformation,
    } as unknown as jest.Mocked<SessionService>;

    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [HttpClientModule, MatCardModule, MatIconModule],
      providers: [{ provide: SessionService, useValue: sessionServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display the list of sessions', () => {
    component.sessions$.subscribe(sessions => {
      expect(sessions).toBeDefined();
    })
    expect(sessionServiceMock.sessionInformation).toBeDefined();

  });

  it('should display Create button for admin users', () => {
    sessionServiceMock.sessionInformation!.admin = true;
    const createButton = fixture.nativeElement.querySelector('button[routerLink="create"]');
    const DetailButton = fixture.nativeElement.querySelector('button[routerLink="detail"]');
    expect([createButton, DetailButton]).toBeTruthy();
  });

  it('Should not create button if user is not an admin', () => {
    sessionServiceMock.sessionInformation!.admin = false
    fixture.detectChanges();
    const createButton = fixture.nativeElement.querySelector('button[routerLink="create"]');
    const detailButton = fixture.nativeElement.querySelector('button[routerLink="detail"]');
    expect(createButton).toBeNull();
    expect(detailButton).toBeNull();
  })
});