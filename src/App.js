
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App--header">
  
          <h1>Game of Life</h1> 
        <GameOfLife/>
      </header>
    </div>
  );
}

// http://pi.math.cornell.edu/~lipa/mec/lesson6.html
class GameOfLife extends React.Component{
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
      this.beginBtnRef = React.createRef(); 
       
      this.state = {
        isAlive: false,
        cells: 7,
        currentState: [],
        oldState: [],
        dx: 800 ,
        dy: 400 ,
        lifes: 100,
        howBig: 9.55,
        gameContinues: true,
        colorAlive: '#2ecc71',
        iteration: 0,
        it: 0,
        population: 8.5,
        intrvalId: 0

      };
      
      this.gameInitilization = this.gameInitilization.bind(this);
      this.gameRules = this.gameRules.bind(this);
      this.draw = this.draw.bind(this);
      this.clear = this.clear.bind(this);
      this.handleChangeSize = this.handleChangeSize.bind(this);
      this.handleChangePopulation = this.handleChangePopulation.bind(this);
      this.handleChangeWidth = this.handleChangeWidth.bind(this);
    }
    componentDidMount() {
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = "#999";
      ctx.fillRect(0,0,this.state.dx,this.state.dy);
      console.log("component mounted");
    }
   
    gameInitilization(e) {
      let array = Array(this.state.dx/10).fill(0);

      e.target.style.cursor = "not-allowed";
      e.target.style.pointerEvents = "none";
      e.target.style.backgroundColor = "red";
  
      for (let x = 0; x < this.state.dx/10; x++) {
         array[x] = new Array(this.state.dy/10).fill(0); 
        
        for (let y = 0; y < this.state.dy/10; y++) {
          if ( x == 0 || y == 0 || x == this.state.dx/10 - 1 || y == this.state.dy/10 - 1 ) array[x][y]=0;
          else {
          if (Math.floor(Math.random() * 10) > this.state.population) array[x][y] = 1;}
        }
      }
      
      this.setState({...this.state, cells: array, currentState: array, oldState: array});
      console.log("initalization");
      //this.newFrame(array);
      
      this.interval =  setInterval(() => this.draw(array), 75);
    }
    draw(array) {
      this.setState({...this.state, oldState: this.state.currentState});
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      for (let x = 0; x < this.state.dx/10; x++) {
        for (let y = 0; y < this.state.dy/10; y++) {
          
          if (this.state.currentState[x][y] === 1) {
            ctx.fillStyle = '#2ecc71';
            ctx.lineWidth = 2;
            ctx.strokeRect (x * 10,y *10,this.state.howBig, this.state.howBig);
            ctx.fillRect(x * 10 , y * 10 , this.state.howBig, this.state.howBig);
         
          } 
          else {
            ctx.clearRect(x * 10 , y * 10 , this.state.howBig, this.state.howBig);
            ctx.fillStyle = "#999";
            ctx.fillRect(x * 10 , y * 10 , this.state.howBig, this.state.howBig);
          }
        }
      }
    
      
      this.gameRules(array);
      
    }
    // More than 3 or less than 2 loose;
    // stays alive if exactly 2,3 are neighboring ;
    // if cell is 0 and has exactly 3 neighbors it reproduces;
    
    gameRules (array) {
     let localSum = 0;
     for (let x = 0; x < this.state.dx/10; x++) {
      for (let y = 0; y < this.state.dy/10; y++) {
        if ( x >= 1 && y >=  1 && x < this.state.dx/10 - 1   && y < this.state.dy/10 - 1) {
           if (array[x][y] === 0){
                localSum += array[x-1][y-1];
                localSum += array[x-1][y];
                localSum += array[x-1][y+1];

                localSum += array[x][y-1];
                
                localSum += array[x][y+1];


                localSum += array[x+1][y-1];
                localSum += array[x+1][y+1];
                localSum += array[x+1][y];
                if (localSum === 3) {
                  array[x][y] = 1;
                }
                localSum = 0;
              }
            if (array[x][y] === 1) {
              localSum += array[x-1][y-1];
              localSum += array[x-1][y];
              localSum += array[x-1][y+1];

              localSum += array[x][y-1];
            
              localSum += array[x][y+1];


              localSum += array[x+1][y-1];
              localSum += array[x+1][y+1];
              localSum += array[x+1][y];
              if (localSum < 2 || localSum > 3 ) {
                array[x][y] = 0;
                
              
              }
              localSum = 0;
            }
            if (array[x][y] === 1) {
              localSum += array[x-1][y-1];
                localSum += array[x-1][y];
                localSum += array[x-1][y+1];

                localSum += array[x][y-1];
               
                localSum += array[x][y+1];


                localSum += array[x+1][y-1];
                localSum += array[x+1][y+1];
                localSum += array[x+1][y];
              if (localSum === 2 ||  localSum === 3) {
                array[x][y] = 1;
              }
              localSum = 0;
            }
            if (array[x][y] === 1) {
              localSum += array[x-1][y-1];
                localSum += array[x-1][y];
                localSum += array[x-1][y+1];

                localSum += array[x][y-1];
                
                localSum += array[x][y+1];


                localSum += array[x+1][y-1];
                localSum += array[x+1][y+1];
                localSum += array[x+1][y];
              if (localSum === 0) {
                array[x][y] = 0;
                
              }
             
              localSum = 0;
            }

      }
      }
    }
    this.setState({...this.state, currentState: array});
    }
    clear(e) {
      this.state.cells = 0;
      this.state.currentState = 0;
      this.state.oldState = 0;
      const canvas = this.canvasRef.current;
      const ctx = canvas.getContext('2d');
      for (let x = 0; x < this.state.dx/10; x++) {
        for (let y = 0; y < this.state.dy/10; y++) {
          ctx.clearRect(x * 10 , y * 10 , this.state.howBig, this.state.howBig);
          ctx.fillStyle = "#999";
          ctx.fillRect(x * 10 , y * 10 , this.state.howBig, this.state.howBig);
      }
      }
      const btn = this.beginBtnRef.current;
      btn.style.backgroundColor = "#2ecc71";
      btn.style.cursor = "pointer";
      btn.style.pointerEvents = "all";
      
      this.componentWillUnmount();
      
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
    handleChangeSize(e) {
      this.setState({...this.state, howBig: e.target.value});
    }
    handleChangePopulation(e) {
      this.setState({...this.state, population: e.target.value});
    }
    handleChangeWidth(e) {
      this.setState({...this.state, dy: e.target.value});
    }

    render() {
      return (
      <>
        <div className='App--env' >
          <br></br>
          <div className='App--grid'>
          <div className='App--rules'>
            <h2> Rules </h2>
            <ul>
              <li> If the cell is alive, then it stays alive if it has either 2 or 3 live neighbors. </li>
              <li> If the cell is dead, then it springs to life only in the case that it has 3 live neighbors.</li>
            </ul>
            
           <div className='App--btn'>
              <button className='App--btn__begin' ref={this.beginBtnRef} onClick={this.gameInitilization} > Begin </button>
              <button className='App--btn__clear' onClick={this.clear}> Clear </button>
            </div>
          </div>

          <canvas ref={this.canvasRef} className='App--canvas' width={this.state.dx} height={this.state.dy}></canvas>
          
          <br></br>
          
          <div className='App--table'>
            <h3>style</h3>
            <input className='App--table__slider'type="range" min="7" max="10" step='0.25' value={this.state.howBig} onChange={this.handleChangeSize}/> 
            <h3>size of population</h3>
            <input className='App--table__slider' type="range" min="6" max="9" step='0.25' value={this.state.population} onChange={this.handleChangePopulation}/>
            <h3>size of environment</h3>
            <input className='App--table__slider' type="range" min="200" max="750" step='10' value={this.state.dy} onChange={this.handleChangeWidth}/>
          </div> 
          <br></br>
          </div>
          
          
          
        </div>
        <br></br><br></br>
        <div className='App--about'>
        <h2>Conway's Game of Life</h2> 
        <p>
        The Game of Life (an example of a cellular automaton) is played on an infinite two-dimensional rectangular grid of cells. Each cell can be either alive or dead. The status of each cell changes each turn of the game (also called a generation) depending on the statuses of that cell's 8 neighbors. Neighbors of a cell are cells that touch that cell, either horizontal, vertical, or diagonal from that cell.

        The initial pattern is the first generation. The second generation evolves from applying the rules simultaneously to every cell on the game board, i.e. births and deaths happen simultaneously. Afterwards, the rules are iteratively applied to create future generations. For each generation of the game, a cell's status in the next generation is determined by a set of rules.
        
        There are, of course, as many variations to these rules as there are different combinations of numbers to use for determining when cells live or die. Conway tried many of these different variants before settling on these specific rules. Some of these variations cause the populations to quickly die out, and others expand without limit to fill up the entire universe, or some large portion thereof. The rules above are very close to the boundary between these two regions of rules, and knowing what we know about other chaotic systems, you might expect to find the most complex and interesting patterns at this boundary, where the opposing forces of runaway expansion and death carefully balance each other.
        </p>
        </div>
      
      </>
      ); 
    }
}
export default App;
