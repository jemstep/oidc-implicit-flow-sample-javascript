document.getElementById('login').addEventListener("click", redirectToLogin, false);

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

//
// OIDC Client Configuration
//
const OIDC_PROVIDER = 'https://loginqa.jemstep.com';
const CLIENT_ID = '@!B4A9.DAAA.54EB.4F62!0001!C15A.F1DA!0008!3685.367A.A48D.65F2';

var settings = {
    authority: OIDC_PROVIDER,
    client_id: CLIENT_ID,
    redirect_uri: window.location.protocol + "//" + window.location.host + window.location.pathname,
    response_type: 'id_token token',
    scope: 'openid profile email https://jemstep.com/auth/dynamic.organizations',
    acr_values: 'basic',
    filterProtocolClaims: true,
    loadUserInfo: true
};
var mgr = new Oidc.UserManager(settings);

//
// Redirect to OneLogin to authenticate the user
//
function redirectToLogin(e) {
  e.preventDefault();

  mgr.signinRedirect({state:'some data'}).then(function() {
      console.log("signinRedirect done");
  }).catch(function(err) {
      console.log(err);
  });
}

//
// Handle the authentication response returned
// by OneLogin after the user has attempted to authenticate
//
function processLoginResponse() {
  mgr.signinRedirectCallback().then(function(user) {
      console.log("signed in", user);

      document.getElementById("loginResult").innerHTML = '<h3>Success</h3><pre><code>' + JSON.stringify(user, null, 2) + '</code></pre>'

  }).catch(function(err) {
      console.log(err);
  });
}

//
// Look out for a authentication response
// then log it and handle it
//
if (window.location.href.indexOf("#") >= 0) {
  processLoginResponse();
}
