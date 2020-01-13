/**
 * novelIdに対応するnovelの概要、ルートを表示する
 * @author akakou
 */

/**
 * novelIdに対応するnovelの概要、ルートを表示するコンポーネント
 */
class _Novel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      summary: "",
      // content: "",
      rootContent: "",
      rootId: "",
      isLiked: false
    };

    this.handlePost = this.handlePost.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  /**
   * novelIdに対応するnovelの情報と、そのルートの情報を取得
   */
  async componentDidMount() {
    const sceneRepository = new SceneRepository();
    const novelRepository = new NovelRepository();

    const novelId = getIdFromURI(this);

    this.novel = await novelRepository.findById(novelId);
    this.root = await sceneRepository.findById(this.novel.rootId);

    this.setState({
      title: this.novel.title,
      summary: this.novel.summary,
      rootContent: this.root.content,
      rootId: this.root.id,
      isLiked: false
    });
  }

  handlePost(e) {}

  /**
   * 高評価を押すと実行される
   */
  async handleLike(e) {
    if (!currentUser()) {
      alert("ログインしてください");
      location.href = `${CONFIG.BASE_URL}#/register`;
      return;
    }

    const sceneId = this.state.rootId;
    const likeRepository = new LikeRepository();

    var isEnable = false;

    if (this.state.isLiked) {
      const likeRepository = new LikeRepository();
      this.like = await likeRepository.findActiveMineById(sceneId);
      this.like.isEnable = false;
      likeRepository.store(this.like);
    } else {
      likeRepository.create({ sceneId: sceneId });
    }

    this.setState({ isLiked: !this.state.isLiked });
  }

  /**
   * 描画
   */
  render() {
    const new_url = `${CONFIG.BASE_URL}#/new/scene/${this.state.rootId}`;

    const lines = this.state.rootContent.split("\n");

    var content = [];
    for (const index in lines) {
      const line = lines[index];
      content.push(<p key={index}>{line}</p>);
    }

    return (
      <div>
        <h1 className="title">{this.state.title}</h1>
        <br></br>
        <h2 className="subtitle">概要</h2>
        <p>{this.state.summary}</p>
        <br></br>
        <h2 className="subtitle">ID: {this.state.rootId}</h2>
        {content}
        <br />
        <div className="field is-grouped">
          <div className="control">
            <a className="button" href={new_url}>
              シーンの追加
            </a>
          </div>

          <div className="control">
            <button
              className="button"
              onClick={e => {
                this.handleLike(e);
              }}
            >
              {!this.state.isLiked ? "高評価" : "高評価を解除"}
            </button>
          </div>
        </div>
        <br />

        {/* <h3 className="subtitle">次のシーン候補</h3> */}
        {/* {this.state.rootId && <NextScenes sceneId={this.state.rootId} />} */}
        {this.state.rootId && <NextScenes sceneId={this.state.rootId} />}

        <br />
        {this.state.rootId && <SceneTree sceneId={this.state.rootId} />}
      </div>
    );
  }
}
