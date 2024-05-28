import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  closed = 0;

  list: User[] = [];

  constructor(private service: UserService, private router: Router) {}

  ngOnInit():void {
    this.findAll();

  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(user => {
        if(user.cadastrado) {
        this.list.push(user);
      } else {
        this.list.push(user)
      }
      })
    });
  }

  delete(id: any):void{
    this.service.delete(id).subscribe((resposta) =>{
      if(resposta === null) {
        this.service.message('Usário deletado com sucesso')
        this.list = this.list.filter(todo => todo.id !==id)
      }else {

      }

    })
  }

  update(id: any): void {

  }

}
