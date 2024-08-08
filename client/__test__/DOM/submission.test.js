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

describe("Submission.html", () => {

    let dom;
    let document;
    let window;

    beforeEach(async () => {
        dom = await renderDom("Submission.html");
        document = dom.window.document;
        window = dom.window;

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: 'mocked_token' }),
            })
        ); 
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should have a form with id "card-container"', () => {
        const form = document.getElementById('card-container');
        expect(form).toBeTruthy();
      });


    });

