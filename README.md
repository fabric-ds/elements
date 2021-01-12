# Fabric Elements

[![Build Status](https://travis.schibsted.io/finn/fabric-elements.svg?token=c2i7RTPCstzjYPkxuoGG&branch=master)](https://travis.schibsted.io/finn/fabric-elements)

## Documentation

The documentation site is built using [Eleventy](https://www.11ty.dev/). It uses
[`web-component-analyzer`](https://github.com/runem/web-component-analyzer) to
statically analyze the web components to generate documentation. If you've
changed a component, run the following to update the component documentation:

```sh
yarn docs:analyze
```

To run the documentation locally:

```sh
yarn docs:dev
```

To build the documentation:

```sh
yarn docs:build
```
