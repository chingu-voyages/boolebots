import { Link } from 'react-router-dom';
import "./Navigation.css";
import Container from './Layout/Container';

function Navigation() {
    return (
      <header>
        <Container>
        <nav>
            <Link to="/"><h1>BooleBots</h1></Link>
           <ul>
            <li>
              <Link to="/createBot">Create Bots</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
          
        </nav>
        </Container>
      </header>
    );
}

export default Navigation;