import Link from "next/link";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header>
      <nav className={styles.globalNav}>
        <Link href={`/`}>HOME</Link>
        <Link href={`#work`}>WORK</Link>
        <Link href={`#practice`}>PRACTICE</Link>
      </nav>
    </header>
  );
};

export default Header;
