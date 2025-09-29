/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  // Product class: minimal constructor that only logs the created instance
  class Product {
    constructor() {
      const thisProduct = this;
      console.log('new Product:', thisProduct);
    }
  }

  // Centralized selectors used across the app
  const select = {
    templateOf: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  // CSS class names used by JS
  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  // Global settings for widgets/features
  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 0,
      defaultMax: 10,
    },
  };

  // Precompile Handlebars templates (expects #template-menu-product in HTML)
  const templates = {
    menuProduct: Handlebars.compile(
      document.querySelector(select.templateOf.menuProduct).innerHTML
    ),
  };

  // Main application object
  const app = {
    // Load initial data into app.data from the global dataSource
    // IMPORTANT: this must run before building the menu
    initData: function () {
      const thisApp = this;
      thisApp.data = dataSource;
      console.log('data:', thisApp.data); // check in console that products exist
    },

    // Build the menu: iterate over products and create a Product for each
    // We do NOT store the instances (not needed at this step)
    initMenu: function () {
      const thisApp = this;
      for (let productId in thisApp.data.products) {
        new Product(); // create instance without saving a reference
      }
    },

    // App entry point: log basics, then load data and build the menu
    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);

      // Order matters: first load data, then create products
      thisApp.initData();
      thisApp.initMenu();
    },
  };

  // Start the app
  app.init();
}
