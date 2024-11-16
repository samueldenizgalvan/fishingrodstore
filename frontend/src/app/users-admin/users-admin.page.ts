import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.page.html',
  styleUrls: ['./users-admin.page.scss'],
})
export class UsersAdminPage implements OnInit {

  users: any = [];
  userId: any = null;  // Variable para almacenar el ID del usuario seleccionado

  isModalOpenCreate = false;
  isModalOpenUpdate = false;

  userForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UsersService,
    public formBuilder: FormBuilder
  ) { 
    this.userForm = this.formBuilder.group({
      identification: ['', Validators.required],
      name: ['', Validators.required],
      surname1: ['', Validators.required],
      surname2: [''],
      email: ['', Validators.required],
      phone: [''],
      address: [''],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllUsers();

    this.userService.getUsersSubject().subscribe(users => {
      this.users = users; // Actualiza la lista de usuarios
    });
  }

  setOpenCreate(isOpen: boolean) {
    this.isModalOpenCreate = isOpen;
  
    if (isOpen) {
      this.userForm.reset(); // Resetear el formulario cuando se abre el modal
    }
  }

  setOpenUpdate(isOpen: boolean, user: any = null) {
    this.isModalOpenUpdate = isOpen;

    if (user) {
      this.userId = user.id; // Almacenar el ID del usuario seleccionado
      this.userForm.patchValue({
        identification: user.identification,
        name: user.name,
        surname1: user.surname1,
        surname2: user.surname2,
        email: user.email,
        phone: user.phone,
        address: user.address,
        password: user.password,
      });
    }
  }

  createUser() {
    if (this.userForm.valid) {
      console.log('Formulario Válido', this.userForm.value);
      this.userService.create(this.userForm.value).subscribe(response => {
        this.userService.getUsers(); // Llama a getUsers para refrescar datos en el servicio
        this.setOpenCreate(false); // Cerrar el modal después de crear
      });
    } else {
      console.log("Formulario no válido");
    }
  }

  getFormControl(field: string) {
    return this.userForm.get(field);
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });
  }

  updateUser() {
    if (this.userForm.valid && this.userId) {  // Asegurarse de que tenemos el ID del usuario a actualizar
      const updatedUser = this.userForm.value;
      this.userService.update(this.userId, updatedUser).subscribe(response => {
        console.log('Usuario actualizado:', response);
        this.userService.getUsers(); // Actualizar la lista de usuarios después del update
        this.isModalOpenUpdate = false; // Cerrar el modal después de actualizar
      });
    } else {
      console.log("Formulario no válido o no hay usuario seleccionado");
    }
  }

  deleteUser(id: any) {
    this.userService.delete(id).subscribe(response => {
      this.getAllUsers();
    });
  }

  goToHome() {
    this.router.navigateByUrl("/tabs/home");
  }
}
