class PostNovel extends React.Component {
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
    // const sceneRepo = new SceneRepository();
    const novelRepo = new NovelRepository();

    const root = new Scene({
      content: this.state.content,
      prevId: null,
      novelId: null
    });

    novelRepo.create({
      title: this.state.title,
      summary: this.state.summary,
      content: this.state.content,
      root: root
    });

    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <h1>ノベルの作成</h1>
        <p>タイトル</p>
        <input
          type="text"
          value={this.state.title}
          placeholder="桃太郎"
          onChange={e => this.setState({ title: e.target.value })}
        />

        <p>概要</p>
        <textarea
          placeholder="桃から生まれた人間が鬼を倒す、ジャパニーズトラディショナルファンタジー"
          onChange={e => this.setState({ summary: e.target.value })}
        ></textarea>

        <p>シーン</p>
        <textarea
          placeholder="むかしむかしあるところにおじいさんとおばあさんがいました。"
          onChange={e => this.setState({ content: e.target.value })}
        ></textarea>
        <br />
        <button type="button" value="submit" onClick={this.handlePost}>
          投稿
        </button>
      </div>
    );
  }
}
