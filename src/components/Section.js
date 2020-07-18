class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element, isAdded) {
    //изначально фотографии отсортированы по дате добавления по убыванию, поэтому при добавлении используется append,
    //но новые фотографии надо помещать в начало списка, поэтому для них используется prepend
    if (isAdded) {
      this._containerElement.prepend(element);
    } else {
      this._containerElement.append(element);
    }

  }
}

export default Section
