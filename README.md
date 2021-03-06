> ⚠️ Package has moved to [run-the-docs](https://www.npmjs.com/package/run-the-docs) and development has moved to [psychothan/run-the-docs](https://github.com/psychothan/run-the-docs) ⚠️

## Installation

```sh
$ yarn global add liminoid
```

or

```sh
$ npm install -g liminoid
```

## Usage

For a more comprehensive guide to using the package see the [documentation](https://liminoid.io/reference/cli/) or the command line help: `liminoid -h` .

<!-- prettier-ignore -->
|  command  | argument | description  |
| :--------:  |:--:| :--------- |
| `liminoid new [name]` | `[name]`: Name of project | Scaffold a new Liminoid application. <br/>Creates a directory of `[name]` in the current working directory.  |
|  `liminoid develop`  | `.` | Start live reloading development server. |
|   `liminoid build`   | `.` | Compile markdown, MDX, or JSX/React files into a self contained bundle. |

## Contributing/Requests

Open an [issue](https://github.com/liminoid/liminoid-cli/issues) or post a message in the [chatroom](https://discord.gg/wWUXSDj). If you would like to contribute to the project (code, documentation, tutorials, etc.) see the [contributing guide](https://liminoid.io/contributing/) for how to get started 🙌

## Citing

While not required, when using (or extending) Liminoid for academic work, citations are appreciated 🙏

```
@software{liminoid,
  author = {Jonathan Dinu},
  title = {Liminoid: Web assembly toolkit for building local-first interactive analytics applications},
  month = {March},
  year = {2020},
  version = {0.0.1},
  doi = {10.5281/zenodo.3754953},
  url = {https://github.com/liminoid},
}
```

## License

All original work licensed under either of:

- [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
- [MIT license](http://opensource.org/licenses/MIT)

at your option.

> Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
