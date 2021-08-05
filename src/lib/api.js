import axios from 'axios'

const beerBaseUrl = 'https://api.punkapi.com/v2'

export function getAllBeers() {
  return axios.get(`${beerBaseUrl}/beers`)
}