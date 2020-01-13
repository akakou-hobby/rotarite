/**
 * 小説一覧の表示
 * @author akakou
 */

/**
 * 小説一覧を表示するコンポーネント
 */
class NovelList extends React.Component {
  /**
   * コンストラクタ
   */
  constructor(props) {
    super(props);

    this.handlePost = this.handlePost.bind(this);
    this.state = {
      novels: []
    };
  }

  /**
   * novelを取得
   */
  async componentDidMount() {
    const novelRepository = new NovelRepository();
    const novelId = getIdFromURI(this);
    const novels = await novelRepository.getList(novelId);

    this.setState({
      novels: novels
    });
  }

  /**
   * 描画
   */
  render() {
    var novels = [];

    for (const novel of this.state.novels) {
      const url = `${CONFIG.BASE_URL}#/novel/${novel.id}`;

      novels.push(
        <div className="box" key={novel.id}>
          <h2 className="title is-6">{novel.title}</h2>
          <p>{novel.summary}</p>
          <br></br>
          <a className="button" href={url}>
            この小説を読む
          </a>
        </div>
      );
    }

    return (
      <div>
        <h1 className="title">小説一覧</h1>
        {novels}
      </div>
    );
  }
}
