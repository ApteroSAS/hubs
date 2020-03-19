const properties = {
  // To override these variables, create a .env file containing the overrides.

  // The Reticulum backend to connect to. Used for storing information about active hubs.
  // change this in default.conf also
  //RETICULUM_SERVER="https://hub.aptero.co"
  RETICULUM_SERVER: "https://alphahub.aptero.co",

  // CORS proxy.
  //CORS_PROXY_SERVER="hub.aptero.co"
  CORS_PROXY_SERVER: "alphahub.aptero.co",

  // The thumbnailing backend to connect to.
  // See here for the server code: https://github.com/MozillaReality/farspark or https://github.com/MozillaReality/nearspark
  THUMBNAIL_SERVER: "nearspark-dev.reticulum.io",

  // The root URL under which Hubs expects environment GLTF bundles to be served.
  //ASSET_BUNDLE_SERVER="hub.aptero.co"
  ASSET_BUNDLE_SERVER: "alphahub.aptero.co",

  // Comma-separated list of domains which are known to not need CORS proxying
  NON_CORS_PROXY_DOMAINS: "aptero.local,hubs.local,dev.reticulum.io,hub.aptero.co,reticulum.aptero.co,alphahub.aptero.co",

  // A comma-separated list of environment URLs to make available in the picker, besides the defaults.
  // These URLs are expected to be relative to ASSET_BUNDLE_SERVER.
  EXTRA_ENVIRONMENTS: "",

  // The root URL under which Hubs expects static assets to be served.
  BASE_ASSETS_PATH: "/",

  // This origin trial token is used to enable WebVR in Android Chrome for hubs.mozilla.com.
  // You can find more information about getting your own origin trial token here:
  // https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md
  ORIGIN_TRIAL_TOKEN: "AtOSmCIwReA1cq9L756ii6hccpiM4ObrwF0bYDmr1nNzMQi2zTjoN1puufPHt+QUwcx0F6rbLEPj/YrQanRQUA8AAABVeyJvcmlnaW4iOiJodHRwczovL2h1YnMubW96aWxsYS5jb206NDQzIiwiZmVhdHVyZSI6IldlYlZSMS4xTTYyIiwiZXhwaXJ5IjoxNTM2NjI0MDAwfQ==",
  ORIGIN_TRIAL_EXPIRES: "2018-09-11",

  //alpha
  //DEFAULT_SCENE_SID="h8xwUAc"
  //main
  DEFAULT_SCENE_SID: "AiWoCpJ"

};

export function registerProperties() {
  /*if(!process) {
    process = {};
  }*/
  if (!process.env) {
    process.env = {};
  }
  process.env = { ...properties, ...process.env };
}
