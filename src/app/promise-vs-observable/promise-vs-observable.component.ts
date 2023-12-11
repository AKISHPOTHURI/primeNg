import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, concat, filter } from 'rxjs';

@Component({
  selector: 'app-promise-vs-observable',
  templateUrl: './promise-vs-observable.component.html',
  styleUrls: ['./promise-vs-observable.component.scss']
})
export class PromiseVsObservableComponent implements OnInit, OnDestroy {

  public mySubscription!:Subscription;
  currencyPipeString: any;
  constructor( private currencyPipe:CurrencyPipe ) {
    // pipes usage in TypeScript
    this.currencyPipeString = currencyPipe.transform(100,'USD');
    console.log(this.currencyPipeString);
   }

  ngOnInit(): void {
    // Promise -> eager, return only one,
    const promise = new Promise(resolve => {
      console.log('Promise call........');
      setTimeout(() => {
        resolve('Promise working')
        resolve('Promise working1')
        resolve('Promise working2')
        resolve('Promise working3')
      },1000)   
    })
    promise.then(result => console.log(result));

    // observable -> lazy, return many,
    const obs = new Observable(sub => {
      console.log('Observable call....');
      setTimeout(() => {
        sub.next('Observable working');
        sub.next('Observable working1');
        sub.next('Observable working2');
        sub.next('Observable working3');
      },1000);
      // let counter = 0;
      // setInterval(() => {
      //   counter = counter + 1;
      //   sub.next(counter);
      // },1000);
    });
    obs.pipe(
      filter(d => d=='Observable working1')
    ).subscribe(result => console.log(result));
    this.mySubscription = obs.subscribe(result => console.log('counter value' + result));
    obs.subscribe(data => {
      console.log(data);
      
    });
    
  }

  ngOnDestroy(): void {
    this.mySubscription.unsubscribe()
  }
 

}
