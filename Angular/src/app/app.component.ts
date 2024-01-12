import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './state/User/user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from './Models/AppState';
import { CartService } from './state/Cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-angular';

  constructor(
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    // private cartService: CartService
  ) {}

  ngOnInit() {
    this.userService.getUserProfile();
    // this.cartService.getCart();

    this.store.pipe(select((store) => store.auth)).subscribe((user) => {
      this.userService.getUserProfile();
      // this.cartService.getCart();
    });

    const currentPath = this.activatedRoute.snapshot.routeConfig
    console.log('Current path:', currentPath);

    console.log(this.activatedRoute.toString(),"router ----- ",this.router.routerState.snapshot)
  }



}
