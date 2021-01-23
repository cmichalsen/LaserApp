import { Component } from '@angular/core';
import { SocketioService } from './Services/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  constructor(private socketService: SocketioService) { }
  ngOnInit() {
    this.socketService.setupSocketConnection();
  }
}
