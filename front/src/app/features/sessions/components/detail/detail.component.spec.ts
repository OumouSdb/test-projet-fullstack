import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from '../../../../services/session.service';

import { DetailComponent } from './detail.component';
import { Session } from '../../interfaces/session.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeacherService } from 'src/app/services/teacher.service';
import { SessionApiService } from '../../services/session-api.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let sessionApiServiceMock: jest.Mocked<SessionApiService>;
  let teacherServiceMock: jest.Mocked<TeacherService>;
  let sessionServiceMock: jest.Mocked<SessionService>;
  let matSnackBarMock: jest.Mocked<MatSnackBar>;

  const mockSession: Session = {
    id: 1,
    name: 'Yoga',
    date: new Date(),
    description: 'Yoga session description',
    teacher_id: 2,
    users: []
  };

  const mockTeacher: Teacher = {
    id: 2,
    lastName: 'Doe',
    firstName: 'John',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(async () => {
    sessionApiServiceMock = {
      detail: jest.fn().mockReturnValue(of(mockSession)),
      delete: jest.fn().mockReturnValue(of({})),
      participate: jest.fn(),
      unParticipate: jest.fn()
    } as unknown as jest.Mocked<SessionApiService>;

    teacherServiceMock = {
      detail: jest.fn().mockReturnValue(of(mockTeacher))
    } as unknown as jest.Mocked<TeacherService>;

    sessionServiceMock = {
      sessionInformation: { id: 'user1', admin: true }
    } as unknown as jest.Mocked<SessionService>;

    matSnackBarMock = {
      open: jest.fn() // Mock open method
    } as unknown as jest.Mocked<MatSnackBar>;

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        MatCardModule,
        MatIconModule
      ],
      declarations: [DetailComponent],
      providers: [
        { provide: SessionApiService, useValue: sessionApiServiceMock },
        { provide: TeacherService, useValue: teacherServiceMock },
        { provide: SessionService, useValue: sessionServiceMock },
        { provide: MatSnackBar, useValue: matSnackBarMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should display user informations', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.session).toEqual(mockSession);
    expect(component.teacher).toEqual(mockTeacher);
  });

  it('should delete session and show snackbar', () => {
    component.sessionId = '1';

    component.delete();

    expect(sessionApiServiceMock.delete).toHaveBeenCalledWith('1');
    expect(matSnackBarMock.open).toHaveBeenCalledWith('Session deleted !', 'Close', { duration: 3000 });
  });

  it('Should display delete button if the user is an admin', () => {
    component.isAdmin = true;
    fixture.detectChanges(); // Actualise la vue après modification du composant
    const deleteButton = fixture.nativeElement.querySelector('button[mat-raised-button][color="warn"]');
    expect(deleteButton).toBeTruthy();
  })
});