
import './styles/App.css';
import { Board } from './components/board';

function App() {
  return (
    <div className="App">
      <Board player= "human" />
      <Board player= "AI" />
    </div>
  );
}

export default App;
