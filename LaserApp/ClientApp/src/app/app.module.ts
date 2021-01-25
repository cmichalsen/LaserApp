import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SocketIoModule, Socket } from 'ngx-socket-io';

@Injectable()
export class SocketOne extends Socket {

  constructor() {
    super({ url: 'ws://192.168.254.159:8000', options: {} });
  }

}

@Injectable()
export class SocketTwo extends Socket {

  constructor() {
    super({ url: 'ws://192.168.254.159:8082', options: {} });
  }

}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    SocketIoModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ])
  ],
  providers: [ SocketOne, SocketTwo ],
  bootstrap: [AppComponent]
})
export class AppModule { }
