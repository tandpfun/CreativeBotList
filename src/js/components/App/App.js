import React from 'react';
import styles from './styles.css';

const App = () => (
  <div className={styles.block}>
    <div className={styles.block__header}>
      Get Discord Token
    </div>
    <div className={styles.block__body}>
      {(document.cookie &&
        <div className={styles.success}>
          <div className={styles.success__header}>
            Your token
          </div>
          <div className={styles.success__data}>
            {document.cookie}
          </div>
          <div className={styles.success__header}>
            Scope
          </div>
          <div className={styles.success__data}>
            identify
          </div>
        </div>
      )
      ||
        <a
          href="/api/discord/login"
          className={styles.login_button}
        >
          Login through Discord
        </a>
      }
    </div>
    <div className={styles.block__footer}>
      This website is not affiliated with <a href="https://discordapp.com">discord inc.</a>
    </div>
    <div className={styles.block__footer}>
      I do not save anything. <a href="https://github.com/orels1/discord-token-generator">See sources</a>
    </div>
  </div>
);

export default App;
