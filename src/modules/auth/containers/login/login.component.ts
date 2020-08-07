import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services';

@Component({
    selector: 'sb-login', 
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    constructor(        
        private router:Router,
        private authService:AuthService

        ) {}
    ngOnInit() {}

    onLogin(data){
        console.log(data.username);
        console.log(data.password);

        //this.Redirect();
    }
    Redirect(){

        this.router.navigate(['/dashboard']);  

    }
}
