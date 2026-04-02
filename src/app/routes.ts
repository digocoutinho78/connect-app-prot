import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { Splash } from "./pages/Splash";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ActivationExpired } from "./pages/ActivationExpired";
import { ActivationSuccess } from "./pages/ActivationSuccess";
import { BrandSelection } from "./pages/BrandSelection";
import { Welcome } from "./pages/Welcome";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Stores } from "./pages/Stores";
import { StoreMapSearch } from "./pages/StoreMapSearch";
import { Products } from "./pages/Products";
import { StoreProducts } from "./pages/StoreProducts";
import { ProductDetail } from "./pages/ProductDetail";
import { ProductDetailOutOfStock } from "./pages/ProductDetailOutOfStock";
import { Sales } from "./pages/Sales";
import { ProductSales } from "./pages/ProductSales";
import { ReportRequest } from "./pages/ReportRequest";
import { WhereToFind } from "./pages/WhereToFind";
import { Suggestion } from "./pages/Suggestion";
import { StoreMap } from "./pages/StoreMap";
import { Contact } from "./pages/Contact";
import { Profile } from "./pages/Profile";
import { ChangePassword } from "./pages/ChangePassword";
import { Favorites } from "./pages/Favorites";
import { SuggestionsStatus } from "./pages/SuggestionsStatus";
import { StoresByProduct } from "./pages/StoresByProduct";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    ErrorBoundary: NotFound,
    children: [
      {
        path: "/",
        Component: Splash,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/forgot-password",
        Component: ForgotPassword,
      },
      {
        path: "/activation-expired",
        Component: ActivationExpired,
      },
      {
        path: "/activation-success",
        Component: ActivationSuccess,
      },
      {
        path: "/brand-selection",
        Component: BrandSelection,
      },
      // Temporariamente desabilitado - pode ser reativado no futuro
      // {
      //   path: "/welcome",
      //   Component: Welcome,
      // },
      {
        path: "/home",
        Component: Home,
      },
      {
        path: "/news",
        Component: News,
      },
      {
        path: "/stores",
        Component: Stores,
      },
      {
        path: "/stores-by-product",
        Component: StoresByProduct,
      },
      {
        path: "/store-map-search",
        Component: StoreMapSearch,
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: "/stores/:storeId/products",
        Component: StoreProducts,
      },
      {
        path: "/products/:productId",
        Component: ProductDetail,
      },
      {
        path: "/product/:productId",
        Component: ProductDetail,
      },
      {
        path: "/products-out-of-stock/:productId",
        Component: ProductDetailOutOfStock,
      },
      {
        path: "/sales/:productId",
        Component: Sales,
      },
      {
        path: "/product-sales/:productId/:storeId",
        Component: ProductSales,
      },
      {
        path: "/report-request/:storeId",
        Component: ReportRequest,
      },
      {
        path: "/where-to-find/:productId",
        Component: WhereToFind,
      },
      {
        path: "/suggestion/:productId",
        Component: Suggestion,
      },
      {
        path: "/favorites",
        Component: Favorites,
      },
      {
        path: "/map",
        Component: StoreMap,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/change-password",
        Component: ChangePassword,
      },
      {
        path: "/suggestions-status",
        Component: SuggestionsStatus,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);