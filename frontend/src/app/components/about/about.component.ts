import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  public title: string;
  public subtitle: string;
  public email: string;

  constructor() {
    this.title = "Josue Ortiz";
    this.subtitle = "Desarrollador web e Ingeniero Mecatronico";
    this.email = "josue_noob@hotmail.com";
    
  }
}
