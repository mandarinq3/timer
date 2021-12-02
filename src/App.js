import './App.scss';
import {interval} from 'rxjs';
import {useState} from 'react';
import $ from 'jquery';

function App() {

  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

// ------------------------подписки
  const [secSubs, setSecSubs] = useState(null);
  const [minSubs, setMinSubs] = useState(null);
  const [hourSubs, setHourSubs] = useState(null);

  const[isStarted, setIsStarted] = useState(false);

  let sec$=interval(1000);
  let min$=interval(60000);
  let hour$=interval(3600000);

  let  clickCount=0;
  

// ------------------------старт
function startTime(){

  let secIter=0;
  let minIter=0;
  let hourIter=0;

  $('.secondary-btn').fadeIn();
 
  if(isStarted==false){
    setSecSubs(sec$.subscribe(()=>{
      secIter++;
  
      setSec((prev)=>{
        return prev+1
      })
  
      if(secIter>59){
        setSec(0);
        secIter=0;
      }
  
  })) 
  
  setMinSubs( min$.subscribe(()=>{
    minIter++;
  
    setMin((prev)=>{
      return prev+1
    })
  
    if(minIter>59){
      setMin(0);
      minIter=0;
    }
  }))
  
  setHourSubs(hour$.subscribe(()=>{
    hourIter++;
  
    setHour((prev)=>{
      return prev+1
    })
  
    if(hourIter>59){
      setHour(0);
      hourIter=0;
    }
  }))
  
  }

  setIsStarted(true);
}

// ------------------------стоп
function stopTime(){
    secSubs.unsubscribe();
    minSubs.unsubscribe();
    hourSubs.unsubscribe();
    setSec(0);
    setMin(0);
    setHour(0);
    setIsStarted(false);
    $('.secondary-btn').fadeOut();
}

// ------------------------удержание
function waitTime(){
  clickCount++;

  if(clickCount>=2){
    secSubs.unsubscribe();
    minSubs.unsubscribe();
    hourSubs.unsubscribe();
    console.log("double clicked");
    setIsStarted(false);
  }else{
    setTimeout(()=>{
      clickCount=0;
    },300);
  }
}

// ------------------------сброс
function resetTime(){
    setSec(0);
    setMin(0);
    setHour(0);
    setIsStarted(false);
}




  return (
    
    <div className="App">
      <div className="display">
        {hour+':'+min+':'+sec}
      </div>
      <button className="btn" onClick={startTime}>start</button>
      <button className="stop-btn secondary-btn" onClick={stopTime}>stop</button>
      <button className="wait-btn secondary-btn" onClick={waitTime}>wait</button>
      <button className="reset-btn secondary-btn" onClick={resetTime}>reset</button>
    </div>
  );
}

export default App;