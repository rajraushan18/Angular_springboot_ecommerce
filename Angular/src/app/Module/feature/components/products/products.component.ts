import { Component } from '@angular/core';
import { filters, singleFilter } from './FilterData';
import { mensPantsPage1 } from 'src/Data/pants/men_page1';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/state/Product/product.service';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  filterData:any
  singleFilterData:any
  menPants:any
  products:any
  fetchedProducts:any;
  lavelThree:any

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private productService:ProductService,
    private store:Store<AppState>,
    ){}

  ngOnInit(){
    this.filterData=filters
    this.singleFilterData=singleFilter
    // this.menPants=mensPantsPage1

    this.activatedRoute.paramMap.subscribe(

      (params) => {
        this.lavelThree=params.get('lavelThree')
        var reqData = {
          category: params.get('lavelThree'),
          colors: [],
          sizes: [],
          minPrice: 0,
          maxPrice: 10000,
          minDiscount: 0,
          sort: 'price_low',
          pageNumber: 1,
          pageSize: 10,
          stock: null,
        };
        
       
        this.productService.findProductsByCategory(reqData)
        
        console.log("req" + reqData);
        // this.lavelOne = params.get('lavelOne');
        // this.lavelTwo = params.get('lavelTwo');
        // this.lavelThree = params.get('lavelThree');
      }
    );

      this.activatedRoute.queryParams.subscribe(
        (params)=>{
          const color = params['color']; // Retrieves the value of the 'color' parameter
          const size = params['size']; // Retrieves the value of the 'size' parameter
          const price = params['price']; // Retrieves the value of the 'price' parameter
          const discount = params['disccout']; // Retrieves the value of the 'discount' parameter
          const stock = params['stock']; // Retrieves the value of the 'stock' parameter
          const sort=params["sort"]
          const minPrice = price?.split('-')[0];
          const maxPrice = price?.split('-')[1];
          const pageNumber=params["pageNumber"]

          const updatedReqData = {
            category: this.lavelThree,
            colors: params['color'] ? [params['color']].join(',') : [], // Extract and set color parameter
            sizes: [],
            minPrice: params['price'] ? minPrice : 0,
            maxPrice: params['price'] ? maxPrice : 100000,
            minDiscount: discount?discount:0,
            sort: sort?sort:'price_low',
            pageNumber: pageNumber? pageNumber-1:0,
            pageSize: 100,
            stock: null,
          };

          this.productService.findProductsByCategory(updatedReqData)

        }
      )


    this.store.pipe(select((store)=>store.product)).subscribe((product)=>{
      this.products=product?.products?.content

      // this.totalPages=product.products.totalElements

      console.log("products store ",product)
    }
    )

  }

  handleMultipleSelectFilter(value: string, sectionId: string){
    const queryParams = {...this.activatedRoute.snapshot.queryParams}

    console.log(queryParams)

    const filterValues = queryParams[sectionId] ? queryParams[sectionId].split(',') : [];
    const valueIndex = filterValues.indexOf(value);

    if(valueIndex!=-1){
      filterValues.splice(valueIndex, 1)
    }else{
      filterValues.push(value);
    }

    if (filterValues.length > 0) {
      queryParams[sectionId] = filterValues.join(',');
    } else {
      delete queryParams[sectionId];
    }

    this.router.navigate([], { queryParams });

  }

  handleSingleSelectFilter(value: string, sectionId: string): void {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };

    queryParams[sectionId] = value;

    this.router.navigate([], { queryParams });
  }



}
