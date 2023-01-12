module.exports = {
  parse (cfg, opts = {}) {
    if (typeof cfg !== 'string') cfg = (cfg || '').toString()

    return cfg
      .split('\n')
      .map(line => {
        line = line.replace(/\s+/g, ' ').trim()
        line = line.replace(/#.*$/, '').trim()
        if (!opts.split) return line

        if (!line) return null

        const splitted = line.split(opts.split)
        if (opts.length && opts.length !== splitted.length) return null

        if (!opts.allowEmpty && splitted.some(v => !v)) return null

        return splitted
      })
      .filter(m => m)
  }
}
