import Router from './router';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Router />
    </>
  );
}

export default App;
