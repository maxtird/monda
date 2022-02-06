// ==UserScript==
// @name         Monda: Monitor DonationAlerts
// @namespace    https://github.com/maxtird
// @version      1.0
// @description  Чтобы отметить донат как прочитанный, нажми на оранжевый значок слева от доната
// @author       Max Tirdatov
// @match        *://www.donationalerts.com/widget/lastdonations*
// ==/UserScript==

(function() {
  const styles = {
    '.b-last-events-widget__item--from': {
      'cursor': 'pointer'
    },

    '.monda-read': {
      'filter': 'grayscale(1)'
    },

    '.monda-read .b-last-events-widget__item--from': {
      'background': 'linear-gradient(to bottom, hsl(0deg 0% 50%) 0%, hsl(0deg 0% 30%) 100%) !important',
      'opacity': '0.5'
    },

    '.monda-read .b-last-events-widget__item--title, .monda-read .b-last-events-widget__item--text': {
      'opacity': '0.5'
    }
  };

  function insertRule(selector) {
    let rule = `${selector}{`;
    for (let property in styles[selector]) {
      rule += `${property}:${styles[selector][property]};`;
    }
    rule += '}';
    stylesheet.insertRule(rule, stylesheet.cssRules.length);
  }

  const style = document.createElement('style');
  document.head.appendChild(style);
  const stylesheet = style.sheet;
  for (let selector in styles) insertRule(selector);

  document.addEventListener('click', ({ target } = {}) => {
    const item = target?.closest('.b-last-events-widget__item');
    if (item) {
      if (target.closest('.b-last-events-widget__item--from')) {
        item.classList.toggle('monda-read');
      } else if (target.closest('.b-last-events-widget__item--repeat_alert')) {
        item.classList.remove('monda-read');
      } else if (target.closest('.skip')) {
        item.classList.add('monda-read');
      }
    }
  }, true);
})();