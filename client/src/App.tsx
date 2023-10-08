import './App.css'
import LinkList from './screens/LinkList/LinkList.tsx';
import {StoreProvider} from './contexts/StoreContext.tsx';

function App() {

  return (
    <StoreProvider>
        <LinkList />
    </StoreProvider>
  )
}

export default App
