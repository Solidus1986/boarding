import manag from '../assets/images/management.png';

export default function Home() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={manag} className="App-logo logo-1" alt="logo" />
        <img src={manag} className="App-logo logo-2" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

