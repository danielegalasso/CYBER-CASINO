import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  _defaultOpts = [
    "Niente",
    "Bonus 5€",
    "Bonus 10€",
    "Niente",
    "Bonus 1€",
    "Niente",
    "Bonus 3€",
    "Niente",
    "Bonus 200€",
  ];

  optionSource: BehaviorSubject<String[]>;
  option$;

  /*
  winnersSource: BehaviorSubject<String[]>;
  winner$: Observable<String[]>;
  */
  constructor() {
    // QUA AL POSTO DI this.getOptions() ci metto la funzione dal backend che mi ritorna le opzioni
    this.optionSource = new BehaviorSubject(this.getOptions());
    this.option$ = this.optionSource.asObservable();
    /*
    this.winnersSource = new BehaviorSubject([]);
    this.winner$ = this.winnersSource.asObservable();
     */
  }

  persistOptions() {
    localStorage.setItem("OPTS", JSON.stringify(this.optionSource.getValue()));
  }

  getOptions(): String[] {
    const value = localStorage.getItem("OPTS");
    return value ? JSON.parse(value) : this._defaultOpts;
  }

  addNewOption(value) {
    const currentOpts = [...this.optionSource.getValue()];
    currentOpts.push(value);
    this.optionSource.next(currentOpts);
    this.persistOptions();
  }

  deleteNewOption(value) {
    const currentOpts = this.optionSource.getValue();
    this.optionSource.next(currentOpts.filter(opts => opts != value));
    this.persistOptions();
  }

  resetToDefault() {
    this.optionSource.next(this._defaultOpts);
  }
}
