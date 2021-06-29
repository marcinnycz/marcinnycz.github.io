import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  showFiller = false;
  title = 'D4S';
  isAuthenticated = false;
  loginName = "";
  router: Router;
  constructor(public authService: AuthService, private _router: Router) {
    this.router = _router;
    this.authService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
    this.authService.loginName.subscribe(
      (loginName: string) => this.loginName = loginName
    );
  }

  async ngOnInit(): Promise<void>{
    this.isAuthenticated = await this.authService.checkAuthenticated();
    this.loginName = await this.authService.checkName();
    console.log('This is init!');
  }

  openMeden(){
    window.open("https://meden.com.pl/kontakt");
  }
  
  async logout(): Promise<void>{
    await this.authService.logout('/');
  }

  profile()
  {
    this.router.navigate(['/patient']);
  }
}

