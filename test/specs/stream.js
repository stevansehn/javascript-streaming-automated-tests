describe('stream test', () => {
    
    it('abre a página inicial', () => {
        browser.url('http://localhost:3000/')
        browser.pause(1000);
        browser.newWindow("http://localhost:3000/");
        browser.pause(2000);
    })

    // it('demonstrate the alertText command', function () {
    // let alert = browser.alertText();
    // expect(alert).toEqual('Enter room name:');
    // // ...
    // });

    // it('should save a screenshot of the browser view', function () {
    //     browser.saveScreenshot('./screenshot.png');
    // })

    let res
    res = await request(app).get(`/rooms`).send()
    console.log(res.statusCode)
    expect(res.statusCode).toBe(200)
    done()
})