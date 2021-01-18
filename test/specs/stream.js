describe('stream test', () => {
    
    it('abre a página inicial', () => {
        browser.url('https://localhost:3000/')
    })

    it('demonstrate the alertText command', function () {
    let alert = browser.alertText();
    expect(alert).toEqual('Enter room name:');
    // ...
    });

    it('should save a screenshot of the browser view', function () {
        browser.saveScreenshot('./screenshot.png');
    })
})