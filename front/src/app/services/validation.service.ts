import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private http: HttpClient) { }

  calcularIdade(dataNascimento: Date): number {
    const hoje = new Date();
    const dataNasc = new Date(dataNascimento);

    // remove as horas, minutos e segundos da data de hoje e da data de nascimento
    hoje.setHours(0, 0, 0, 0);
    dataNasc.setHours(0, 0, 0, 0);

    let idade = hoje.getFullYear() - dataNasc.getFullYear();
    const mes = hoje.getMonth() - dataNasc.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
      idade--;
    }
    return idade;
  }

}
