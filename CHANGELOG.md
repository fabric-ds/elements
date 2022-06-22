# [1.0.0-next.4](https://github.com/fabric-ds/elements/compare/v1.0.0-next.3...v1.0.0-next.4) (2022-06-22)


### Bug Fixes

* alert animation ([76b75c0](https://github.com/fabric-ds/elements/commit/76b75c0a4e39d88207f5c5c2df34efe7fbfff0ea))
* fix accessibility issues ([c26d20c](https://github.com/fabric-ds/elements/commit/c26d20cd69abf90fda52dfe7270e7f4203aa95bd))
* **tests/utils:** add style tag with fabric href to page ([622c80f](https://github.com/fabric-ds/elements/commit/622c80f5e7f4d124fdf60163a1ba329e31e63fdd))


### Code Refactoring

* use variant attribute instead of negative/positive/warning/info ([fdd6c24](https://github.com/fabric-ds/elements/commit/fdd6c2499316d54b0241dca87b64cbb139f3b8a9))


### Features

* **packages:** add inline alert component ([2223d02](https://github.com/fabric-ds/elements/commit/2223d0298226f3bbf2dc94f525819113b3728843))


### BREAKING CHANGES

* "negative", "positive", "warning" and "info" boolean attributes were replaced with
"variant" string attribute

# [1.0.0-next.3](https://github.com/fabric-ds/elements/compare/v1.0.0-next.2...v1.0.0-next.3) (2022-05-12)


### Features

* **packages:** Box component ([#68](https://github.com/fabric-ds/elements/issues/68)) ([b9241a8](https://github.com/fabric-ds/elements/commit/b9241a85af8aad804c3d45b9da4ae0a6ed1577a1))

# [1.0.0-next.1](https://github.com/fabric-ds/elements/compare/v0.1.3-next.1...v1.0.0-next.1) (2022-05-11)


### Code Refactoring

* Rewrite card in Lit Element ([761fb5f](https://github.com/fabric-ds/elements/commit/761fb5fbc96f9bac8079536f591a70e525bf2e03))


### BREAKING CHANGES

* Rewrites the component so that it matches the React and Vue implementation and uses the Lit library to do so.

## [0.1.3-next.1](https://github.com/fabric-ds/elements/compare/v0.1.2...v0.1.3-next.1) (2022-04-28)

### Bug Fixes

- decouple elements and toast api to fix SSR usage
  ([57ee9d6](https://github.com/fabric-ds/elements/commit/57ee9d67122eb8ad693d901f10fa5a951f32b5c1))

## [0.1.2](https://github.com/fabric-ds/elements/compare/v0.1.1...v0.1.2) (2022-04-25)

### Bug Fixes

- decouple elements and toast api to fix SSR usage
  ([f7e57cb](https://github.com/fabric-ds/elements/commit/f7e57cb4139a2942c6d971ba650b30a2c825d27d))

## [0.1.2-next.1](https://github.com/fabric-ds/elements/compare/v0.1.1...v0.1.2-next.1) (2022-04-25)

### Bug Fixes

- decouple elements and toast api to fix SSR usage
  ([57ee9d6](https://github.com/fabric-ds/elements/commit/57ee9d67122eb8ad693d901f10fa5a951f32b5c1))
