class SceneTree extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const sceneRepository = new SceneRepository();
    const novelRepository = new NovelRepository();

    const scene = await sceneRepository.findById(this.props.sceneId);
    const novel = await novelRepository.findById(scene.novelId);
    const scenes = await sceneRepository.findByNovel(novel);

    const _scene = scene;

    var nodes = [];
    var edges = [];

    for (const scene of scenes) {
      const url = `${CONFIG.BASE_URL}#/scene/${scene.id}`;
      const sceneId = scene.id.toString();

      if (scene.prevId) {
        edges.push({
          data: {
            source: scene.prevId.toString(),
            target: sceneId,
            relationship: ""
          }
        });
      }

      if (_scene.id == scene.id) {
        nodes.push({
          data: {
            id: sceneId,
            name: "このシーン",
            label: "current",
            href: url
          }
        });
      } else if (!scene.prevId) {
        nodes.push({
          data: {
            id: sceneId,
            name: "先頭のシーン",
            label: "root",
            href: url
          }
        });
      } else {
        nodes.push({
          data: {
            id: sceneId,
            name: sceneId,
            label: "other",
            href: url
          }
        });
      }
    }

    const elements = {
      nodes: nodes,
      edges: edges
    };

    const style = [
      {
        selector: 'node[label = "other"]',
        css: {
          "background-color": "hsl(0, 0%, 48%)",
          content: "data(name)"
        }
      },
      {
        selector: 'node[label = "current"]',
        css: {
          "background-color": "hsl(171, 100%, 41%)",
          content: "data(name)"
        }
      },
      {
        selector: 'node[label = "root"]',
        css: {
          "background-color": "hsl(0, 0%, 29%)",
          content: "data(name)"
        }
      },
      {
        selector: "edge",
        css: {
          content: "data(relationship)"
        }
      }
    ];

    const layout = {
      name: "cola",
      fit: true
    };

    this.cy = cytoscape({
      container: document.getElementById("tree"),
      elements: elements,
      style: style,
      layout: layout,
      autounselectify: true,
      boxSelectionEnabled: false
    });

    this.cy.on("tap", "node", function() {
      location.href = this.data("href");
      location.reload();
    });
  }

  handlePost(e) {}

  async handleLike(e) {}

  render() {
    return (
      <div>
        <h2 className="subtitle">シーン一覧</h2>
        <div id="tree" className="tree has-text-light" />
      </div>
    );
  }
}
