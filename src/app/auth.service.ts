import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
import { OktaAuth } from '@okta/okta-auth-js'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authClient = new OktaAuth({
    issuer: 'https://dev-6524941.okta.com/oauth2/default',
    clientId:'0oapd7kzvCa9ZS0j35d6'
  });

  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public loginName = new BehaviorSubject<string>("");

  constructor(private router: Router) {
   }

  async checkAuthenticated(): Promise<boolean> {
    //const authenticated = await this.authClient.session.exists();
    this.isAuthenticated.next(this.isAuthenticated.getValue());
    const authenticated = this.isAuthenticated.getValue();
    return authenticated;
  }
  async checkName(): Promise<string> {
    await this.authClient.session.exists();
    const user = await this.authClient.getUser();
    const name = user.name;
    console.log(name);
    console.log('Hello there!');
    
    if(name)
    {
      this.loginName.next(name);
      return name;
    }else{
      this.loginName.next("");
      return "No";
    }
  }

  async login(username: string, password: string): Promise<void> {
    //const transaction = await this.authClient.signIn({username, password});

    //if (transaction.status !== 'SUCCESS') {
    //  throw Error('We cannot handle the ' + transaction.status + ' status');
    //}
    this.isAuthenticated.next(true);
    //this.authClient.session.setCookieAndRedirect(transaction.sessionToken);
  }
  async logout(redrect: string): Promise<void> {
    this.isAuthenticated.next(false);
    this.router.navigate([redrect]);
    // try{
    //   await this.authClient.signOut();
    //   this.isAuthenticated.next(false);
    //   await this.router.navigate([redrect]);
    // } catch (err){
    //   console.error(err);
    // }
  }
}
