const MILLISECONDS_IN_SECOND = 1000;

export default class NotificationMessage {
  static instance;
  element;
  timer;

  constructor(
    message = '',
    options = {
      duration: MILLISECONDS_IN_SECOND,
      type: 'success'
    }
  ) {
    this.message = message;
    this.duration = options.duration;
    this.type = options.type;
    this.element = this.createElement();
  }

  show(targetElement = document.body) {
    if (NotificationMessage.instance) {
      NotificationMessage.instance.destroy();
    }

    NotificationMessage.instance = this;

    this.timer = setTimeout(() => this.destroy(), this.duration);

    targetElement.appendChild(this.element);
  }

  createElement() {
    const notification = document.createElement('div');
    notification.innerHTML = this.createNotificationTemplate();
    return notification.firstElementChild;
  }

  createNotificationTemplate() {
    return `
      <div class="notification ${this.type}" style="--value:${this.duration / MILLISECONDS_IN_SECOND}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>
    `;
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    clearTimeout(this.timer);
  }
}
