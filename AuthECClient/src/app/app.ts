import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent  } from "./user/user";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserComponent ],
  templateUrl: './app.html',
  styles: [],
})
export class App {
  protected readonly title = signal('AuthECClient');
}
