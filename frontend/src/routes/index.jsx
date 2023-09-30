import { Route, Switch, Redirect } from "react-router-dom";
import AppConfig from "@/constants/AppConfig.js";
import DashboardContainer from "@/containers/DashboardContainer";
import BrandContainer from "@/containers/BrandContainer/index.jsx";
import NewBrandContainer from "@/containers/BrandContainer/NewBrandContainer/index.jsx";
import EditBrandContainer from "@/containers/BrandContainer/EditBrandContainer/index.jsx";

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
    </Switch>
  );
}

export default Routes;
