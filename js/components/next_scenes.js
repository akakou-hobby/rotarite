/**
 * 次のシーン一覧を表示する
 * @author akakou
 */

/**
 * 次のシーン一覧のコンポーネント
 */
class NextScenes extends React.Component {
  /**
   * コンストラクタ
   */
  constructor(props) {
    super(props);

    this.handlePost = this.handlePost.bind(this);
    this.state = {
      nexts: [],
      scene: {},
      novel: {}
    };
  }

  /**
   * novelとsceneとlikeを取得
   */
  async componentDidMount() {
    const novelRepository = new NovelRepository();
    const sceneRepository = new SceneRepository();
    const likeRepository = new LikeRepository();

    const sceneId = this.props.sceneId;

    // const sceneId = getIdFromURI(this);

    const scene = await sceneRepository.findById(sceneId);
    const novel = await novelRepository.findById(scene.novelId);
    const nexts = await sceneRepository.findNext(scene);

    var sorted = [];

    for (var index in nexts) {
      const next = nexts[index];
      const likesCount = await likeRepository.countLikesForScene(next);
      sorted.push({
        like: likesCount,
        scene: next
      });
    }

    sorted.sort((a, b) => {
      if (a.like == b.like) return 0;
      else if (a.like < b.like) return 1;
      else return -1;
    });

    this.setState({
      scene: scene,
      novel: novel,
      nexts: sorted
    });
  }

  /**
   * 描画
   */
  render() {
    // todo: 命名を変更
    var nextList = [];

    for (const next of this.state.nexts) {
      const scene = next.scene;
      const like = next.like;
      const url = `${CONFIG.BASE_URL}#/scene/${scene.id}`;

      nextList.push(
        <div className="box" key={scene.id}>
          <h3 className="title is-6">{scene.id}</h3>

          <p>評価は{like}です</p>
          <br />
          <a
            className="button"
            onClick={e => {
              location.href = url;
              window.location.reload();
              // this.props.history.push(url);
            }}
          >
            このシーンを読む
          </a>
        </div>
      );
    }

    return (
      <div>
        <h2 className="subtitle">次のシーン候補</h2>

        {nextList.length ? nextList : <p>次のシーンはありません</p>}
      </div>
    );
  }
}
