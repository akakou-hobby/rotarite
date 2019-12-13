class Register extends React.Component {
  render() {
    return (
      <div>
        <h1>登録</h1>
        <p>メールアドレス</p>
        <input type="email" placeholder="taro@example.com" />
        <br />
        <p>パスワード</p>
        <input type="password" placeholder="********" />
        <br />
        <button type="button" value="submit" onClick={e => {}}>
          新規登録
        </button>
        <button
          onClick={() => {
            this.props.history.push("/login");
          }}
        >
          ログインはこちら
        </button>
      </div>
    );
  }
}
