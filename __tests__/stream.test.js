const SocketClient = require('../__mocks__/socketIO-client-helper')
const AppService = require('../app-service')
const request = require('supertest')
const {
    remote,
    multiremote
} = require('webdriverio')
let browser

const Utils = require('../__mocks__/utils')
const config = require('../__mocks__/config')

const port = 3003;
const appService = new AppService()
const client = new SocketClient();
const baseUrl = 'http://172.29.64.1:3003'
const wioDefaultConfig = ({
    hostname: process.env.SELENIUM_GRID || '127.0.0.1',
    port: 4444,
    acceptSslCerts: true,
})

describe('Sala de conferência', () => {

    let app
    beforeAll(done => {

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
        done();
    });

    afterAll(done => {
        appService.getServer().close();
        done();
    });

    it('Teste 0', async done => {
        let res
        res = await request(app).get('/')
        expect(res.statusCode).toBe(200)
        expect(res).toBeDefined()

        // browser = await multiremote({
        //     chromeBrowser: {
        //         ...wioDefaultConfig, 
        //         logLevel: 'debug', 
        //         capabilities: Utils.getCapabilities('chrome')
        //     },
        //     firefoxBrowser: {
        //         ...wioDefaultConfig, 
        //         logLevel: 'debug', 
        //         capabilities: Utils.getCapabilities('firefox')
        //     }
        // })
        // browser = await multiremote({
        //     chromeBrowser: {
        //         capabilities: {
        //             browserName: 'chrome',
        //             acceptInsecureCerts: true,
        //             'goog:chromeOptions': {
        //                 args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
        //             }
        //         }
        //     },
        //     firefoxBrowser: {
        //         capabilities: {
        //             browserName: 'firefox',
        //             acceptInsecureCerts: true,
        //             'moz:firefoxOptions': {
        //                 prefs: {
        //                     "media.navigator.streams.fake": true,
        //                     "media.navigator.permission.disabled": true,
        //                 }
        //             }
        //         }
        //     }
        // })

        await browser.url(`${baseUrl}`)
        await browser.newWindow(`${baseUrl}`)
        // await browser.newWindow(`${baseUrl}/rooms`)

        // await browser.chromeBrowser.saveScreenshot('../teste_sala_mesh/screenshots/screenshot1a.png');
        // await browser.firefoxBrowser.saveScreenshot('../teste_sala_mesh/screenshots/screensho1b.png');

        await browser.closeWindow()
        await browser.deleteSession()
        done()
    }, 60000);

    // it('Teste 1', async done => {
    //     let res
    //     res = await request(app).get('/')
    //     expect(res.statusCode).toBe(200)
    //     expect(res).toBeDefined()

    //     const socket = await client.connectToSocketIO(port);
    //     expect(socket.connected).toEqual(true)
    //     expect(socket.id).toBeDefined()
    //     const peerId = socket.id

    //     const roomId = 'teste'
    //     await socket.emit("join", roomId)
    //     await socket.emit("stats", socket.id, {stats: "stats1"})

    //     res = await request(app).get(`/rooms/${roomId}`)
    //     expect(res.statusCode).toBe(200)
    //     expect(res.body).toBeDefined()

    //     const socket2 = await client.connectToSocketIO(port);
    //     expect(socket2.connected).toEqual(true)
    //     expect(socket2.id).toBeDefined()
    //     const peerId2 = socket2.id

    //     await socket2.emit("join", roomId)
    //     await socket2.emit("stats", socket2.id, {stats: "stats2"})

    //     // res = await request(app).get(`/rooms/${roomId}/stats`)
    //     // expect(res.statusCode).toBe(200)
    //     // expect(res.body).toBeDefined()
    //     // expect(res.body.roomConnections[0].peerId).toBe(peerId)
    //     // expect(res.body.roomConnections[0].connections[0].id).toBe(peerId2)
    //     // console.log(res.body.roomConnections[0].peerId, peerId)
    //     // console.log(res.body.roomConnections[1].connections[0].id, peerId2)

    //     res = await request(app).get(`/rooms/${roomId}/peers/${peerId2}/stats`)
    //     expect(res.statusCode).toBe(200)
    //     expect(res.body).toBeDefined()
    //     expect(res.body.connections[0].id).toBe(peerId2)
    //     expect(res.body.connections[0].stats['stats']).toBe('stats2')

    //     browser = await multiremote({
    //         chromeBrowser: {
    //             ...wioDefaultConfig, 
    //             logLevel: 'debug', 
    //             capabilities: Utils.getCapabilities('chrome')
    //         },
    //         firefoxBrowser: {
    //             ...wioDefaultConfig, 
    //             logLevel: 'debug', 
    //             capabilities: Utils.getCapabilities('firefox')
    //         }
    //     })

    //     await browser.url(`${baseUrl}`)
    //     // await browser.navigateTo(`${baseUrl}/rooms/${roomId}/peers/${peerId2}/stats`)
    //     await browser.chromeBrowser.saveScreenshot('../teste_sala_mesh/screenshots/screenshot1a.png');
    //     await browser.firefoxBrowser.saveScreenshot('../teste_sala_mesh/screenshots/screensho1b.png');

    //     await browser.deleteSession()
    //     done()
    // }, 60000);

    // it('Teste 2', async done => {

    //     browser = await multiremote({
    //         chromeBrowser: {
    //             ...wioDefaultConfig, 
    //             logLevel: 'debug', 
    //             capabilities: Utils.getCapabilities('chrome')
    //         },
    //         firefoxBrowser: {
    //             ...wioDefaultConfig, 
    //             logLevel: 'debug', 
    //             capabilities: Utils.getCapabilities('firefox')
    //         }
    //     })

    //     await browser.url(`${baseUrl}`)

    //     await browser.saveScreenshot('../teste_sala_mesh/screenshots/screenshot_home.png');
    //     await browser.navigateTo(`${baseUrl}/rooms`)
    //     await browser.chromeBrowser.saveScreenshot('../teste_sala_mesh/screenshots/screenshot2a.png');
    //     await browser.firefoxBrowser.saveScreenshot('../teste_sala_mesh/screenshots/screenshot2b.png');

    //     await browser.deleteSession()
    //     done()
    // }, 60000);

})