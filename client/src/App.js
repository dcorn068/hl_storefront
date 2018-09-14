import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavBar from './components/navbar/NavBar';
import * as M from 'materialize-css';
// Routes
import Details from './components/details/Details';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Collections from './components/collections/Collections';
import Collection from './components/collections/Collection';
import Artworks from './components/artworks/Artworks';
import Error from './components/page-not-found/Error';
import Header from './components/navbar/Header';
import ShoppingCart from './components/shopping-cart/ShoppingCart';
import Checkout from './components/checkout/Checkout';
import Admin from './components/admin/Admin';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#7986cb' },
    secondary: { main: '#ef5350' }
  }
});

class App extends Component {
  state = {
    shoppingCartContents: JSON.parse(localStorage.getItem('cart')) || [],
    currentPath: '/hl_storefront/'
  };

  // Shopping Cart

  handleAddToCart = art => {
    // check quantities
    this.setState({
      shoppingCartContents: [...this.state.shoppingCartContents, art]
    });
    localStorage.setItem(
      'cart',
      JSON.stringify([...this.state.shoppingCartContents, art])
    );
  };
  handleRemoveFromCart = art => {
    const cart = this.state.shoppingCartContents;
    const index = cart.findIndex(cartItem => cartItem.title === art.title);
    const newCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
    this.setState({
      shoppingCartContents: newCart
    });
    localStorage.setItem('cart', JSON.stringify(newCart));
  };
  handleEmptyCart = () => {
    if (window.confirm('Are you sure?')) {
      this.setState({ shoppingCartContents: [] });
      localStorage.setItem('cart', JSON.stringify([]));
    }
  };

  // Router

  handleNavigate = path => {
    this.setState({ currentPath: path });
    // if the header is showing, remove fixed-nav
    setTimeout(() => {
      if (window.location.pathname === '/hl_storefront/') {
        // on main page, scroll down past header
        Array.from(document.body.classList).includes('fixed-nav') &&
          document.body.classList.remove('fixed-nav');
        setTimeout(() => {
          document.querySelector('#navbar').scrollIntoView(true);
          !Array.from(document.body.classList).includes('fixed-nav') &&
            document.body.classList.add('fixed-nav');
        }, 0);
        const elems = document.querySelectorAll('.parallax');
        M.Parallax.init(elems, {});
      } else {
        !Array.from(document.body.classList).includes('fixed-nav') &&
          document.body.classList.add('fixed-nav');
        // document.body.classList.remove('fixed-nav');
        setTimeout(() => window.scrollTo(0, 0), 0);
      }
    }, 0);
  };

  render() {
    // console.log(JSON.parse(localStorage.getItem('cart')));
    const { currentPath, shoppingCartContents } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          {/* handleRouteChange unused */}
          <BrowserRouter onChange={this.handleRouteChange}>
            <div>
              <Route path="/hl_storefront/" component={Header} exact />

              <NavBar
                onNavigate={path => this.handleNavigate(path)}
                currentPath={currentPath}
                cartItemsCount={shoppingCartContents.length}
              />

              {/* Router */}
              <Switch>
                {/* Admin */}
                <Route
                  path="/hl_storefront/admin"
                  render={props => {
                    return (
                      <React.Fragment>
                        <Artworks />
                        <Admin {...props} />
                      </React.Fragment>
                    );
                  }}
                  exact
                />

                <Route path="/hl_storefront/" component={Artworks} exact />
                <Route path="/hl_storefront/about" component={About} exact />
                <Route
                  path="/hl_storefront/contact"
                  component={Contact}
                  exact
                />
                <Route
                  path="/hl_storefront/collections"
                  component={Collections}
                  exact
                />
                <Route
                  path="/hl_storefront/collections/:title"
                  render={props => <Collection {...props} />}
                  exact
                />
                <Route
                  path="/hl_storefront/works/:title"
                  render={props => (
                    <Details
                      {...props}
                      onAddToCart={art => this.handleAddToCart(art)}
                    />
                  )}
                  exact
                />
                <Route
                  path="/hl_storefront/cart"
                  render={props => (
                    <ShoppingCart // {...props}
                      contents={shoppingCartContents}
                      onEmptyCart={this.handleEmptyCart}
                      onRemoveItem={art => this.handleRemoveFromCart(art)}
                      onNavigate={path => this.handleNavigate(path)}
                    />
                  )}
                  exact
                />
                <Route
                  path="/hl_storefront/checkout"
                  component={Checkout}
                  exact
                />
                <Route component={Error} />
              </Switch>
            </div>
          </BrowserRouter>

          {/* Background */}
          <div className="background" />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;