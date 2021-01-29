const AppService = require('../../app-service')
const request = require('supertest')
const port = 3003;
const roomId = 'teste';
const appService = new AppService()
const baseUrl = 'http://localhost:3003'

describe('stream test', () => {

    let app, res
    it('abre a página inicial', () => {

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
        // browser.navigateTo(`${baseUrl}/rooms`)
        browser.navigateTo(`${baseUrl}/rooms/${roomId}/stats`)
        
        const paragraph = $('body')
        console.log(paragraph.getText())
        [{"roomId":"teste","numOfPeers":2}]

        browser.saveScreenshot('screenshots/screenshot.png');
        browser.closeWindow()
        browser.deleteSession()

        appService.getServer().close();
        // done()
    })

})