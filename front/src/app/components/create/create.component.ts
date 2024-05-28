import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';
import { ViaCepService } from '../../services/viacep.service';
import { FormControl, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  user: User = {
    nome: '',
    email: '',
    dataNascimento: new Date(),
    sexo: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    cadastrado: false
  };
  minDate: Date;
  maxDate: Date;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  dataNascimentoControl = new FormControl(new Date(), [Validators.required]);


  constructor(private router: Router, private service: UserService, private http: HttpClient, private viaCepService: ViaCepService, private validationService: ValidationService) {
    const currentDate = new Date();
    const today = new Date();
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.minDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  }

  ngOnInit(): void { }

  create(): void {
    if (this.emailControl.invalid) {
      this.service.message('Por favor, insira um email válido');
      return;
    }

    if (this.validationService.calcularIdade(this.user.dataNascimento) < 18) {
      alert('Usuário deve ter pelo menos 18 anos.');
      return;
    }

    this.user.email = this.emailControl.value || '';
    this.user.dataNascimento = this.formatDate(this.user.dataNascimento);

    this.service.create(this.user).subscribe(response => {
      this.service.message('Usuário criado com sucesso');
      this.router.navigate(['']);
    }, err => {
      this.service.message('Falha ao criar Usuário');
      this.router.navigate(['']);
    });
  }
  cancel(): void {
    this.router.navigate(['']);
  }

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getAddress(): void {
    const cep = this.user.cep.replace(/\D/g, ''); 
    if (cep && cep.length === 8) {
      this.viaCepService.getAddress(cep).subscribe(data => {
        if (data) {
          this.user.rua = data.logradouro;
          this.user.bairro = data.bairro;
          this.user.cidade = data.localidade;
          this.user.estado = data.uf;
          this.user.complemento = data.complemento;
        }
      });
    }
  }
}
