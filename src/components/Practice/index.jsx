import Link from "next/link";
import styles from "./practice.module.scss";

const Practice = () => {
  return (
    <article id="practice">
      <h1 className={styles.h1}>PRACTICE</h1>
      <ul>
        <li className={styles.li}>
          <Link href={`/blackjack/index.html`}>Black Jack</Link>
        </li>
      </ul>
    </article>
  );
};

export default Practice;
