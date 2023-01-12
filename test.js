const test = require('brittle')
const configs = require('./index.js')

test('basic', function (t) {
  t.alike(configs.parse('name1'), ['name1'])
  t.alike(configs.parse('name1\nname2'), ['name1', 'name2'])

  const file = '# <name> <public key>\nname1 key1\nname2 key2 # comment\nname3\n\n'
  t.alike(configs.parse(file, { split: ' ', length: 2 }), [['name1', 'key1'], ['name2', 'key2']])
})

test('separator but single value', function (t) {
  const file = 'name1\nname2:key2\nname3'
  t.alike(configs.parse(file, { split: ':' }), [['name1'], ['name2', 'key2'], ['name3']])
})

test('length', function (t) {
  const file1 = 'name1\nname2:key2\nname3'
  t.alike(configs.parse(file1, { split: ':', length: 2 }), [['name2', 'key2']])

  const file2 = 'name1\nname2\nname3'
  t.alike(configs.parse(file2, { split: ':', length: 2 }), [])
})

test('length but empty value', function (t) {
  const file1 = 'name1:'
  t.alike(configs.parse(file1, { split: ':', length: 2 }), [])

  const file2 = 'name1:'
  t.alike(configs.parse(file2, { split: ':', length: 2, allowEmpty: true }), [['name1', '']])
})

test('trim', function (t) {
  const file1 = '  name1  \n  name2  \n\tname3\t'
  t.alike(configs.parse(file1), ['name1', 'name2', 'name3'])
})

test('comments', function (t) {
  const file = '#comment\nname1#<another comment\nname2'
  t.alike(configs.parse(file), ['name1', 'name2'])
})

test('no lines', function (t) {
  const file = '\n\n#comment\n\n#comment #comment\n#\n\n#'
  t.alike(configs.parse(file), [])
})

test('empty file', function (t) {
  t.alike(configs.parse(), [])
  t.alike(configs.parse(''), [])
  t.alike(configs.parse('\n'), [])
  t.alike(configs.parse('#'), [])
  t.alike(configs.parse(null), [])
})

test('parse buffers', function (t) {
  const file = Buffer.from('name1\nname2')
  t.alike(configs.parse(file), ['name1', 'name2'])
})
