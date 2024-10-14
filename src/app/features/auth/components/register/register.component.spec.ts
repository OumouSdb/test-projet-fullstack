import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: jest.Mocked<AuthService>;
  let routerMock = { navigate: jest.fn() }
  beforeEach(async () => {

    authServiceMock = {
      register: jest.fn().mockReturnValue(of({})),
    } as unknown as jest.Mocked<AuthService>;

    routerMock = {
      navigate: jest.fn(),
    }

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],

      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],

      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(" Should create account and navigate to the login page", () => {
    const registration = { lastName: "lastname", firstName: "firstname", email: "email@email.com", password: "password" } as any;
    authServiceMock.register.mockReturnValue(of(registration));
    component.form.setValue(registration);
    component.submit();

    expect(authServiceMock.register).toHaveBeenCalledWith(component.form.value);
    expect(routerMock.navigate).toHaveBeenCalledWith(["/login"]);
    expect(component.onError).toBe(false);
  })

  it('should create an error if not all fields are filled', () => {

    const incompleteRegistration = { lastName: 'lastname', firstName: 'firstname', email: '', password: 'password' };
    component.form.setValue(incompleteRegistration);


    component.submit();

    expect(authServiceMock.register).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
    expect(component.onError).toBe(true);
  });


});