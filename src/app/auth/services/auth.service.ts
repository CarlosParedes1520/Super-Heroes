import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  baseUrl:string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(){
    return {...this._auth}
  }
  
  constructor(private http: HttpClient) { }

  verificaAutenticacion(): Observable<boolean>{
    if (!localStorage.getItem('usuario')) {
      //of()es un operador creacional que le permite crear un Observable RxJS a partir de una secuencia de valores.
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    // Es un método de los Observables que me permite encadenarle operadores.
    .pipe(
      // Te permite transformar el evento de entrada. Tiene esta estructura map(data => transform(data)).
      map(auth => {
        console.log('map',auth);
        this._auth = auth
        return true
      })
    );
  }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      // No es tanto un efecto pensado para alterar el flujo de datos, sino para facilitar efectos colaterales. Por ejemplo, si quieres guardar cada evento en localstorage, podrías hacer: tap(event => localStorage.setItem('evt', event))
      tap(auth => { this._auth = auth}),
      tap(auth => { localStorage.setItem('usuario',auth.id)})
    );
  }

  logout() {
    this._auth = undefined
  }
}
