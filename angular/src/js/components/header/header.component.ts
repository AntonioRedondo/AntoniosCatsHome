import { Component, OnInit } from "@angular/core";
import { MessageService } from "../../services/message.service";

@Component({
	selector: "Header",
	templateUrl: "./header.htm",
	styleUrls: ["./header.scss"]
})
export class Header implements OnInit {
	constructor(public messageService: MessageService) {}

	ngOnInit() {
	}
}
