import ky from 'ky'

class Http {
  constructor () {
    this.ky = ky
  }

  replace (newKy) {
    this.ky = newKy
  }
}

export default new Http()
