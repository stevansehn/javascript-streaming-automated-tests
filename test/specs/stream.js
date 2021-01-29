const AppService = require('../../app-service')
const request = require('supertest')
// const request = require('request')

const port = 3003;
const roomId = 'teste';
const appService = new AppService()
const baseUrl = 'http://localhost:3003'

describe('stream test', () => {

    let app, res
    it('teste 1', () => {

        appService.initialize(port)
            .then(() => {
                appService.getServer().listen(port, () => {
                    console.log("Serviço iniciado na porta " + port);
                });
            })
            .catch((error) => {
                console.error("Erro ao iniciar o serviço", error);
            })
        app = appService.getApp()

        browser.url(`${baseUrl}`)
        browser.newWindow(`${baseUrl}`);

        browser.navigateTo(`${baseUrl}/rooms`)
        const elem = $('body')
        console.log(elem.getText())
        expect(elem).toHaveText('[{"roomId":"teste","numOfPeers":2}]')

        // browser.addCommand('makeRequest', function (url) {
        //     return request(app).get(url).then((response) => response.body)
        // })
        // const body = browser.makeRequest(`${baseUrl}/rooms/${roomId}/stats`, app)
        // console.log(body) // returns response body

        browser.saveScreenshot('screenshots/screenshot.png');
        browser.closeWindow()
        browser.deleteSession()
        appService.getServer().close();

    })

})