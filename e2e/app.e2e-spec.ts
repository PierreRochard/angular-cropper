import { CroptestPage } from './app.po';

describe('croptest App', () => {
  let page: CroptestPage;

  beforeEach(() => {
    page = new CroptestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
