import Layout from './components/Layout.tsx';
import { AppContextProvider } from './contexts/AppContext.tsx';
import LinkList from './screens/LinkList/LinkList.tsx';
import Toolbar from './components/Toolbar.tsx';

function App() {

  return (
    <AppContextProvider>
        <div className="bg-gray-900/40 min-h-screen">
            <Toolbar />
            <Layout>
                <LinkList />
            </Layout>
        </div>
    </AppContextProvider>
  )
}

export default App
