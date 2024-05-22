import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/auth-service/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers:[MessageService]
})
export class LoginFormComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router,private messageService:MessageService) { }

  ngOnInit(): void {
    localStorage.clear();
  }
  
  email!:string
  password!:string
  error:boolean=false;
  

  login(credentials:any){
    
    this.authService.login(credentials).subscribe((res:any)=>{
      
      localStorage.setItem("accessToken", res.jwt);
      
      this.router.navigate(['/home']);

    },(error:any)=>{
     
      this.error=true;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.body });
    })
    
  }




}
