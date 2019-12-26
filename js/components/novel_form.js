class NovelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      summary: ""
    };

    this.handlePost = this.handlePost.bind(this);
  }

  async handlePost(e) {
    if (!currentUser()) {
      alert("ログインしてください");
      location.href = "/#/register";
      return;
    }

    // const sceneRepo = new SceneRepository();
    const novelRepo = new NovelRepository();

    const root = new Scene({
      content: this.state.content,
      prevId: null,
      novelId: null
    });

    const novel = novelRepo.create({
      title: this.state.title,
      summary: this.state.summary,
      content: this.state.content,
      root: root
    });

    this.props.history.push(`/novel/${novel.id}`);
  }

  render() {
    return (
      <div>
        <h1 className="title">小説の作成</h1>
        <div className="field">
          <div className="control">
            <label>タイトル</label>
            <input
              className="input"
              type="text"
              value={this.state.title}
              placeholder="桃太郎"
              onChange={e => this.setState({ title: e.target.value })}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label>概要</label>
            <textarea
              className="textarea"
              placeholder="桃から生まれた人間が鬼を倒す、ジャパニーズトラディショナルファンタジー"
              onChange={e => this.setState({ summary: e.target.value })}
            ></textarea>
          </div>
        </div>

        <div className="field">
          <div className="control">
            <label>最初</label>
            <textarea
              className="textarea"
              placeholder="むかしむかしあるところにおじいさんとおばあさんがいました。"
              onChange={e => this.setState({ content: e.target.value })}
            ></textarea>
          </div>
        </div>
        <br />

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={this.handlePost}>
              投稿
            </button>
          </div>
        </div>
      </div>
    );
  }
}
