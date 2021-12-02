import { Observable,interval } from 'rxjs';
import {useState} from 'react';

function Interval() {
 
const int=interval(1000).subscribe((v)=>{
    console.log(v);
    if(v==5){
    int.unsubscribe();
    }
    })



  return (
    <>
    <h1>hi</h1>
    </>
  );
}

export default Interval;
