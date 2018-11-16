import { ConnexionModule } from './connexion.module';

describe('ConnexionModule', () => {
  let connexionModule: ConnexionModule;

  beforeEach(() => {
    connexionModule = new ConnexionModule();
  });

  it('should create an instance', () => {
    expect(connexionModule).toBeTruthy();
  });
});
