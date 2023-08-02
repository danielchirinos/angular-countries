import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private url:string = "https://restcountries.com/v3.1";

    constructor(private http: HttpClient) {
        this.loadFromLocalStorage()
    }

    private saveToLocalStorage(){
        localStorage.setItem("cacheStore", JSON.stringify(this.cacheStore))
    }

    private loadFromLocalStorage(){
        if(!localStorage.getItem("cacheStore")) return;

        this.cacheStore = JSON.parse( localStorage.getItem("cacheStore")! )
    }

    public cacheStore: CacheStore = {
        byCapital: { term: "", countries: []},
        byCountries: { term: "", countries: []},
        byRegion: { region: "", countries: []}
    }

    // metodo que ejecuta la misma peticion y regresa el mismo tipo de dato
    private getCountriesRequest( url:string ): Observable<Country[]> {
        return this.http.get<Country[]>( url )
        .pipe(
            catchError( error => of([])),
            //es para retrasar el envio de la respuesta a la suscripcion
            // delay(2000), 
        );
    }

    searchCapital( term:string ): Observable<Country[]> {
        return this.getCountriesRequest(`${this.url}/capital/${term}`)
        .pipe(
            tap( countries => this.cacheStore.byCapital = { term, countries }  ),
            tap ( () => this.saveToLocalStorage() )
        )
    }

    searchCountry( term:string ): Observable<Country[]> {
        return this.getCountriesRequest(`${this.url}/name/${term}`)
        .pipe(
            tap( countries => this.cacheStore.byCountries = { term, countries }  ),
            tap ( () => this.saveToLocalStorage() )
        )
    }
    
    searchRegion( region:Region ): Observable<Country[]> {
        return this.getCountriesRequest(`${this.url}/region/${region}`).pipe(
            tap( countries => this.cacheStore.byRegion = { region, countries }  ),
            tap ( () => this.saveToLocalStorage() )
        )
    }
    
    searchCointyByAlphaCode( code: string ): Observable<Country | null> {
        return this.http.get<Country[]>(`${this.url}/alpha/${code}`)
        .pipe(
            // map( countries => (countries.length > 0) ? countries[0] : null ),
            map( countries => (countries.length > 0) ? countries[0] : null ),
            catchError( () => of(null))
        );

    }

}
