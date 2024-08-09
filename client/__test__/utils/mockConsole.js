const mockClError = jest.fn();
const mockClLog = jest.fn();

global.console = {
  error: mockClError,
  log: mockClLog,
};
