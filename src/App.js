import logo from './logo.svg';
import './App.css';

// could also be a class
function App() {
  const name = "Eliza"
  // jsx
  return (
    // you can only return a single parent element
    <div className="container">
      <h1>Hello From React</h1>
      <h2>Hello {name}</h2>
    </div>
  );
}

export default App;
