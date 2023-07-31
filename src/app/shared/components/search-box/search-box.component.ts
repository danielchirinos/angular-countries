import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

    // input del placeholder, llega desde otro componente
    @Input()
    placeholder: string = "";

    // esto saldara desde este componente hacia otros componente
    @Output() 
    onValue: EventEmitter<string> = new EventEmitter();

    // metodo de la vista que emite el valor
    sendValue( param:string ):void {
        this.onValue.emit(param)
        
    }

}
