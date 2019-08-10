# open sudoku

A simple open source browser based sudoku game

An ad-free customize-able option to play sudoku. Check it out at http://opensourcesudoku.com

## Development

Setup yarn and node version manager first. Once completed simply run:

```bash
yarn
```

### Testing

Run

```bash
bin/test
```

This will run all jest tests in watch mode. You can also just run:

```bash
yarn test
```

### Local Server

To run locally use:

```bash
bin/start
```

Then navigate to [localhost:8080](http://localhost:8080). This runs with live reloading enabled.

## Deployment

This can be run from any web host/server once compiled and packaged but it is recommended you use Aws S3 bucket site hosting.

To deploy a compiled version to a S3 location run the following command. *This requires you have the `awscli` package installed*

```bash
bin/deploy <s3 bucket name>[<s3 bucket path>]
```

For example if your s3 bucket is named `my-bucket` and you want it to be deployed to the prefix key `sudoku/`

```bash
bin/deploy my-bucket/sudoku
```

**WARNING** this will synchronize and delete files in the target bucket and path so make sure it's an empty directory!
