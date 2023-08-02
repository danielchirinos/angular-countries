import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {

    private debouncer: Subject<string> = new Subject<string>();

    // se crea una variable para asignarla a la suscripcion y poder desuscribirse
    private debouncerSubscription?: Subscription;

    // input del placeholder, llega desde otro componente
    @Input()
    placeholder: string = "";

    @Input()
    initialValue:string = "";

    // esto saldara desde este componente hacia otros componente
    @Output() 
    onValue: EventEmitter<string> = new EventEmitter<string>();
    
    @Output() 
    onDebounce: EventEmitter<string> = new EventEmitter<string>();

    ngOnInit(): void {
        this.debouncerSubscription = this.debouncer
        .pipe(
            //es el tiempo que transcurre para que se ejecute el next o el siguiente proceso que debe hacer el observable
            //en este caso el next ocurre cuando deja de escribir
            debounceTime(1000) 
        ).subscribe( value => {
            this.onDebounce.emit( value ) 
            
        })
    }

    ngOnDestroy(): void {
        this.debouncerSubscription?.unsubscribe()
    }

    // metodo de la vista que emite el valor
    sendValue( param:string ):void {
        this.onValue.emit(param)
        
    }

    onKeyPress( searchTerm: string ):void {
       this.debouncer.next( searchTerm )
    }
}
