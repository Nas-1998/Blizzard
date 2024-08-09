const { JSDOM } = require('jsdom');
const path = require('path');




const renderDom = async (filename) => {
    const filePath = path.join(__dirname, '../..', filename);
     try {
    const dom = await JSDOM.fromFile(filePath, {
        runScripts: 'dangerously',
        resources: 'usable'
    });

    return new Promise((resolve) => {
        dom.window.document.addEventListener("DOMContentLoaded", () => {
            resolve(dom);
        });
    });
} catch (error) {
    console.log("Errorr loading HTML file:", error);
    throw error;
     }
};

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'mocked_token' }),
    })
); 

describe("Submission.html", () => {

    let dom;
    let document;
    let window;

    beforeEach(async () => {
        dom = await renderDom("Submission.html");
        document = dom.window.document;
        window = dom.window;

    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should have a form with id "card-container"', () => {
        const form = document.getElementById('card-container');
        expect(form).toBeTruthy();
      });

    // it('should transfer the user to the index.html page', () => {
    //     const homepage = document.querySelector('a[href="index.html"]')
    //     expect(homepage).toBeTruthy()

    //     // const mockLocation = jest.spyOn(window, 'location', 'get')
    //     // mockLocation.mockReturnValue({
    //     //     href: '',
    //     //     assign: jest.fn()

    
    //     const originalLocation = window.location;
    //     delete window.location; // Remove the original location
    //     window.location = {
    //         assign: jest.fn()  
    //     }      
    //     })
        
    //     const clickEvent = new window.Event('click', {
    //         bubbles: true,
    //         cancelable: true,
    //         view: window
    //     })
    //     homepage.dispatchEvent(clickEvent);

    //     expect(window.location.assign).toHaveBeenCalledWith('index.html')
    //     window.location = originalLocation;
    })
    

