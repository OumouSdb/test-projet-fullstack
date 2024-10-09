import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { expect, jest } from '@jest/globals';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    const authServiceMock = {
      register: jest.fn()
    };

    const routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatIconModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should call authService.register and navigate to /login on successful registration', () => {
    const mockRegisterRequest: RegisterRequest = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123456'
    };

    component.form.setValue(mockRegisterRequest);

    (authService.register as jest.Mock).mockReturnValue(of(void 0));

    component.submit();

    expect(authService.register).toHaveBeenCalledWith(mockRegisterRequest);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set onError to true when registration fails', () => {
    const mockRegisterRequest: RegisterRequest = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123456'
    };

    component.form.setValue(mockRegisterRequest);

    (authService.register as jest.Mock).mockReturnValue(throwError(() => new Error('Registration failed')));

    component.submit();

    expect(authService.register).toHaveBeenCalledWith(mockRegisterRequest);
    expect(component.onError).toBe(true);
  });

  it('should not call register when form is invalid', () => {
    component.form.setValue({
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    });

    component.submit();
    expect(authService.register).not.toHaveBeenCalled();
    expect(component.onError).toBe(true);
  });
});