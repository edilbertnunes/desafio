import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  closed = 0;
  // como vamos receber da base de dados uma lista de todo
  // vamos instanciar uma lista de todo e iniciar um array vazio
  list: Todo[] = [];
  listFinished: Todo[] = [];

  constructor(private service: TodoService, private router: Router) {}
  
  ngOnInit():void {
    this.findAll();
    
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(todo => {
        if(todo.finalizado) {
        this.listFinished.push(todo);
      } else {
        this.list.push(todo)
      }
      })
      // após finalizar o forEach atribui a quantidade de itens fechado para variável closed
      // essa quantidade será mostrada no badge
      this.closed = this.listFinished.length
    });
  }

  finalizar(item: Todo): void {
    item.finalizado = true
    this.service.update(item).subscribe((resposta) =>{
      this.service.message('Task finalizada com sucesso')
      this.list = this.list.filter(todo => todo.id !==item.id)
      this.closed++;
    })
  }

  delete(id: any):void{
    this.service.delete(id).subscribe((resposta) =>{
      if(resposta === null) {
        this.service.message('Task deletado com sucesso')
        this.list = this.list.filter(todo => todo.id !==id)
      }else {

      }

    })
  }

  navegarParaFinalizados(): void{
    this.router.navigate(['finalizados'])
  }

  update(id: any): void {
    
  }

  // countClosed(): void{
  //   for (let todo of this.list) {
  //     if(todo.finalizado) {
  //       this.closed++;
  //     }
  //   }
  // }


}
