import prettier from "prettier";

const formatResult = prettier.format("foo();", {
  semi: false,
  parser: "babel",
});

console.log('formatResult:',formatResult); // output: "formatResult: foo()"

const checkResult = prettier.check("foo();", { semi: false, parser: "babel" });

console.log("checkResult:", checkResult); // output: "checkResult: false"
