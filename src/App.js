import logo from './logo.svg';
import './App.css';

function Header(){
  return <header>
    <h1><a href="/">WEB</a></h1>
  </header>
}

function App() {
  return (
    <div class="Test">
      <Header></Header>
      Hello React!!
    </div>
  );
}

export default App;
