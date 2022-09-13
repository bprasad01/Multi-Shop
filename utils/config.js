import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: "https://wpfurniture.mangoitsol.com/",
  consumerKey: "ck_7f3cc226d88edd3da54ef48d045006266ca67436",
  consumerSecret: "cs_8a6ca21e82132d14ed4b1613ffc2cf58b15da821",
  version: "wc/v3",
});

export default api;