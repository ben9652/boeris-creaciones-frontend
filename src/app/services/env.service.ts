export class EnvService {
  // DEFAULT values
  public versionCheckUrl = '';

  public enableDebug = false;
  public enableAuth = false;

  public apiUrlBase = 'http://localhost:5141/api/';
  public indexPath = '/';

  public langDefault = 'es';
  public numberFormat = 'radixComma';

  public isMobile: boolean = false;
  // public scriptMatomo = 'matomo.js';
  // public trackerMatomo = 'piwik.php';

  constructor() {
  }

  // Método para verificar el tamaño de la pantalla y establecer las propiedades isMobile y isDesktop
  checkDeviceType() {
    const ua = navigator.userAgent;
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
  }
}