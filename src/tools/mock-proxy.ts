import { ApplicationError } from '@core/errors/application.error';

export const createMockProxy = <Type>(objectName = 'mock') => {
  const cache = new Map<any, jest.Mock>();

  const handler: ProxyHandler<object> = {
    get: (_, name) => {
      if (name === 'mockClear') {
        return () => cache.clear();
      }

      if (!cache.has(name)) {
        cache.set(name, jest.fn().mockName(`${objectName}.${String(name)}`));
      }

      return cache.get(name);
    },
  };

  return new Proxy({}, handler) as jest.Mocked<Type> & {
    mockClear(): void;
  };
};

export const createProxyFromMock = <Type extends new (...args: any[]) => any>(mock: Type) => {
  if (!jest.isMockFunction(mock)) {
    throw new ApplicationError(`Expected ${mock} to be a jest mock.`);
  }

  const proxy = createMockProxy<InstanceType<Type>>();
  mock.mockImplementation(() => proxy);

  return proxy;
};
