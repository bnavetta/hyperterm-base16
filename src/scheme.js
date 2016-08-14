import fs from 'fs'
import yaml from 'js-yaml'

export default class Scheme {
  constructor (definition) {
    this.definition = definition
  }

  static loadSync (path) {
    const definition = yaml.safeLoad(fs.readFileSync(path, 'utf8'), { filename: path })

    return new Scheme(definition)
  }

  color (key) {
    return '#' + this.definition[key]
  }

  toConfig (config) {
    return {
      cursorColor: this.color('base05'),
      borderColor: this.color('base03'),
      foregroundColor: this.color('base05'),
      backgroundColor: this.color('base00'),
      colors: {
        black: this.color('base00'),
        red: this.color('base08'),
        green: this.color('base0B'),
        yellow: this.color('base0A'),
        blue: this.color('base0D'),
        magenta: this.color('base0E'),
        cyan: this.color('base0C'),
        white: this.color('base05'),
        lightBlack: this.color('base03'),
        lightRed: this.color('base08'),
        lightGreen: this.color('base0B'),
        lightYellow: this.color('base0A'),
        lightBlue: this.color('base0D'),
        lightMagenta: this.color('base0E'),
        lightCyan: this.color('base06'),
        lightWhite: this.color('base07')
      },
      css: `
      ${config.css || ''}

      .header_header {
          background-color: ${this.color('base01')} !important;
      }

      .tabs_title {
          color: ${this.color('base04')};
      }

      .tab_active {
          background-color: ${this.color('base03')};
      }
      `
    }
  }
}

