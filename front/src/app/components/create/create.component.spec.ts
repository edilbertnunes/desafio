import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CreateComponent } from './create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ValidationService } from '../../services/validation.service';
import { UserService } from '../../services/user.service';

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let validationService: ValidationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonToggleModule
      ],
      providers: [UserService, ValidationService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    validationService = TestBed.inject(ValidationService);
  });

  it('valida padrão de email', () => {
    component.emailControl.setValue('emailemail.com.br');
    expect(component.emailControl.valid).toBeTruthy();
  });

  it('valida email inválido', () => {
    component.emailControl.setValue('email@email.com.br');
    expect(component.emailControl.invalid).toBeTruthy();
  });

  it('valida data de nascimento maior que 18', () => {
    component.user.dataNascimento = new Date('2000-01-01');
    expect(validationService.calcularIdade(component.user.dataNascimento)).toBeGreaterThanOrEqual(18);
  });

  it('valida se idade menor que 18 anos', () => {
    component.user.dataNascimento = new Date('2020-01-01');
    expect(validationService.calcularIdade(component.user.dataNascimento)).toBeLessThan(18);
  });
});
