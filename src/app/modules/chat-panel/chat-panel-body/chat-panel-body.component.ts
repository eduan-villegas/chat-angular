import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-chat-panel-body',
  templateUrl: './chat-panel-body.component.html',
  styleUrls: ['./chat-panel-body.component.css']
})
export class ChatPanelBodyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $("body").removeClass("profile-tab-open");
    $("body").addClass("chats-tab-open");
  }

}
