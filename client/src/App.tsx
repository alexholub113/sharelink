import Layout from './components/Layout.tsx';
import { AppContextProvider } from './contexts/AppContext.tsx';

function App() {

  return (
    <AppContextProvider>
        <Layout />
    </AppContextProvider>
  )
}

export default App
