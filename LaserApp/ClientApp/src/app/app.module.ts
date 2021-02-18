import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { SocketioService } from './Services/socketio.service';
import { GuageComponent } from './Components/guage/guage.component';
import { IgxRadialGaugeModule } from 'igniteui-angular-gauges';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { JogControlsComponent } from './Components/jog-controls/jog-controls.component';


const config: SocketIoConfig = {
  //url: "ws://192.168.254.159:8000", options: {}};
  url: "ws://127.0.0.1:8000", options: {}
};


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    GuageComponent,
    JogControlsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    IgxRadialGaugeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ]),
    BrowserAnimationsModule
  ],
  providers: [SocketioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
