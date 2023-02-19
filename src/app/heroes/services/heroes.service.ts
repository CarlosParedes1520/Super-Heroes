import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataHeroes } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getHeroes():Observable<DataHeroes[]>{
    return this.http.get<DataHeroes[]>(`${this.baseUrl}/heroes`)
  }

  getHeroesPorId(personaje: string):Observable<DataHeroes>{
    return this.http.get<DataHeroes>(`${this.baseUrl}/heroes/${personaje}`)
  }

  getBuscarPorId(personaje: string):Observable<DataHeroes[]>{//?q=a&_limit=6
    return this.http.get<DataHeroes[]>(`${this.baseUrl}/heroes?q=${personaje}&_limit=6`)
  }

  agregarHeroe (heroe: DataHeroes):Observable<DataHeroes> {
    return this.http.post<DataHeroes>(`${this.baseUrl}/heroes`, heroe)
  }
  
  actualizarHeroe (heroe: DataHeroes):Observable<DataHeroes> {
    return this.http.put<DataHeroes>(`${this.baseUrl}/heroes/${heroe.id}`, heroe)
  }

  borrarHeroe (id: string):Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/heroes/${id}`)
  }
  
}
