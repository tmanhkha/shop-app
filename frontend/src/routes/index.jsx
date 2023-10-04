import { Route, Switch, Redirect } from "react-router-dom";
import AppConfig from "@/constants/AppConfig.js";
import DashboardContainer from "@/containers/DashboardContainer";
import BrandContainer from "@/containers/BrandContainer/index.jsx";
import NewBrandContainer from "@/containers/BrandContainer/NewBrandContainer/index.jsx";
import EditBrandContainer from "@/containers/BrandContainer/EditBrandContainer/index.jsx";
import ProductContainer from "@/containers/ProductContainer/index.jsx";
import NewProductContainer from "@/containers/ProductContainer/NewProductContainer/index.jsx";
import EditProductContainer from "@/containers/ProductContainer/EditProductContainer/index.jsx";
import ClientContainer from "@/containers/ClientContainer/index.jsx";
import NewClientContainer from "@/containers/ClientContainer/NewClientContainer/index.jsx";
import EditClientContainer from "@/containers/ClientContainer/EditClientContainer/index.jsx";
import CardContainer from "@/containers/CardContainer/index.jsx";
import NewCardContainer from "@/containers/CardContainer/NewCardContainer/index.jsx";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <Route
        exact
        path={AppConfig.ROUTES.DASHBOARD}
        component={DashboardContainer}
      />

      <Route exact path={AppConfig.ROUTES.BRAND} component={BrandContainer} />
      <Route
        exact
        path={AppConfig.ROUTES.NEW_BRAND}
        component={NewBrandContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.BRAND}/:brandId`}
        component={EditBrandContainer}
      />

      <Route
        exact
        path={AppConfig.ROUTES.PRODUCT}
        component={ProductContainer}
      />
      <Route
        exact
        path={AppConfig.ROUTES.NEW_PRODUCT}
        component={NewProductContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.PRODUCT}/:productId`}
        component={EditProductContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.PRODUCT}/:productId/card/new`}
        component={NewCardContainer}
      />

      <Route exact path={AppConfig.ROUTES.CLIENT} component={ClientContainer} />
      <Route
        exact
        path={AppConfig.ROUTES.NEW_CLIENT}
        component={NewClientContainer}
      />
      <Route
        exact
        path={`${AppConfig.ROUTES.CLIENT}/:clientId`}
        component={EditClientContainer}
      />

      <Route exact path={AppConfig.ROUTES.CARD} component={CardContainer} />
    </Switch>
  );
}

export default Routes;
