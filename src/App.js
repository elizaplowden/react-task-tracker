import Header from './components/Header'

// could also be a class
function App() {
  // jsx
  return (
    // you can only return a single parent element
    <div className="container">
      <Header />
    </div>
  );
}

export default App;
