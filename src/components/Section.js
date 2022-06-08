export default class Section {
    constructor ({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    setItem(element) {
        this._container.prepend(element);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
          this.renderItem(item);
        });
    }

    renderItem(item) {
        this._renderer(item);
    }
}