import Layout from './components/Layout.tsx';
import { AppContextProvider } from './contexts/AppContext.tsx';
import Toolbar from './components/Toolbar.tsx';
import LinkListScreen from './screens/LinkListScreen/LinkListScreen.tsx';

function App() {

  return (
    <AppContextProvider>
        <div className="bg-gray-900/40 min-h-screen">
            <Toolbar />
            <Layout>
                <LinkListScreen />
            </Layout>
        </div>
    </AppContextProvider>
  )
}

export default App
