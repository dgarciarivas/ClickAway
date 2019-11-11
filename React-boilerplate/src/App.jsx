import React from 'react';
import ReactDOM from 'react-dom';


const rootEl = document.getElementById('root');


    class App extends React.Component{
      
      constructor(){
        super();
        this.state = {
            isPlaying: false,
            score: 0, 
            text: 'Ready?',
            start: undefined, //this is when the count first started
            timeElapsed: 0, //this is the time elapsed before the counter was stopped
            store: 0, 
            limit: 5,
            kps: 0,

      }
    this.startTime = this.startTime.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    
      }
  startTime(){
    let on;
    const current = new Date();
    if(!this.state.isPlaying){     
        on = true;
        this.setState({start: current});
    }else if(this.state.isPlaying === false){
        on = false;
    }
    this.handleOnClick(on);
  }
  handleOnClick(ON){
    if(ON){
 
      this.count = setInterval(()=>{
        let dif  = new Date() - this.state.start;
        let formated = Math.floor((dif + this.state.store)/100)/10;
        this.setState({
          timeElapsed:  formated,
        })
        console.log(dif);
      }, 100);
    }else{
      console.log('stopped', this.state.timeElapsed);
      this.setState({store: this.state.timeElapsed});
    }
  }  
          render(){
              
                                                        
                    return(
                   
                            <div className="App"
                             style={{                                      
                                      flexDirection: 'column',
                                      justifyContent: 'space-around',
                                      textAlign: 'center',
                                    }}>

                              <div id = 'instructionContainer'>
                              <h1>INSTRUCTIONS</h1>
                                <p>Click on the red button to turn it green</p>
                                <p>Press any key to increase your score</p>
                                <p> You have {this.state.limit} seconds to play</p>
                                <p> Click on the number under "Time" to change how long you want to play. Buggy</p>
                              </div>
                             <div id = "infoContainer" 
                                  style={{display: 'flex',
                                          flexDirection: 'row',
                                          justifyContent: 'space-around',
                                        }}>
                                <div id = "scoreContainer">     
                                  <div id = "scoreText" style={{color: '#50ABE3', fontSize: '40px',}}>Score</div>
                                  <div id = 'score' style={{color: '#50ABE3', fontSize: '60px'}}>{this.state.score}</div>
                                </div>
                                <div id = "timeContainer">
                                  <div id = "timeText" style={{color: '#50ABE3' , fontSize: '40px',}}>Time</div>
                                  <div id = 'time' 
                                    onClick = {
                                      ()=>{
                                        let newLim = Number(prompt('How many seconds do you want to play?'));
                                        if(typeof newLim === "number"){
                                          this.setState({
                                            limit: newLim
                                          });
                                        }
                                        else{
                                            alert('invalid input... time limit did not change');
                                          }
                                      }
                                    }
                                    style = {{color: '#50ABE3',fontSize: '60px' }}> 
                                  {this.state.timeElapsed}</div>
                                  
                                </div>
                                <div id = 'keysPerMinuteContainer'>
                                    <div id = 'keysPerMinuteText' 
                                      style={{color: '#50ABE3' , fontSize: '40px',}}>kps</div>
                                    <div id = 'keysPerMinute'
                                          style={{color: '#50ABE3' , fontSize: '40px',}}
                                          >{this.state.kps}
                                      </div>
                                  </div>
                              </div>


                                 
                              
                               
                                <button id = "presser"
                                  style={{width: '350px',
                                          height: '300px',
                                          borderRadius: '25px',
                                          fontSize: '40px',
                                          backgroundColor: 'red',}}
                                onClick = {
                                  ()=>{
                                    this.setState({text: 'Go!'});
                                    document.getElementById('presser').style.backgroundColor = 'green';
                                  }
                                }
                                onKeyDown = {
                                 // button to start game
                                  ()=> {
                                        //game not on
                                      if(!this.state.isPlaying){
                                            this.setState({
                                              text: '+1',
                                              isPlaying: true,
                                              score: 0,
                                              timeElapsed: 0,
                                              });
                                            console.log('it started'); 
                                            this.startTime(); // start the timer
                                          }
                                          //game is on and in the time limit
                                          else if(this.state.isPlaying && this.state.timeElapsed < this.state.limit){
                                             var current = Number(this.state.score)+1;
                                             var kps = Math.floor(current / this.state.timeElapsed);
                                             var newColor  = '#'+Math.floor(Math.random()*16777215).toString(16);
                                             document.getElementById("presser").style.color = newColor;
                                             document.getElementById("score").style.color = newColor;
                                             document.getElementById("time").style.color = newColor;
                                             var newSizeInfo = (Number(document.getElementById("score").style.fontSize.slice(0,-2)) + 0.25).toString()+'px';
                                             document.getElementById('score').style.fontSize  = newSizeInfo;
                                             document.getElementById('time').style.fontSize  = newSizeInfo;
                                             document.getElementById("presser").style.fontSize = (Number(document.getElementById("presser").style.fontSize.slice(0,-2)) + 1).toString()+'px';

                                            this.setState({score: current,
                                                            kps: kps});
                                              console.log(this.state); }
                                            else{
                                              //game ended
                                                //this.state.timeElapsed >= this.state.limit
                                                this.setState({text: 'Ready?', isPlaying: false ,
                                                 score: 0,
                                                 timeElapsed: 0, 
                                                 kps: 0 }); 
                                                alert('You scored '+this.state.score+' in '+this.state.limit+' seconds');
                                                document.getElementById("presser").style.fontSize = '40px';
                                                document.getElementById("time").style.fontSize = '60px';
                                                document.getElementById("score").style.fontSize = '60px';
                                                console.log('it stopped');  clearInterval(this.count);
                                                document.getElementById('presser').style.backgroundColor = 'red';
                                                document.getElementById('presser').style.color = 'black';}}}> 
                                    
                                     
                                {this.state.text}</button>

                                <div> 
                                   <button id = 'restart button'
                                           onClick = {()=>{
                                            clearInterval(this.count);
                                            this.setState({text: 'Ready?', isPlaying: false ,
                                                 score: 0,
                                                 timeElapsed: 0, 
                                                 kps: 0, }); 
                                               document.getElementById("presser").style.fontSize = '40px';
                                                document.getElementById("time").style.fontSize = '60px';
                                                document.getElementById("score").style.fontSize = '60px';
                                                console.log('it stopped');  
                                              document.getElementById('presser').style.backgroundColor = 'red';
                                              document.getElementById('presser').style.color = 'black';
                                            }}
                                             >
                                      Restart
                                </button>
                                  <h1 style = {{fontSize: '20px'}}>
                                  Disclaimer:
                                  </h1>
                                    <p> Time displayed can reach over {this.state.limit} seconds; however, any click after {this.state.limit} seconds is not counted. </p>
                                  <p>This can be tested by allowing the timer to go over {this.state.limit} seconds then clicking.</p>
                                </div>
                               
                                <h1 style = {{fontSize: '25px'}}> Credits to Jared Helman for the idea</h1>

                               </div>
                    );

            }
  }

    ReactDOM.render(
        <App />, rootEl
    );




// This checks for local changes and automatically refreshes the browser (hot-reloading)
if (module.hot) {
    module.hot.accept('./components/App.jsx', () => renderApp());
}










