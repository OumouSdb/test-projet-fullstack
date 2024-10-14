import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jest.Mocked<AuthService>;
  let sessionServiceMock: jest.Mocked<SessionService>;
  let routerMock = {
    navigate: jest.fn()
  };


  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    sessionServiceMock = {
      logIn: jest.fn(),
    } as unknown as jest.Mocked<SessionService>;

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login successfully and navigate to /sessions', () => {

    const sessionInfo = { userId: '123' } as any;
    authServiceMock.login.mockReturnValue(of(sessionInfo));

    component.form.setValue({ email: 'test@example.com', password: 'password123' });

    component.submit();

    expect(authServiceMock.login).toHaveBeenCalledWith(component.form.value);
    expect(sessionServiceMock.logIn).toHaveBeenCalledWith(sessionInfo);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/sessions']);
    expect(component.onError).toBe(false);
  });


  it('should set onError to true on login failure', () => {

    authServiceMock.login.mockReturnValue(throwError(() => new Error('Login failed')));

    component.form.setValue({ email: 'test@example.com', password: 'password123' });

    component.submit();

    expect(component.onError).toBe(true);
  });
});
