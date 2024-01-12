import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mensPantsPage1 } from 'src/Data/pants/men_page1';
import { AppState } from 'src/app/Models/AppState';
import { getCartRequest } from 'src/app/state/Cart/cart.actions';
import { CartService } from 'src/app/state/Cart/cart.service';
import { ProductService } from 'src/app/state/Product/product.service';
import { productdata } from 'src/productsData';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  selectedSize:any;
  relatedProducts: any;
  product:any
  productDetails$!: Observable<any>;
  productId!: Number;
  reviews=[1,1,1,1]

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private productService: ProductService,
    private cartService:CartService,
  ) {
    // this.relatedProducts = productdata;
  }

  navigateToCart = () => {
    this.router.navigate(['/cart']);
  };

  ngOnInit(){

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productId=Number(id)
    console.log('productId', id);
    console.log("productId",this.productId)
    if (id) {
      console.log('id ', id);
      this.productService.findProductById(id)
    }
    
    this.productDetails$ = this.store.select(
      (state) => state.product.selectedProduct
    );
    
    console.log("productDetails",this.productDetails$)
    
    this.store.pipe(select((store)=>store.product)).subscribe((product)=>{
        this.product=product?.selectedProduct
        console.log("store data", product.selectedProduct)
    });


    // this.relatedProducts = mensPantsPage1

    // const id = this.activatedRoute.snapshot.paramMap.get("id")
    // this.productService.findProductById(id)
    // this.productId = Number(id)
    // this.store.pipe(select((store)=>store.product)).subscribe((product)=>{
    //   this.product=product?.product
    //   console.log("store data", product.selectedProduct)
    // })


  }
  

  handleAddToCart = () => {

    const data = { size: this.selectedSize, productId: this.productId };
    console.log("cartid",this.productId)
    this.cartService.addItemToCart(data)
    this.cartService.getCart()

    this.store.dispatch(getCartRequest());

    this.navigateToCart();


    // this.router.navigate(['cart'])
    // this.cartService.addItemToCart(this.productId)
    // console.log(this.selectedSize);
  };


}
