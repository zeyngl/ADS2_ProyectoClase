import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../models/UserModel';

@Component({
  selector: 'display-user-data',
  templateUrl: './display-user-data.component.html',
  styleUrls: ['./display-user-data.component.css']
})

export class DisplayUserDataComponent implements OnInit {
	
	user: UserModel = new UserModel({guid: "D21ds12x", 
		customerUid: "cust2dsa12dsa", 
		first_name: "John", 
		last_name: "Doe", 
		email: "email@email.com", 
		zipcode: 10283,
		password: "Idasn2x2#"});

	constructor() { }

	ngOnInit()
	{

	}

}