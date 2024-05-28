import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ViaCepService } from '../../services/viacep.service';
import { HttpClient } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  user: User = {
    nome: '',
    email: '',
    dataNascimento: new Date(),
    sexo: '',
    rua: '',
    numero: '' ,
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
  originalDataNascimento: Date = new Date();

  constructor(private router: Router, private service: UserService, private route: ActivatedRoute, private http: HttpClient, private viaCepService: ViaCepService, private validationService: ValidationService)
  {
    const currentDate = new Date();
    const today = new Date();
    this.maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    this.minDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
  }

  ngOnInit(): void {
    this.user.id = this.route.snapshot.paramMap.get("id")!; // para parar de reclamar foi colocado !
    this.findById();
  }

  findById(): void {
    this.service.findById(this.user.id).subscribe((resposta) => {
      this.user = resposta;
      this.originalDataNascimento = new Date(this.user.dataNascimento); 
    });
  }
  update(): void {
    if (this.emailControl.invalid) {
      this.service.message('Por favor, insira um email válido');
      return;
    }

    // Verifica se a data de nascimento está vazia
    if (!this.user.dataNascimento) {
      alert('Por favor, selecione uma data de nascimento.');
      return;
    }

    // Verifica se o usuário tem pelo menos 18 anos
    if (this.validationService.calcularIdade(this.user.dataNascimento) < 18) {
      alert('Usuário deve ter pelo menos 18 anos.');
      return;
    }

    this.user.email = this.emailControl.value || '';
    this.user.dataNascimento = this.formatDate(this.user.dataNascimento);

    this.service.update(this.user).subscribe(response => {
      this.service.message('Usuário atualizado com sucesso');
      this.router.navigate(['']);
    }, err => {
      this.service.message('Falha ao atualizar Usuário');
      this.router.navigate(['']);
    });
  }

 cancel(): void {
    this.router.navigate([''])
  }

  getAddress(): void {
    const cep = this.user.cep.replace(/\D/g, '');  // Remove caracteres não numéricos
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

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }


}
