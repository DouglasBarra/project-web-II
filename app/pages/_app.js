// /pages/_app.js
import '../styles/globals.css'; // Importa o arquivo de estilos global

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
