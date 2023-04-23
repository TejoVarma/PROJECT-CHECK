import Routers from './routes/Routers';
import AdminContext from './contexts/AdminContexts';

function App() {
  return (
    <AdminContext>
      <div>
        <Routers/>
      </div>
    </AdminContext>
  );
}

export default App;
