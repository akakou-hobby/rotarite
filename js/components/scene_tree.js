class SceneTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sceneId: null
    };
  }

  async componentDidMount() {
    const elements = {
      nodes: [
        { data: { id: "172", name: "Tom Cruise", label: "Person" } },
        { data: { id: "183", title: "Top Gun", label: "Movie" } }
      ],
      edges: [
        { data: { source: "172", target: "183", relationship: "Acted_In" } }
      ]
    };

    const style = [
      {
        selector: 'node[label = "Person"]',
        css: { "background-color": "#6FB1FC", content: "data(name)" }
      },
      {
        selector: 'node[label = "Movie"]',
        css: { "background-color": "#F5A45D", content: "data(title)" }
      },
      {
        selector: "edge",
        css: { content: "data(relationship)", "target-arrow-shape": "triangle" }
      }
    ];

    const layout = {
      name: 'grid'
    };

    this.cy = cytoscape({
      container: document.getElementById("tree"),
      elements: elements,
      style: style,
      layout: layout
    });
  }

  handlePost(e) {}

  async handleLike(e) {}

  render() {
    return (
      <div>
        <div id="tree" className="tree" />
      </div>
    );
  }
}
