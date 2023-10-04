const AppConfig = {
  PER_PAGE: 10,
  ROUTES: {
    MAIN: "/",
    LOGIN: "/sign_in",
    DASHBOARD: "/dashboard",
    BRAND: "/brand",
    NEW_BRAND: "/brand/new",
    PRODUCT: "/product",
    NEW_PRODUCT: "/product/new",
    CLIENT: "/client",
    NEW_CLIENT: "/client/new",
    CARD: "/card",
  },
  STATUS_OPTIONS: [
    { value: "active", label: "Active" },
    { value: "inactive", label: "InActive" },
  ],
};

export default AppConfig;
