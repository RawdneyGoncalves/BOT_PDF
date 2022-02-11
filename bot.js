const axios = require('axios').default
const cheerio = require('cheerio')
const fs = require('fs')
const download = require('download-pdf')
const url = 'https://www.spdo.ms.gov.br/diariodoe'

function getDOE() {
  axios(url)
    .then(response => {
      const html = response.data
      const $ = cheerio.load(html)
      let link = []
      const endereco = 'https://www.spdo.ms.gov.br/diariodoe/Index/Download/'
      $('#tbDiarios > tbody > tr', html).each(function () {
        const linkDOE = $(this).find('a').attr('id')
        link.push(
          endereco + linkDOE
        )
      })
      link.forEach((url, linkDoe) => {
        let options = {
          directory: __dirname,
          filename: linkDoe + '.pdf'
        }
        download(url, options, function (err) {
          if (err) throw err
          console.log('baixado')
        })

       })

    })
}
getDOE()
