import { Form } from './components/Form';
import { Table } from './components/Table';
import { StarWarsProvider } from './context/StarWarsContext';

function App() {
  return (
    <StarWarsProvider>
      <Form />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
