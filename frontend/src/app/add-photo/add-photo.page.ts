import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.page.html',
  styleUrls: ['./add-photo.page.scss'],
})
export class AddPhotoPage implements OnInit {

  capturedPhoto: string = "";

  constructor(private usersService: UsersService,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.capturedPhoto = "";
  }

  ngOnInit() { }

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      // Verificar si el usuario no cancela la acción
      if (data) {
        this.capturedPhoto = data.webPath ? data.webPath : "";
      }
    }).catch(err => {
      // Manejo de errores cuando el usuario cancela la acción
      if (err.message.includes('User cancelled photos app')) {
        console.log("El usuario canceló la toma de la foto");
      } else {
        console.error("Error al tomar la foto:", err);
      }
    });
  }
  
  pickImage() {
    this.photoService.pickImage().then(data => {
      // Verificar si el usuario no cancela la acción
      if (data) {
        this.capturedPhoto = data.webPath;
      }
    }).catch(err => {
      // Manejo de errores cuando el usuario cancela la selección de la imagen
      if (err.message.includes('User cancelled photos app')) {
        console.log("El usuario canceló la selección de la foto");
      } else {
        console.error("Error al seleccionar la foto:", err);
      }
    });
  }
  

  discardImage() {
    this.capturedPhoto = "";
    console.log("El usuario ha descartado la foto");
  }

  // MÉTODO DESCOMENTADO
  async submitPhoto() {
    // Verificar que haya una foto capturada o seleccionada
    if (!this.capturedPhoto) {
      console.log("No hay foto para actualizar");
      return;
    }
  
    try {
      // Convertir la imagen capturada en un blob
      const response = await fetch(this.capturedPhoto);
      const blob = await response.blob();
  
      // Crear un File a partir del blob, asignándole un nombre
      const file = new File([blob], "profile-photo.jpg", { type: blob.type });
  
      // Llamar al servicio para enviar el archivo al backend
      this.usersService.uploadPhoto(file).subscribe({
        next: () => {
          console.log("¡Foto de perfil actualizada!");
          // Navegar a una página temporal y luego regresar al perfil
          this.router.navigateByUrl("/tabs/home").then(() => {
            this.router.navigateByUrl("/tabs/profile", { replaceUrl: true });
          });
        },
        error: (err) => {
          console.error("Error al enviar la foto:", err);
        }
      });
    } catch (error) {
      console.error("Error en submitPhoto:", error);
    }
  }
  
  

  goBack() {
    this.router.navigate(['/tabs/profile'], { replaceUrl: true });
  }


}
