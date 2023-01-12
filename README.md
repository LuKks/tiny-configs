# tiny-configs

Simple config files

```
npm i tiny-configs
```

## Usage
You have a config file like this:

`config.txt`
```
# this is a comment
key1
key2 # another comment
key3
```

```javascript
const configs = require('tiny-configs')

const file = await fs.promises.readFile('./config.txt')
const config = configs.parse(file)
console.log(config) // => ['key1', 'key2', 'key3']
```

## Split
`key-value.txt`
```
name1 value1
name2
name3 value3
```

`split` the line values by spaces:

```javascript
const config = configs.parse(file, { split: ' ' })
// => [['name1', 'value1'], ['name2'], ['name3', 'value3']]
```

`length` option filters out lines that don't reach the total amount of values:

```javascript
const config = configs.parse(file, { split: ' ', length: 2 })
// => [['name1', 'value1'], ['name3', 'value3']]
```

## API

#### `const config = configs.parse(Buffer | String, [options])`

Available options:
```js
{
  split: null,
  length: 0,
  allowEmpty: false
}
```

## License
MIT
