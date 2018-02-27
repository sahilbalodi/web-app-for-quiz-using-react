OFF = 0;
module.exports = {
  "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
      "browser": true,
      "node": true
    },
    "rules": {
      "react/jsx-filename-extension": OFF,
     "react/prefer-stateless-function": OFF,
     "react/forbid-prop-types": OFF,
    }
};