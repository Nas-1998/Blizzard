const { JSDOM } = require('jsdom');
const path = require('path');

// Function to render the DOM from a file
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
        console.error("Error loading HTML file:", error);
        throw error;
    }
};

describe("signup.html", () => {

    let dom;
    let document;
    let window;

    beforeEach(async () => {
        dom = await renderDom("signup.html");
        document = dom.window.document;
        window = dom.window;

        // Mock fetch globally
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

    it('should have a form with id "signupForm"', () => {
        const form = document.getElementById('signupForm');
        expect(form).toBeTruthy();
    });

    it('should have a username input field', () => {
        const usernameInput = document.getElementById('username');
        expect(usernameInput).toBeTruthy();
    });

    it('should have a password input field', () => {
        const passwordInput = document.getElementById('password');
        expect(passwordInput).toBeTruthy();
    });

    it('should update the username field value', () => {
        const usernameInput = document.getElementById('username');
        usernameInput.value = 'testuser';
        expect(usernameInput.value).toBe('testuser');
    });

    it('should update the password field value', () => {
        const passwordInput = document.getElementById('password');
        passwordInput.value = 'testpassword';
        expect(passwordInput.value).toBe('testpassword');
    });

    it('should trigger form submission when the submit button is clicked', () => {
        const form = document.getElementById('signupForm');
        const submitButton = document.querySelector('button[type="submit"]');

        // Spy on the form's submit method
        const submitSpy = jest.fn();
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission
            submitSpy(); // Call the spy function
        });

        // Set input values
        document.getElementById('username').value = 'testuser';
        document.getElementById('password').value = 'testpassword';

        // Create and dispatch a click event on the submit button
        const clickEvent = new window.MouseEvent('click', { bubbles: true });
        submitButton.dispatchEvent(clickEvent);

        // Verify that the submitSpy was called
        expect(submitSpy).toHaveBeenCalled();
    });

    it('should handle the form submission event correctly', async () => {
        const form = document.getElementById('signupForm');
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');

        // Set input values
        usernameInput.value = 'testuser';
        passwordInput.value = 'testpassword';

        // Add event listener to spy on form submission
        const submitHandler = jest.fn((e) => {
            e.preventDefault(); // Prevent the default form submission
            // Ensure fetch is called
            expect(global.fetch).toHaveBeenCalledWith(
                "https://blizzard-5jur.onrender.com/users/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify({
                        username: 'testuser',
                        password: 'testpassword',
                    }),
                }
            );
        });
        form.addEventListener('submit', submitHandler);

        // Trigger form submission
        form.dispatchEvent(new window.Event('submit', { bubbles: true }));

        // Wait for fetch to be called
        await new Promise(process.nextTick);

        // Ensure the submitHandler was called
        expect(submitHandler).toHaveBeenCalled();
    });

});
