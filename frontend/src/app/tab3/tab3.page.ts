import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  isLoading = true;
  products: any[] = [];

  emptyCartMessage = "";
  emptyBag = true;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCartByUser();
  }

  // Método del que me hablo un compañero para actualizar mis componentes
  ionViewWillEnter() {
    this.getCartByUser();
  }

  getCartByUser() {
    const userId = this.authService.getUserId();
    // Si el usuario no está autenticado
    if (!userId) {
      console.error('Usuario no autenticado');
      this.products = []; // Asegúrate de que la lista esté vacía
      this.emptyBag = true; // Establece el estado de la bolsa vacía
      this.emptyCartMessage = 'Inicia sesión para agregar productos a tu carrito.';
      this.isLoading = false; // Detén la carga
      return;
    }
  
    this.isLoading = true;
    this.shoppingCartService.getCartByUser(userId).subscribe({
      next: (response) => {
        this.products = response;
        this.emptyBag = response.length === 0; // Si no hay productos, muestra el mensaje
        this.emptyCartMessage = 'Tu bolsa de compras está vacía.';
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        if (error.status === 404) {
          console.warn('Carrito vacío o no encontrado.');
          this.products = []; // Asegúrate de que la lista esté vacía
          this.emptyBag = true;
          this.emptyCartMessage = 'Tu bolsa de compras está vacía.';
        } else {
          console.error('Error al obtener el carrito:', error);
        }
      },
    });
  }
  

  // Elimina un producto específico del carrito
  removeProduct(productId: number) {
    const userId = this.authService.getUserId();
    if (!userId || !productId) return;

    this.shoppingCartService.removeFromCart(userId, productId).subscribe({
      next: () => this.getCartByUser(),
      error: (error) => console.error('Error al eliminar producto.', error)
    });
  }

  // Elimina todos los productos del carrito
  clearCart() {
    const userId = this.authService.getUserId();
    if (!userId) return;

    this.shoppingCartService.clearCart(userId).subscribe({
      next: () => {
        this.products = []; // Limpia la lista de productos localmente
        console.log("Carrito vaciado correctamente.");
      },
      error: (error) => console.error('Error al vaciar el carrito.', error)
    });
  }
}
