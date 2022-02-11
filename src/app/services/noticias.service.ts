import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  pageLine = 1;

  categoriaActual: string;
  categoriaPage: number;
  paisActual: string;
  paisPage: number;

  constructor( private http: HttpClient) { }

  private ejecutarQuery<T>( query: string){

    query = apiUrl + query;

    return this.http.get<T>(query, { headers });
  }

  getTopHeadLines(pais){
    if (this.paisActual === pais) {
      this.pageLine++;
      console.log('Aumenta pageline: ',this.pageLine);
      
    }else{
      this.paisActual = pais;
      this.pageLine = 1;

      console.log('Nuevo pais y pageline: ',this.pageLine, this.paisActual);

    }

    return this.ejecutarQuery<RespuestaTopHeadLines>(`top-headlines?country=${pais}&page=${this.pageLine}`);
  }

  getTopHeadLinesCategoria(categoria: string, pais){

    if(this.categoriaActual === categoria){
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery(`top-headlines?country=${pais}&category=${categoria}&page=${this.categoriaPage}`);
  }
}
