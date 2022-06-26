import { Navbar, Loader, Services, Transactions, Welcome} from './componets/index'; 

function App() {

  return (
    <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
        </div>
        <Services />
        <Transactions />
    </div>
  )
}

export default App;
