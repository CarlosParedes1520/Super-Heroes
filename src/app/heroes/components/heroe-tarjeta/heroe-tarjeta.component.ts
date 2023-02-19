import { Component,Input } from '@angular/core';
import { DataHeroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styleUrls: ['./heroe-tarjeta.component.css']
})
export class HeroeTarjetaComponent {


  @Input('ArrayHeroe')  valor!: DataHeroes;
}
