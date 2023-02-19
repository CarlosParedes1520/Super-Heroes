import { Component, OnInit , Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataHeroes } from '../../interfaces/heroes.interface';
import { switchMap, tap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit{
  
constructor(private activateRoute: ActivatedRoute, private heroesS: HeroesService,
  private router: Router){}


@Input('valor') heroe!: DataHeroes;

  // datosHeroe(valor: string){
  //     this.heroesS.getHeroesPorId(valor).subscribe((data) => this.heroe = data)

  // }

 
  ngOnInit(): void {
    this.activateRoute.params.pipe(switchMap(({id}) => this.heroesS.getHeroesPorId(id))).subscribe(heroe => this.heroe = heroe);

  }

  regresar(){

    this.router.navigate(['/heroes/listado'])
  }


}
