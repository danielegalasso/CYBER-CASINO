import { Component, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Player } from '../model/Player';
import { AuthenticationService } from '../model/services/authentication.service';
import { ApiCallerService } from '../model/services/apiCaller.service';
import { createAlert } from '../model/popupCreator';
import { getErrorMessage } from '../model/ServerErrors';

var PEOPLE: Player[] = [];

function search(text: string, pipe: PipeTransform): Player[] {
	return PEOPLE.filter((person) => {
		const term = text.toLowerCase();
		return (
			person.username.toLowerCase().includes(term) 
		);
	});
}


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})


export class AdminPanelComponent {people$: Observable<Player[]>;
	filter = new FormControl('', { nonNullable: true });

	constructor(pipe: DecimalPipe, private authService: AuthenticationService, private apiCallerService: ApiCallerService) {
		this.apiCallerService.getListOfAllUsers().subscribe((results) => {
			PEOPLE = results;

			this.people$ = this.filter.valueChanges.pipe(
				startWith(''),
				map((text) => search(text, pipe)),
			);
		},
		error => {
			createAlert(getErrorMessage(error.error.message));
		});
	}

	toggleStatus(person: Player): void {
		person.isBanned = !person.isBanned;

		this.apiCallerService.setUserBan(person.username, person.isBanned).subscribe((results) => {
			if (!results) {
				person.isBanned = !person.isBanned;
				createAlert("Failed to change user status!");
			}
			else {
				createAlert(`User ${person.username} is now ${person.isBanned ? "banned" : "unbanned"}`);
			}
		},
		error => {
			person.isBanned = !person.isBanned;
			createAlert(getErrorMessage(error.error.message));
		});
	}
}