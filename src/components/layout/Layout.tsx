import Navbar from "./navbar/Navbar";
import styles from './Layout.module.scss'
import Footer from "./footer/Footer";

type Props = {
  children: 
  | JSX.Element
  | JSX.Element[]
  | string
  | string[];
};

function Layout({ children }: Props) {
  return (
    <div className={styles.block} >
      <header>
        <Navbar />
      </header>
      <main>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout;
