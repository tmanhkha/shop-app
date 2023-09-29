const AppConfig = {
  PER_PAGE: 10,
  ROUTES: {
    MAIN: "/",
    LOGIN: "/sign_in",
    DASHBOARD: "/dashboard",
    BRAND: "/brand",
    NEW_BRAND: "/brand/new",
  },
  STATUS_OPTIONS: [
    { value: "active", label: "Active" },
    { value: "inactive", label: "InActive" },
  ],
};

export default AppConfig;
