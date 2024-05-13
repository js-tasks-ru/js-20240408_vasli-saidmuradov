const SORT_TYPE = {
  ASC: 'asc',
  DESC: 'desc'
};

const defaultOptions = {
  caseFirst: 'upper'
};

export default class SortableTable {
  element;
  subElements = {};

  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement();
    this.setSubElements();
  }

  createElement() {
    const div = document.createElement('div');

    div.innerHTML = this.createSortableTableTemplate();

    return div.firstElementChild;
  }

  createProductsContainerTemplate() {
    return (
      `<div data-element="productsContainer" class="products-list__container">
        ${this.createSortableTableTemplate()}
      </div>`
    );
  }

  createSortableTableTemplate() {
    return (
      `<div class="sortable-table">
        <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.createSortableTableHeaderTemplate()}
        </div>
        <div data-element="body" class="sortable-table__body">
            ${this.createSortableTableBodyTemplate()}
        </div>
      </div>`
    );
  }

  createSortableTableHeaderTemplate() {
    return this.createSortableTableHeaderCellsTemplate();
  }

  createSortableTableHeaderCellsTemplate() {
    return this.headerConfig
      .map(header => (
        `<div class="sortable-table__cell" data-id="${header.id}" data-sortable="${header.sortable}" data-order="">
          <span>${header.title}</span>
        </div>`
      ))
      .join('');
  }

  createSortArrowTemplate() {
    return (
      `<span data-element="arrow" class="sortable-table__sort-arrow ">
        <span class="sort-arrow"></span>
      </span>`
    );
  }

  createSortableTableBodyTemplate() {
    return this.createSortableTableRowTemplate();
  }

  createSortableTableRowTemplate() {
    return this.data
      .map(data => 
        `<a href="/products/dvd/${data.id}" class="sortable-table__row">
          ${this.headerConfig
            .map(config => {
              if (config.hasOwnProperty('template')) {
                return config.template(data.images);
              } else {
                return `<div class="sortable-table__cell">${data[config.id]}</div>`;
              }
            })
            .join('')}
        </a>`
      )
      .join('');
  }

  createSortableTableLoadingTemplate() {
    return `<div data-element="loading" class="loading-line sortable-table__loading-line"></div>`;
  }

  createSortableTableEmptyPlaceholderTemplate() {
    return (
      `<div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
        <div>
          <p>No products satisfies your filter criteria</p>
          <button type="button" class="button-primary-outline">Reset all filters</button>
        </div>
      </div>`
    );
  }

  setSubElements() {
    this.element.querySelectorAll('[data-element]')
      .forEach(element => {
        this.subElements[element.dataset.element] = element;
      });
  }

  sort(field, sortType = SORT_TYPE.ASC) {
    const sortRatio = (sortType === SORT_TYPE.ASC ? 1 : -1);

    if (this.sortAsString(field)) {
      this.data.sort((a, b) => sortRatio * a[field].localeCompare(b[field], ['ru', 'en'], defaultOptions));
    } else {
      this.data.sort((a, b) => sortRatio * (a[field] - b[field]));
    }

    this.updateTable(this.data);
  }

  updateTable() {
    const tableBody = document.querySelector('[data-element="body"]');
    tableBody.innerHTML = this.createSortableTableBodyTemplate();
  }

  sortAsString(sortType) {
    return this.headerConfig.find(field => field.id == sortType).sortType === 'string';
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

