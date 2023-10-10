import Layout from './components/Layout.tsx';
import { AppContextProvider } from './contexts/AppContext.tsx';
import Toolbar from './components/Toolbar.tsx';
import LinkListScreen from './screens/LinkListScreen/LinkListScreen.tsx';

function App() {

  return (
    <AppContextProvider>
        <div className="bg-zinc-800 min-h-screen">
            <Toolbar />
            <Layout>
                <LinkListScreen />
            </Layout>
        </div>
    </AppContextProvider>
  )
}

export default App
