import * as React from 'react';
import './App.css';
import InitiativeTracker from './components/InitiativeTracker';
import { Container, Row, Col } from 'reactstrap';


// declare icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClone, faTrash, faChevronCircleLeft, faChevronCircleRight, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faClone, faTrash, faChevronCircleLeft, faChevronCircleRight, faPlusCircle);

class App extends React.Component {
  public render() {
    return (
        <div className="App">
          <header className="App-header bg-dark">
            <h1 className="App-title">a very basic 5e initiative tracker</h1>
          </header>
          <main>
            <section className="app-section">
              <InitiativeTracker/>
            </section>
          </main>
          <footer className="text-light bg-dark">
            <Container>
              <Row>
                <Col>
                  Made with love but without dice | © 2018 Andreas Tinoco Lobo | MIT | <a href="https://github.com/aloco/5e-encounter-tracker" className="text-light">See project on Github</a>
                </Col>
              </Row>
            </Container>
          </footer>
        </div>
    );
  }
}

export default App;
