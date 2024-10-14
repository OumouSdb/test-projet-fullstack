import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import { of } from 'rxjs';
import { AuthService } from './features/auth/services/auth.service';
import { SessionService } from './services/session.service';
import { Router } from '@angular/router';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let sessionServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    sessionServiceMock = {
      $isLogged: jest.fn().mockReturnValue(of(true)),
      logOut: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: AuthService, useValue: {} },
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should call sessionService.$isLogged and return the observable', (done) => {
    component.$isLogged().subscribe((result) => {
      expect(result).toBe(true);
      done();
    });

    expect(sessionServiceMock.$isLogged).toHaveBeenCalled();
  });

  it('should log out and navigate to the root', () => {
    component.logout();

    expect(sessionServiceMock.logOut).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['']);
  });
});