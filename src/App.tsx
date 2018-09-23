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
              <Row>
                <Col>
                  Favicon made by <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp" className="text-light">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon" className="text-light">www.flaticon.com</a> | licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" className="text-light">CC 3.0 BY</a>
                </Col>
              </Row>

            </Container>
          </footer>
        </div>
    );
  }
}

export default App;
