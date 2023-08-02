import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

    public country?: Country;

    constructor( private activatedRoute: ActivatedRoute, private countriesSevice: CountriesService, private router: Router ){}

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
        this.activatedRoute.params
        .pipe(
            // aqui desesctucturo el arreglo de params para sacar los campos necesarios "id" en este caso
            switchMap( ( {id} ) => this.countriesSevice.searchCointyByAlphaCode(id)),
            // switchMap( ( params ) => this.countriesSevice.searchCointyByAlphaCode(params["id"])),
        )
        .subscribe( country => {
            if( !country ) return this.router.navigateByUrl("")
            return this.country = country
        })
    }
}
