import "./activity.scss";

import { MDCTabBarScroller } from "@material/tabs";

function init() {
  const tabBarScroller = document.querySelector("#my-mdc-tab-bar-scroller");
  MDCTabBarScroller.attachTo(tabBarScroller);
}

window.addEventListener("load", init);
