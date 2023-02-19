import { Component, OnInit } from '@angular/core';
import { DataHeroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  personaje: DataHeroes[] = [] 

  constructor(private heroesservice: HeroesService){}
  
  ngOnInit(): void {
    this.heroesservice.getHeroes().subscribe(resp =>  {
      this.personaje = resp
    }
    )
  }


}
