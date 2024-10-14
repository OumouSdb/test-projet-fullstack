import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { SessionService } from './session.service';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially be logged out', () => {
    expect(service.isLogged).toBe(false);
    service.$isLogged().subscribe((isLogged) => {
      expect(isLogged).toBe(false);
    });
  });

  it('should log in correctly', () => {
    const user: SessionInformation = {
      token: "string",
      type: "string",
      id: 1,
      username: "string",
      firstName: "string",
      lastName: "string",
      admin: true,
    };
    service.logIn(user);

    expect(service.isLogged).toBe(true);
    expect(service.sessionInformation).toEqual(user);
    service.$isLogged().subscribe((isLogged) => {
      expect(isLogged).toBe(true);
    });
  });

  it('should log out correctly', () => {
    const user: SessionInformation = {
      token: "string",
      type: "string",
      id: 1,
      username: "string",
      firstName: "string",
      lastName: "string",
      admin: true,
    };
    service.logIn(user);
    service.logOut();

    expect(service.isLogged).toBe(false);
    expect(service.sessionInformation).toBeUndefined();
    service.$isLogged().subscribe((isLogged) => {
      expect(isLogged).toBe(false);
    });
  });
});