export default class ColumnChart {
  element;
  chartHeight = 50;
  skeleton = './charts-skeleton.svg';

  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = (value) => value,
  } = {}) {
    this.data = data;
    this.label = label;
    this.value = formatHeading(value);
    this.link = link;
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.innerHTML = this.createTemplate();

    return element.firstElementChild;
  }

  createLinkTemplate() {
    return this.link
      ? `<a href="${this.link}" class="column-chart__link">View all</a>`
      : '';
  }

  createChartBodyTemplate() {
    const columnProps = this.getColumnProps();

    return columnProps
      .map(({ value, percent }) => {
        return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`;
      })
      .join('');
  }

  createTemplate() {
    return `
      <div class="${this.createChartMainClasses()}" style="--chart-height: 50">
        <div class="column-chart__title">
          ${this.label}
          ${this.createLinkTemplate()}
        </div>

        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.value}
          </div>

          <div data-element="body" class="column-chart__chart">
            ${this.createChartBodyTemplate()}
          </div>
        </div>
      </div>
    `;
  }

  createChartMainClasses() {
    return this.hasData()
      ? 'column-chart'
      : 'column-chart column-chart_loading';
  }

  update(newData) {
    const chart = document.querySelector('[data-element="body"]');
    this.data = newData;

    chart.innerHTML = this.createChartBodyTemplate();
  }
  
  remove() {
    this.element.remove();
  }
  
  destroy () {
    this.remove();
  }

  hasData() {
    return this.data.length;
  }

  getColumnProps() {
    const maxValue = Math.max(...this.data);
    const scale = 50 / maxValue;
  
    return this.data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }
}
