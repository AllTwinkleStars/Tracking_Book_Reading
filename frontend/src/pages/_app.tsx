import { AppProps } from 'next/app';
import '../layout/globals.css';
import { ProvideBook } from '@/context/BookProvider';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }: AppProps) {
  //... Add global configurations or providers here

  return (
    <ProvideBook>
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <Component {...pageProps} />
    </ProvideBook>
  );
}

export default App;