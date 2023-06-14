export default {
  name: "RenderCell",
  props: {
    renderFn: Function,
  },
  render(h) {
    return this.renderFn(h);
  },
};
