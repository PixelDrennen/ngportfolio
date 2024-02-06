import { Component } from '@angular/core';
import { CreateWindowService } from 'src/app/services/admin/crud/create-window.service';

@Component({
  selector: 'app-create-content-window',
  templateUrl: './create-content-window.component.html',
  styleUrl: './create-content-window.component.scss'
})
export class CreateContentWindowComponent {
constructor(public createWindowService:CreateWindowService){}
}
