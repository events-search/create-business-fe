import { Component, OnInit, OnDestroy,HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Customer } from '../customer';
import { Business } from '../business';
import { HttpClientService } from '../service/http-client.service';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  currentCustomer: Customer;
  currentCustomerSubscription: Subscription;
  currentBusiness: Business;
  currentBusinessSubscription: Subscription;

  constructor(
    private router: Router,
    public httpClientService: HttpClientService,
    ) {

      this.currentCustomerSubscription = this.httpClientService.currentCustomer.subscribe(user => {
        this.currentCustomer = user;
      });
      this.currentBusinessSubscription = this.httpClientService.currentBusiness.subscribe(user => {
        this.currentBusiness = user;
      });
     }


  ngOnInit() {
  }
  ngOnDestroy() {
    this.currentCustomerSubscription.unsubscribe();
    this.currentBusinessSubscription.unsubscribe();
  }   
  public static businessTypeField = undefined;
  setFieldValue(businesstype: string){
    FooterComponent.businessTypeField=businesstype;
    this.router.navigate(['/findbusiness']);
    if (this.router.url === '/findbusiness'){
      this.redirectTo(this.router.url);
      document.getElementById("search-btn").click();
    }
  }
  redirectTo(uri) {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
    this.router.navigate([uri]));
  }

  screenWidth = 0;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
  this.screenWidth = window.innerWidth;
  if(this.screenWidth <1200){ 
    document.getElementsByClassName('fast-search-icon')[0].setAttribute('hidden','hidden');
    document.getElementsByClassName('fast-search-icon')[1].setAttribute('hidden','hidden');
        }    
  else{
    document.getElementsByClassName('fast-search-icon')[0].removeAttribute('hidden');  
    document.getElementsByClassName('fast-search-icon')[1].removeAttribute('hidden');   
    }
  }
}
