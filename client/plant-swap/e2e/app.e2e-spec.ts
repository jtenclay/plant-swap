import { PlantSwapPage } from './app.po';

describe('plant-swap App', () => {
  let page: PlantSwapPage;

  beforeEach(() => {
    page = new PlantSwapPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
