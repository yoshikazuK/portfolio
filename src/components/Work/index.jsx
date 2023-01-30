import styles from "./work.module.scss";

const Work = () => {
  return (
    <article id="work">
      <h1 className={styles.h1}>WORK</h1>
      <ul className={styles.work}>
        <li className={styles.li}>
          <a
            href="https://www.dhbk.co.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img srcSet="/img/work/daishi-hokuetsu-ginkou.png" alt="" />
            <h2>第四北越銀行</h2>
          </a>
          <h3>使用ツール</h3>
          <ul>
            <li>NOREN</li>
            <li>Smarty</li>
            <li>jQuery3</li>
            <li>HTML Sta</li>
            <li>CSS3</li>
          </ul>
          <h3>業務範囲</h3>
          <ul>
            <li>800ページ超のコーポレートサイトの全面リニューアル</li>
            <li>フロントエンド統括</li>
            <li>旧サイトのSmarty部分をNOREN環境下へ移植</li>
            <li>jQueryを使用してのUI実装</li>
            <li>問い合わせフォームのバリデーション実装</li>
          </ul>
        </li>
        <li className={styles.li}>
          <a
            href="https://mykobac.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img srcSet="/img/work/mykobac.png" alt="" />
            <h2>車検のコバック</h2>
          </a>
          <h3>使用ツール</h3>
          <ul>
            <li>OWL</li>
            <li>jQuery3</li>
            <li>HTML5</li>
            <li>CSS3</li>
            <li>ペライチ</li>
          </ul>
          <h3>業務範囲</h3>
          <ul>
            <li>OWL独自ルールの解析</li>
            <li>jQueryを使用してのUI実装</li>
            <li>問い合わせフォームのバリデーション実装</li>
            <li>軽自動車即売会のLP製作</li>
          </ul>
        </li>
        <li className={styles.li}>
          <a
            href="https://manabijourney.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img srcSet="/img/work/manabijourney.png" alt="" />
            <h2>NSGカレッジリーグ</h2>
          </a>
          <h3>使用ツール</h3>
          <ul>
            <li>CS-CART</li>
            <li>Vimeo</li>
            <li>jQuery3</li>
            <li>HTML5</li>
            <li>CSS3</li>
          </ul>
          <h3>業務範囲</h3>
          <ul>
            <li>CS-CART内でeラーニング動画の埋め込み</li>
            <li>既存デザインのレスポンシブ対応</li>
          </ul>
        </li>
        <li className={styles.li}>
          <a
            href="https://www.kashimaya.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img srcSet="/img/work/kashimaya.png" alt="" />
            <h2>加島屋</h2>
          </a>
          <h3>使用ツール</h3>
          <ul>
            <li>WordPress5</li>
            <li>Facebook</li>
            <li>Twitter</li>
          </ul>
          <h3>業務範囲</h3>
          <ul>
            <li>既存WordPressの保守・更新</li>
            <li>日替わりメニューをSNSにて発信</li>
          </ul>
        </li>
      </ul>
    </article>
  );
};

export default Work;
