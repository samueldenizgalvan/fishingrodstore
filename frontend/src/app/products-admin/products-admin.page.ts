import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.page.html',
  styleUrls: ['./products-admin.page.scss'],
})
export class ProductsAdminPage implements OnInit {

  isLoading = true;

  products: any[] = [];
  productId: any = null;  // Variable para almacenar el ID del producto seleccionado

  isModalOpenCreate = false;
  isModalOpenUpdate = false;

  productForm: FormGroup;

  constructor(
    private router: Router,
    private productsService: ProductsService,
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
      this.products = products; // Actualiza la lista de productos
    });
  }

  loadProducts() {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
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

  goToHome() {
    this.router.navigateByUrl("/tabs/home");
  }
}
