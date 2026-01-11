const body = document.querySelector('body');
const submenu = body.querySelectorAll('.sub-menu');

const activeSubmenu = () => {
  submenu.forEach((el) => {
    const itemInner = el.previousElementSibling;
    let submenuBtn = document.createElement('button');
    submenuBtn.classList.add('main-nav__submenu-toggle','btn');
    submenuBtn.setAttribute('type', 'button');
    itemInner.appendChild(submenuBtn);
  });
};

activeSubmenu();

const submenuToggle = body.querySelectorAll('.main-nav__submenu-toggle');

const activeButtons = {
  BTN_FORM_SEARCH: body.querySelector('.form-search__open-form'),
  BTN_MAIN_NAV: body.querySelector('.main-nav__btn-toggle'),
  BTN_CLEAR_SEARCH: body.querySelector('.form-search__btn-clear'),
  BTN_SUBMENU: submenuToggle,
};

const staticElements = {
  FORM_SEARCH: body.querySelector('.form-search'),
  FORM_SEARCH_WRAPPER: body.querySelector('.form-search__wrapper'),
  FORM_SEARCH_INPUT: body.querySelector('.form-search__input'),
  MAIN_NAV: body.querySelector('.main-nav'),
  MAIN_NAV_LIST: body.querySelector('.main-nav__list'),
};

const activeClass = {
  FORM_SEARCH_ACTIVE: 'form-search--active',
  FORM_SEARCH_WRAPPER_ACTIVE: 'form-search__wrapper--active',
  MAIN_NAV_ACTIVE: 'main-nav--active',
  MAIN_NAV_LIST_ACTIVE: 'main-nav__list--active',
  BTN_NAV_ACTIVE: 'main-nav__btn-toggle--active',
  SUBMENU_ACTIVE: 'sub-menu--active',
};

const handlerInteractiveElem = (activeButtons, staticElements, activeClass) => {
  const toggleSearchForm = () => {
    staticElements.FORM_SEARCH.classList.toggle(activeClass.FORM_SEARCH_ACTIVE);
    staticElements.FORM_SEARCH_WRAPPER.classList.toggle(activeClass.FORM_SEARCH_WRAPPER_ACTIVE);

    if (staticElements.FORM_SEARCH.classList.contains(activeClass.FORM_SEARCH_ACTIVE)) {
      activeButtons.BTN_CLEAR_SEARCH.addEventListener('click', clearInput);
    } else {
      activeButtons.BTN_CLEAR_SEARCH.removeEventListener('click', clearInput);
    }
  }

  const toggleMainNav = () => {
    staticElements.MAIN_NAV.classList.toggle(activeClass.MAIN_NAV_ACTIVE)
    staticElements.MAIN_NAV_LIST.classList.toggle(activeClass.MAIN_NAV_LIST_ACTIVE);
    activeButtons.BTN_MAIN_NAV.classList.toggle(activeClass.BTN_NAV_ACTIVE);
  }

  const clearInput = () => {
    staticElements.FORM_SEARCH_INPUT.value = '';
  }

  if (activeButtons.BTN_FORM_SEARCH) {
    activeButtons.BTN_FORM_SEARCH.addEventListener('click', toggleSearchForm);
  }

  if (activeButtons.BTN_MAIN_NAV) {
    activeButtons.BTN_MAIN_NAV.addEventListener('click', toggleMainNav);
  }

  activeButtons.BTN_SUBMENU.forEach((el) => {
    el.addEventListener('click', function(e) {
      const parentEl = this.parentElement;
      const thisSubmenu = parentEl.nextElementSibling;
      thisSubmenu.classList.toggle(activeClass.SUBMENU_ACTIVE);
      this.classList.toggle('main-nav__submenu-toggle--active');
    });
  })
};


handlerInteractiveElem(activeButtons, staticElements, activeClass);
