import {StoreProvider} from './contexts/StoreContext.tsx';
import SampleRadix from './components/SampleRadix.tsx';

function App() {

  return (
    <StoreProvider>
        <SampleRadix />
    </StoreProvider>
  )
}

export default App
