import { Component, OnInit } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  createModal: any;
  editModal: any;
  deleteModal: any;
  constructor() {}

  ngOnInit(): void {
    this.createModal = new window.bootstrap.Modal(
      document.getElementById('createModal')
    );

    this.editModal = new window.bootstrap.Modal(
      document.getElementById('editModal')
    );
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
  }

  openCreateModal() {
    this.createModal.show();
  }

  openEditModal() {
    this.editModal.show();
  }

  openDeleteModal() {
    this.deleteModal.show();
  }
}
