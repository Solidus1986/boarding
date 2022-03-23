import styles from './Footer.module.scss';
import { FaMailBulk, FaFacebook, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.social}>
      <FaMailBulk />
      <FaFacebook/>
      <FaTwitter />
      </div>
      <div className={styles.more}>
        more
      </div>
    </div>
  )
}

export default Footer