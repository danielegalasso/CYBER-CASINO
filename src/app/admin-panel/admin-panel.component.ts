import { Component, PipeTransform } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';


interface Person {
	name: string;
	banned: boolean;
}

const PEOPLE: Person[] = [
	{
		name: 'Domenico',
		banned: false,
	},
	{
		name: 'Federico',
		banned: true,
	},
	{
		name: 'Daniele',
		banned: false,
	},
	{
		name: 'Ernesto',
		banned: false,
	},
	
];

function search(text: string, pipe: PipeTransform): Person[] {
	return PEOPLE.filter((person) => {
		const term = text.toLowerCase();
		return (
			person.name.toLowerCase().includes(term) 
		);
	});
}


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})


export class AdminPanelComponent {people$: Observable<Person[]>;
	filter = new FormControl('', { nonNullable: true });

	constructor(pipe: DecimalPipe) {
		this.people$ = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => search(text, pipe)),
		);
	}

	toggleStatus(person: Person): void {
		person.banned = !person.banned;
	}
	
}