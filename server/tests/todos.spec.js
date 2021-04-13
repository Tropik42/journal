jest.mock("express", () => ({
    Router() {
      return {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn()
      };
    },
  }));
  
  const router = require('../routes/todos');
  
  test ('should call the "get" method 2 times', () => {
      expect(router.get).toBeCalledTimes(2);
  });
  test ('should call the "post" method', () => {
      expect(router.post).toBeCalledTimes(1);
  });
  test ('should call the "put" method 4 times', () => {
      expect(router.put).toBeCalledTimes(4);
  });
  test ('should call the "delete" method', () => {
      expect(router.delete).toBeCalledTimes(1);
  });

  