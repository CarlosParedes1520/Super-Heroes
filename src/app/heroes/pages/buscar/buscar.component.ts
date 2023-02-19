import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DataHeroes } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent {

  termino: string = '';
  heroes: DataHeroes[] = [];

  heroeSeleccionado!: DataHeroes | undefined;
   heroeSeleccionado2!: DataHeroes ;
  constructor(private heroesService: HeroesService) {

  }

  buscandoFiltro(){
    // this.heroesService.getHeroes().subscribe((heroe)=> this.heroes = heroe)
    this.heroesService.getBuscarPorId(this.termino.trim()).subscribe((heroe)=> this.heroes = heroe)
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){
    const heroe= event.option.value
    
    if (heroe) {
      this.heroeSeleccionado = heroe
      this.heroeSeleccionado2 = heroe
      this.termino = heroe.superhero
      console.log(this.heroeSeleccionado);
      this.heroesService.getHeroesPorId(heroe.id).subscribe((personaje)=> this.heroeSeleccionado=personaje)
    }else {
      this.heroeSeleccionado = undefined
      return;
    }
    
    
  }
}
