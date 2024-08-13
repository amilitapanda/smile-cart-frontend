import { Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import "./App.css";
import Cart from "./Components/Cart";
import PageNotFound from "./Components/commons/PageNotFound";
import Product from "./Components/Product";
import ProductList from "./Components/ProductList";

const App = () => (
  <Switch>
    <Route exact component={ProductList} path={routes.products.index} />
    <Route exact component={Product} path={routes.products.show} />
    <Redirect exact from={routes.root} to={routes.products.index} />
    <Route exact component={Cart} path={routes.cart} />
    <Route exact component={PageNotFound} path={routes.checkout} />
    <Route component={PageNotFound} path="*" />
  </Switch>
);

export default App;
