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

describe('characters.html', () => {
  let dom;
  let document;
  let window;

  beforeEach(async () => {
    try {
      dom = await renderDom('characters.html');
      document = dom.window.document;
      window = dom.window;

      // Mock fetch
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
            {
              character_id: '1',
              character_name: 'Hero',
              image_url: 'http://example.com/hero.jpg'
            }
          ]),
        })
      );

      jest.clearAllMocks();
    } catch (error) {
      console.error('Error setting up the DOM:', error);
      throw error;
    }
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should have a container for cards with id "cardsContainer"', () => {
    const container = document.getElementById('cardsContainer');
    expect(container).toBeTruthy();
  });


});
