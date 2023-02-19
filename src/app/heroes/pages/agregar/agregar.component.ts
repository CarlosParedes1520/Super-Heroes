import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataHeroes, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap  } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit{

  @ViewChild('name') name: ElementRef | undefined;

  heroe: DataHeroes={
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  } 


  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  guardar(){
    if (this.heroe.superhero.trim().length === 0 ) {
      return;
    }



    if (this.heroe.id) {
      this.heroesService.actualizarHeroe(this.heroe)
      this.heroesService.getHeroes();
      this.router.navigateByUrl('/');
    } else {
      this.heroe.id = 'heroe-'+this.name?.nativeElement.value
      this.heroesService.agregarHeroe(this.heroe)
      this.openSnackBar(`se ha agregado el heroe ${this.heroe.alter_ego}`)
    }

   
  }

  openSnackBar( mensaje: string) {
    this._snackBar.open(mensaje, 'OK!',{
      duration:  2500,
    });
  }

  constructor(
    private heroesService:HeroesService,
    private ActivatedRoute:ActivatedRoute,
    private router:Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog, 
    private activateRoute: ActivatedRoute,
   ) {

    this.activateRoute.params.subscribe(({id}) =>{

      if (id) {
          this.heroesService.getHeroesPorId(id)
          this.heroe = this.heroesService.getHeroesPorIdData(id)
      }
     
    })
  
  }
  ngOnInit(): void {

    console.log( this.router.url.includes('heroes/editar') );
    
    if( this.router.url.includes('heroes/editar')){

      // con params vamos a recuperar los parámetros enviados mediante el sistema de rutas
      // para recibir los valores de los parámetros en el componente al que nos dirige la 
      // ruta tenemos que usar un objeto del sistema de routing llamado "ActivatedRoute". 
      // Este objeto nos ofrece diversos detalles sobre la ruta actual, entre ellos los parámetros que contiene.
      this.ActivatedRoute.params.pipe(
        // switchMap Te permite añadir un evento o secuencia de eventos al inicio de flujo de datos. Por ejemplo, 
        //si quieres que tu flujo de datos, sea el que sea, empiece con el valor cero, podrías usar: startWith(0).
      switchMap(({id}) => 
      this.heroesService.getHeroesPorId(id))
      )
    }
  
    // console.log(this.heroe );
    
  }


  borrarHeroe(heroe: DataHeroes){
      const dialog = this.dialog.open(ConfirmarComponent, {
        width: '300px',
        data: this.heroe
      })

      console.log(this.heroe.id, heroe.id);
      
      dialog.afterClosed().subscribe((result)=> {
        //   console.log(result);
           if (result) {
          
            // .subscribe((heroeEliminado)=>{
            
            
            this.heroesService.borrarHeroe(heroe.id+'')
                
            
                //  
            
            this.router.navigate(['/heroes/listado']);
              // console.log(heroeEliminado)
      
           }
      }) 
      // }
      // )

   
  }

}
