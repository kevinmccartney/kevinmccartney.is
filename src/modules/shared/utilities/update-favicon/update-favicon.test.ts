import { updateFavicon } from './update-favicon';

describe('updateFavicon', () => {
  beforeEach(() => {
    // jest.resetAllMocks();
  });

  afterEach(() => {});

  test('sets the dark favicon', () => {
    const linkStub = {
      href: '',
    };

    jest
      .spyOn(window.document, 'querySelector')
      .mockImplementation(() => (linkStub as unknown) as HTMLLinkElement);

    updateFavicon('dark');

    expect(linkStub.href).toBe('/favicon_dark.ico');
  });

  test('sets the light favicon', () => {
    const linkStub = {
      href: '',
    };

    jest
      .spyOn(window.document, 'querySelector')
      .mockImplementation(() => (linkStub as unknown) as HTMLLinkElement);

    updateFavicon('light');

    expect(linkStub.href).toBe('/favicon_light.ico');
  });
});
