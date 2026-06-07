import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, FormsModule, InputTextModule, IconFieldModule, InputIconModule, PasswordModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    email = '';
    senha = '';
}

