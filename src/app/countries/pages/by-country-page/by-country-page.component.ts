import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

    countries: Country[] = [];

    constructor(private countriesService: CountriesService){

    }

    searchByPais( term: string):void {

        this.countriesService.searchCountry(term)
        .subscribe( countries => {
            this.countries = countries
            
        })
    }
}
