class Login extends React.Component {
  render() {
    return (
      <div>
        <h1>ログイン</h1>
        <p>メールアドレス</p>
        <input type="email" placeholder="taro@example.com" />
        <br />
        <p>パスワード</p>
        <input type="password" placeholder="********" />
        <br />
        <button type="button" value="submit" onClick={e => {}}>
          ログイン
        </button>
      </div>
    );
  }
}
