import React from "react";
import { BrowserRouter } from "react-router-dom";
import { create } from "react-test-renderer";

import Header from "./components/CookBookContainer/Header/Header";

test(`Pass to Header login and isAuthorized and check if isAuthorized
 section will be rendered with passed login`, () => {
  const component = create(
    <BrowserRouter>
      <Header isAuthorized={true} login={"login"} />
    </BrowserRouter>
  );
  const root = component.root;
  let span = root.findByType("span");
  expect(span.children[0]).toBe("login");
});

test(`Pass to Header isAuthorized = false and expect CookBook and Login links`, () => {
  const component = create(
    <BrowserRouter>
      <Header isAuthorized={false} />
    </BrowserRouter>
  );
  const root = component.root;
  let a = root.findAllByType("a");
  expect(a[0].children[0]).toBe("CookBook");
  expect(a[1].children[0]).toBe("Login");
});
