import '@/styles/globals.css'
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Poppins } from 'next/font/google';
import Head from 'next/head';
config.autoAddCss = false;
const poppins = Poppins({weight: '400', subsets:['latin']})

export default function App({ Component, pageProps }) {
  return (
		<main className={poppins.className}>
			<Head>
				<title>StyleSpeak</title>
			</Head>
			<Component {...pageProps} />
		</main>
  );
}
