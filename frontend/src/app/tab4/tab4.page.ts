import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { UsersService } from '../services/users.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userForm: FormGroup;
  loginForm: FormGroup;
  isModalOpenRegister = false;
  passwordType: string = 'password';
  isLoggedIn = false;
  isLoading = true;
  userData: any = {};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertController: AlertController,
    private toastController: ToastController,
    private storage: Storage,
    private usersService: UsersService
  ) {
    this.userForm = this.formBuilder.group({
      identification: ['', Validators.required],
      name: ['', Validators.required],
      surname1: ['', Validators.required],
      surname2: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      address: [''],
      password: ['', Validators.required],
      sexo: ['', Validators.required]
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log("ngOnInit ejecutado"); 
    this.initializeStorage();
  }

  async initializeStorage() {
    await this.storage.create();
    this.checkLoginStatus();
  }

  async checkLoginStatus() {
    const token = await this.storage.get('authToken');
    this.isLoggedIn = !!token; 

    if (this.isLoggedIn) {
      this.loadUserData();
    } else {
      this.isLoading = false;  // Deja de cargar si no hay token
    }
  }

  loadUserData() {
    const userId = this.authService.getUserId();
    if (!userId) {
      console.error("Usuario no autenticado");
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.usersService.getUserById(userId).pipe(
      catchError(error => {
        console.error('Error al cargar los datos del usuario', error);
        this.isLoading = false;
        return of(null);
      })
    ).subscribe((data) => {
      if (data) {
        this.userData = data;
      }
      this.isLoading = false;
    });
  }

  ionViewWillEnter() {
    // Se recargan los datos cada vez que la página se vuelve a mostrar
    this.loadUserData();
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }

  setOpenRegister(isOpen: boolean) {
    this.isModalOpenRegister = isOpen;
    if (isOpen) {
      this.userForm.reset();
    }
  }

  login() {
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      async (response) => {
        const token = response.token;

        await this.storage.set('authToken', token);
        this.isLoggedIn = true;

        const successToast = await this.toastController.create({
          message: 'Login exitoso. ¡Bienvenido de nuevo!',
          duration: 2000,
          color: 'success',
          position: 'top',
        })
        await successToast.present();
        this.setOpenRegister(false);
        this.loadUserData();  // Carga datos de usuario después del login
      },
      async () => {
        // Mostrar mensaje de error con un Toast
        const errorToast = await this.toastController.create({
          message: 'Correo o contraseña incorrecta.',
          duration: 2000,
          color: 'danger',
          position: 'top',
        });
        await errorToast.present();
      }
    );
  }

  register() {
    const userData = this.userForm.value;
    this.authService.register(userData).subscribe(
      async () => {
        const alert = await this.alertController.create({
          header: 'Registro exitoso',
          message: 'Usuario registrado correctamente',
          buttons: ['OK']
        });
        await alert.present();
        this.setOpenRegister(false);
      },
      async () => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No se pudo registrar el usuario',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  async logout() {
    // Elimina todos los datos del localStorage
    await this.storage.clear();  // Esto elimina todos los datos guardados en el almacenamiento local de ionic
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('authToken');
  
    // También podemos eliminar datos adicionales que estén guardados en memoria o variables
    this.isLoggedIn = false;
    this.userData = {};
    this.isLoading = false;
  
    // Mostramos una alerta indicando que la sesión se ha cerrado
    const alert = await this.alertController.create({
      header: 'Sesión Cerrada',
      message: 'Has cerrado sesión exitosamente.',
      buttons: ['OK']
    });
    await alert.present();
  
    // Redirigir al usuario a la pantalla de login o inicio
    this.router.navigateByUrl('/login'); // O cualquier otra ruta para redirigir al login
  }
  

  getFormControl(field: string) {
    return this.userForm.get(field);
  }

  changePhoto() {
    this.router.navigateByUrl('/add-photo');
  }
  
}
