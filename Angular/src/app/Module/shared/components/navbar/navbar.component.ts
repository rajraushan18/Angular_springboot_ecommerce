import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AuthComponent } from 'src/app/Module/auth/auth.component';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';
import { UserService } from 'src/app/state/User/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  currentSection:any
  isNavbarContentOpen:any
  userProfile: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>,
    private userService:UserService,
    // private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {

    if (localStorage.getItem('jwt')) this.userService.getUserProfile()
    this.store.pipe(select((store:AppState)=>store.user)).subscribe((user)=>{
      this.userProfile=user.userProfile;
      if(user.userProfile){
        this.dialog.closeAll()
              } 
    })
  }

  handleLogout = () => {
    console.log('logout success');
    this.userService.logout()
  };


  openNavbarContent(section:any){
    this.isNavbarContentOpen = true
    this.currentSection=section
  }

  closeNavbarContent(){
    this.isNavbarContentOpen=false
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const modalContainer = document.querySelector('.modal-container');
    const openButtons = document.querySelectorAll('.open-button');

    let clickedInsideButton = false;

    openButtons.forEach((button: Element) => {
      if (button.contains(event.target as Node)) {
        clickedInsideButton = true;
      }
    });

    if (modalContainer && !clickedInsideButton && this.isNavbarContentOpen) {
      // console.log(
      //   'container ---------------------- ',
      //   this.isNavbarContentOpen
      // );
      this.closeNavbarContent();
    }
  }

  handleOpenLoginModel=()=>{
    this.dialog.open(AuthComponent, {
      width: '400px',
      disableClose: false,
    });
  }

  navigateTo(path:any){
    this.router.navigate([path])
  }



}
