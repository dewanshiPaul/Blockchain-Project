import { Navbar, Loader, Services, _Transactions, Welcome} from './componets/index'; 

function App() {

  return (
    <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Navbar />
          <Welcome />
        </div>
        <Services />
        <_Transactions />
    </div>
  )
}

export default App;
