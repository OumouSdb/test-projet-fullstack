// import { HttpClientModule } from '@angular/common/http';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatIconModule } from '@angular/material/icon';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { RouterTestingModule } from '@angular/router/testing';
// import { expect } from '@jest/globals';
// import { SessionService } from 'src/app/services/session.service';
// import { SessionApiService } from '../../services/session-api.service';

// import { FormComponent } from './form.component';
// import { of } from 'rxjs';
// import { Session } from '../../interfaces/session.interface';

// describe('FormComponent with Jest', () => {
//   let component: FormComponent;
//   let fixture: ComponentFixture<FormComponent>;
//   let sessionApiService: jest.Mocked<SessionApiService>;

//   const mockSessionService = {
//     sessionInformation: {
//       admin: true,
//     },
//   };

//   beforeEach(async () => {
//     sessionApiService = {
//       create: jest.fn(),
//       update: jest.fn(),
//       detail: jest.fn(),
//     } as unknown as jest.Mocked<SessionApiService>;

//     await TestBed.configureTestingModule({
//       imports: [
//         RouterTestingModule,
//         HttpClientModule,
//         MatCardModule,
//         MatIconModule,
//         MatFormFieldModule,
//         MatInputModule,
//         ReactiveFormsModule,
//         MatSnackBarModule,
//         MatSelectModule,
//         BrowserAnimationsModule,
//       ],
//       providers: [
//         { provide: SessionService, useValue: mockSessionService },
//         { provide: SessionApiService, useValue: sessionApiService },
//       ],
//       declarations: [FormComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(FormComponent);
//     component = fixture.componentInstance;

//     // Initialiser le formulaire avant chaque test
//     component.initForm();

//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should create a session when form is valid', async () => {
//     // Définir les valeurs valides dans le formulaire
//     component.sessionForm?.setValue({
//       name: 'Test Session',
//       date: '2024-09-25',
//       teacher_id: '1',
//       description: 'This is a test session description',
//     });

//     // Définir un mock conforme au type Session
//     const mockSession: Session = {
//       id: 1,
//       name: "Test Session",
//       description: "This is a test session description",
//       date: new Date('2024-09-25'),
//       teacher_id: 1,
//       users: [1, 2, 3],
//       createdAt: new Date(),
//       updatedAt: new Date()
//     };

//     // Mock la méthode create de sessionApiService avec le bon type
//     jest.spyOn(sessionApiService, 'create').mockReturnValue(of(mockSession));

//     await component.submit();

//     // Vérifier que la méthode create a bien été appelée avec les bonnes données
//     expect(sessionApiService.create).toHaveBeenCalledWith(expect.objectContaining({
//       name: 'Test Session',
//       date: expect.any(Date),  // Accepte n'importe quelle instance de Date
//       teacher_id: 1,
//       description: 'This is a test session description',
//     }));

//     // Vérifier que la snackbar affiche un message de succès
//     expect(component.snackBar.open).toHaveBeenCalledWith('Session created !', 'Close', { duration: 3000 });
//   });

//   it('should show validation errors if required fields are missing', () => {
//     // Set empty form values
//     component.sessionForm?.setValue({
//       name: '',
//       date: '',
//       teacher_id: '',
//       description: '',
//     });

//     fixture.detectChanges(); // Refresh the view

//     // Simulate form submission
//     component.submit();

//     // Expect that the create method is NOT called since the form is invalid
//     expect(sessionApiService.create).not.toHaveBeenCalled();

//     // Validate that form fields have errors (ng-invalid class)
//     const nameInput = fixture.nativeElement.querySelector('input[formControlName="name"]');
//     const dateInput = fixture.nativeElement.querySelector('input[formControlName="date"]');
//     const teacherSelect = fixture.nativeElement.querySelector('mat-select[formControlName="teacher_id"]');
//     const descriptionInput = fixture.nativeElement.querySelector('textarea[formControlName="description"]');

//     expect(nameInput.classList).toContain('ng-invalid');
//     expect(dateInput.classList).toContain('ng-invalid');
//     expect(teacherSelect.classList).toContain('ng-invalid');
//     expect(descriptionInput.classList).toContain('ng-invalid');
//   });
// });