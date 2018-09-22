import * as React from 'react';
import './App.css';
import InitiativeTracker from './components/InitiativeTracker';

// declare icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClone, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faClone, faTrash);

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">a very basic 5e initiative tracker</h1>
        </header>
        <section>
          <InitiativeTracker/>
        </section>
      </div>
    );
  }
}

export default App;
