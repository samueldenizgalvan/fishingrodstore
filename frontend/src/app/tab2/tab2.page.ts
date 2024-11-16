import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild('modalPicker', { static: true }) modalPicker: any;
  activeProductIndex: number | null = null;

  isLoading = true;

  products: any[] = [];
  productId: any = null;  // Variable para almacenar el ID del producto seleccionado

  filteredProducts: any[] = []; // Lista filtrada para mostrar
  searchTerm: string = ''; // Término de búsqueda

  isModalOpenCreate = false;
  isModalOpenUpdate = false;

  productForm: FormGroup;

  productQuantity: number = 1;
  quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);  // Opciones de cantidad (1 a 10)

  alertButtons = ['Action'];

  constructor(
    private alertController: AlertController,
    private productsService: ProductsService,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    public formBuilder: FormBuilder
  ) { 

    this.loadProducts();

    this.productForm = this.formBuilder.group({
      price: ['', Validators.required],
      code: ['', Validators.required],
      brand: ['', Validators.required],
      photo_url: [''],
      color: [''],
      category: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getAllProducts();

    this.productsService.getProductsSubject().subscribe(products => {
      //this.products = products; // Actualiza la lista de productos
      this.filteredProducts = products; // Inicialmente, muestra todos los productos
    });
  }

  loadProducts() {
    this.productsService.getProducts().subscribe((data) => {
      //this.products = data;
      this.filteredProducts = data; // Inicializa la lista filtrada con todos los productos
      this.isLoading = false;
    });
  } 

  setOpenCreate(isOpen: boolean) {
    this.isModalOpenCreate = isOpen;
  
    if (isOpen) {
      this.productForm.reset(); // Resetear el formulario cuando se abre el modal
    }
  }

  setOpenUpdate(isOpen: boolean, product: any = null) {
    this.isModalOpenUpdate = isOpen;

    if (product) {
      this.productId = product.id; // Almacenar el ID del producto seleccionado
      this.productForm.patchValue({
        price: product.price,
        code: product.code,
        brand: product.brand,
        photo_url: product.photo_url,
        color: product.color,
        category: product.category,
      });
    }
  }

  createProduct() {
    if (this.productForm.valid) {
      console.log('Formulario Válido', this.productForm.value);
      this.productsService.create(this.productForm.value).subscribe(response => {
        this.productsService.getProducts(); // Llama a getProducts para refrescar datos en el servicio
        this.setOpenCreate(false); // Cerrar el modal después de crear
      });
    } else {
      console.log("Formulario no válido");
    }
  }

  getFormControl(field: string) {
    return this.productForm.get(field);
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe(response => {
      this.products = response;
    });
  }

  filterByCategory(category: string) {
    this.isLoading = true; // Activar loading mientras se cargan los productos
    this.productsService.getProductsByCategory(category).subscribe((data) => {
      //this.products = data;
      this.filteredProducts = data; // Actualiza la lista filtrada
      this.isLoading = false; // Desactivar loading cuando se cargan los productos
    });
  }

  filterProducts(event: any) {
    const searchTerm = event.target.value.toLowerCase(); // Convierte a minúsculas para búsquedas insensibles a mayúsculas

    if (!searchTerm) {
      this.filteredProducts = this.products; // Si no hay texto, muestra todos los productos
    } else {
      this.filteredProducts = this.products.filter(product => {
        return (
          product.brand.toLowerCase().includes(searchTerm) || // Filtra por marca
          product.code.toLowerCase().includes(searchTerm) || // Filtra por código
          product.category.toLowerCase().includes(searchTerm) || // Filtra por categoría
          product.color.toLowerCase().includes(searchTerm) // Filtra por color
        );
      });
    }
  }

  updateProduct() {
    if (this.productForm.valid && this.productId) {  // Asegurarse de que tenemos el ID del producto a actualizar
      const updatedProduct = this.productForm.value;
      this.productsService.update(this.productId, updatedProduct).subscribe(response => {
        console.log('Producto actualizado:', response);
        this.productsService.getProducts(); // Actualizar la lista de productos después del update
        this.isModalOpenUpdate = false; // Cerrar el modal después de actualizar
      });
    } else {
      console.log("Formulario no válido o no hay producto seleccionado");
    }
  }

  deleteProduct(id: any) {
    this.productsService.delete(id).subscribe(response => {
      this.getAllProducts();
    });
  }

  // Método para abrir el modal de selección de cantidad
  openPickerModal(index: number) {
    this.activeProductIndex = index;
    this.modalPicker.present();
  }

  onIonChange(event: CustomEvent) {
    this.productQuantity = event.detail.value;  // Actualiza la cantidad seleccionada
  }

  onDidDismiss(event: CustomEvent) {
    const { data, role } = event.detail;
    if (role === 'confirm' && this.activeProductIndex !== null) {
      this.filteredProducts[this.activeProductIndex].selectedQuantity = data;
    }
    this.activeProductIndex = null; // Restablecemos el índice activo
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¡Sabia Decisión!',
      message: 'Haz agregado este producto a tu cesta de compras.',
      buttons: ['OK']
    });

    await alert.present();
  }

  addToCart(productId: number, quantity: number) {
    const userId = this.authService.getUserId();

    if (!userId) {
      console.error('Usuario no autenticado');
      return;
    }

    if (quantity <= 0) {
      console.error('La cantidad debe ser mayor a cero');
      return;
    }

    this.shoppingCartService.addToCart(userId, productId, quantity).subscribe({
      next: (response) => console.log('Producto añadido:', response),
      error: (error) => console.error('Error al añadir el producto:', error)
    });

    this.presentAlert();
  }

}
