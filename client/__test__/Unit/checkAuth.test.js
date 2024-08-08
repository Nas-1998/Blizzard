require("../utils/mockLocalStorage");
require("../utils/mockFetch");
const checkAuth = require("../../assets/utils/checkAuth");

// global.localStorage = {
//   getItem: jest.fn(),
// };

global.window = { location: { href: "" } };

describe("check auth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Calls fetch and localStorage once", async () => {
    const mockOptions = {
      method: "GET",
      headers: {
        authorization: "123",
      },
    };

    fetch.mockResolvedValueOnce({ status: 200 });
    localStorage.getItem.mockReturnValueOnce("123");

    await checkAuth();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith("token");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://blizzard-5jur.onrender.com/users/validate-token",
      mockOptions
    );
  });

  it("Changes window href when status !== 200", async () => {
    fetch.mockResolvedValueOnce({ status: 401 });

    await checkAuth();

    expect(window.location.href).toBe("login.html");
  });
});
