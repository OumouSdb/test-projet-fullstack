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
      register: jest.fn() // Moquer la méthode register
    };

    const routerMock = {
      navigate: jest.fn(), // Moquer la méthode navigate
    };

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,  // Importez BrowserAnimationsModule pour les animations
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
    // Arrange
    const mockRegisterRequest: RegisterRequest = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123456'
    };

    component.form.setValue(mockRegisterRequest);

    // Moquer register pour renvoyer un Observable de succès
    (authService.register as jest.Mock).mockReturnValue(of(void 0));

    // Act
    component.submit();

    // Assert
    expect(authService.register).toHaveBeenCalledWith(mockRegisterRequest);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should set onError to true when registration fails', () => {
    // Arrange
    const mockRegisterRequest: RegisterRequest = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: '123456'
    };

    component.form.setValue(mockRegisterRequest);

    // Moquer register pour renvoyer une erreur
    (authService.register as jest.Mock).mockReturnValue(throwError(() => new Error('Registration failed')));

    // Act
    component.submit();

    // Assert
    expect(authService.register).toHaveBeenCalledWith(mockRegisterRequest);
    expect(component.onError).toBe(true);
  });

  it('should not call register when form is invalid', () => {
    // Arrange
    component.form.setValue({
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    }); // Valeurs invalides

    // Act
    component.submit();

    // Assert
    expect(authService.register).not.toHaveBeenCalled(); // register ne doit pas être appelé
    expect(component.onError).toBe(false); // onError reste false
  });
});
