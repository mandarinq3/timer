import './App.scss';
import { Observable } from 'rxjs';
import {useState} from 'react';

function App() {

const [sec, setSec]=useState(0);
const [min, setMin]=useState(0);
const [hour, setHour]=useState(0);

const [intv, setIntv]=useState(null);

let s=sec;
let m=min;
let h=hour;


let  clickCount=0;


let subscription;

const strim$=new Observable((observer) => {
  
 

  setIntv(setInterval(()=>{

    
    observer.next(s);
    s++;
    if(s>59){
      s=0;
      m++;
      setMin(m);
      if(m>59){
        m=0;
        s=0;
        h++;
        setMin(0);
        setHour(h);   
      } 
    }
  },1000))
  
})


function subscribeToStrim(){
  subscription=strim$.subscribe({
    next:(value)=>{setSec(value)},
  })
}


function startTime(){
  subscribeToStrim();
 }

function stopTime(){
 clearInterval(intv);
 setSec(0);
 setMin(0);
 setHour(0);
}

function waitTime(){
  clickCount++;

  if(clickCount>=2){
    clearInterval(intv);
    console.log("double clicked");
  }else{
    setTimeout(()=>{
      clickCount=0;
    },300);
  }


  
}

function resetTime(){

  if(subscription!=undefined){
    subscription.unsubscribe();
  }

  clearInterval(intv);

  setSec(0);
  setMin(0);
  setHour(0);

  s=0;
  m=0;
  h=0;

  subscribeToStrim();
}




  return (
    <div className="App">
      <div className="display">
        {hour+':'+min+':'+sec}
      </div>
      <button onClick={startTime}>start</button>
      <button onClick={stopTime}>stop</button>
      <button onClick={waitTime}>wait</button>
      <button onClick={resetTime}>reset</button>
    </div>
  );
}

export default App;
