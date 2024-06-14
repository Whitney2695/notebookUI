import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  showCreateForm = false; // Initially hide the create form

  constructor() { }

  ngOnInit(): void {
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
  }

}