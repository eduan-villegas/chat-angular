import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatPanelRoutingModule } from './chat-panel-routing.module';
import { ChatPanelComponent } from './chat-panel.component';
import { ChatPanelBodyComponent } from './chat-panel-body/chat-panel-body.component';
import { ChatPanelProfileComponent } from './chat-panel-profile/chat-panel-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ChatPanelComponent,
    ChatPanelBodyComponent,
    ChatPanelProfileComponent
  ],
  imports: [
    CommonModule,
    ChatPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ChatPanelModule { }
