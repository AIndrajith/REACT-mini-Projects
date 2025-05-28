import React , {useState , useRef} from 'react'

function padTime(time){
  return time.toString().padStart(2, "0");
}

const App = () => {
  
  const [timeLeft, setTimeLeft] = useState(25*60);

  const minutes = padTime(Math.floor(timeLeft/60));

  const seconds = padTime(timeLeft - minutes*60);

  const [title, setTitle] = useState("Let the Countdown begins!");
  
  let intervalRef = useRef(null);

  const [isRunning, setIsRunning] = useState(false);
  
  function startTimer(){
    if(intervalRef.current != null) return;
    setTitle(`You're doing great!`)
    setIsRunning(true);
    intervalRef.current = setInterval(()=>{
      setTimeLeft((timeLeft) => {
        if(timeLeft>=1){
          return timeLeft-1
        };
        // reset the timer
        resetTimer();
        return 0;
      });
    }, 1000);
  }

  function stopTimer(){
    if(intervalRef.current == null) return;
    setTitle("Keep it up!");
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }

  function resetTimer(){
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("Ready to go for another Round!");
    setTimeLeft(25*60);
    setIsRunning(false);
  }

  return (
    <div className='app'>
      <h2>{title}</h2>
      <div className='timer'>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div>
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  )
}

export default App
