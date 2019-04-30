import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HotelComponent } from './hotel/hotel.component';
import { RublesPipe } from './rubles.pipe';
// import { WebsocketService } from './websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    HotelComponent,
    RublesPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
