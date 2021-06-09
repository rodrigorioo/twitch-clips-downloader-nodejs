# Twitch Clips Downloader

Twitch Clips Downloader es una librería en NodeJS que permite descargar y guardar un clip de twitch con sólo ingresar su ID.

Esta librería no utiliza la API de Twitch, pero igualmente se requiere el Client ID para hacer el request.

## Instalación

La librería se instala vía composer

```sh
npm install twitch-clips-downloader
```

## Uso

Para empezar a utilizarla tenemos que iniciarla con el Client ID (ver sección "Obtener Client ID")

```sh
const TwitchClipDownloader = require('twitch-clips-downloader');

const TwDownloader = new TwitchClipDownloader('<your_client_id>');
```

Con esto ya podemos llamar a los métodos

## Obtener Client ID de Twitch

Para obtenerlo tenemos que crear una aplicación en Twitch (https://dev.twitch.tv/console) y nos saldrá el Client ID

## Métodos

| Nombre | Retorna |
| ------ | ------ |
| download(clip_id) | TwitchClipDownloader |
| save(directorio?) | void |

## Clases

#### Twitch

- String id - ID del clip
- String url - URL del clip

## Excepciones

Tanto el método download como save implementan Promises, por lo que es necesario utilizar sus eventos correspondientes

## Tests

En la carpeta tests hay un test básico para que vean como se utiliza la librería.

## License

MIT
