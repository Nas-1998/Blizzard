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

describe("login.html", () => {

    let dom;
    let document;

    beforeEach(async () => {
        dom = await renderDom("login.html");
        document = dom.window.document;
    });

    it('should have a form with id "loginForm"', () => {
        const form = document.getElementById('loginForm');
        expect(form).toBeTruthy();
      });

      it('should have a username input field', () => {
        const usernameInput = document.getElementById('username');
       expect(usernameInput).toBeTruthy();
      });

      it('should have a password input field', () => {
        const paswwordInput = document.getElementById('password');
       expect(passwordInput).toBeTruthy();
      });











});