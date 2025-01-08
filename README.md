# Live Trade Charts with Real-time WebSocket Data

Este proyecto muestra un gráfico de trading en tiempo real, utilizando **WebSockets**
para recibir y visualizar datos de precios de criptomonedas en vivo. La aplicación
está construida con un stack de tecnologías modernas y optimizadas para el rendimiento:

## Características principales

- **Visualización de datos en tiempo real:** Muestra gráficos de líneas para múltiples
  criptomonedas (BTC_USDT, ETH_USDT, XRP_USDT, ADA_USDT, DOGE_USDT), actualizados
  al instante a medida que se reciben nuevos datos a través del WebSocket.
- **Adaptador WebSocket funcional:** Implementa un adaptador funcional para la conexión
  y manejo de mensajes WebSocket, incluyendo la adaptación de datos, el manejo de
  errores y la reconexión automática.
- **Hook `useWebSocket` personalizado:** Facilita la integración del adaptador WebSocket
  con los componentes de React, proporcionando acceso a los datos y al estado de
  la conexión.
- **Gráficos atractivos y eficientes:** Utiliza la librería `react-charts` para renderizar
  gráficos de líneas interactivos y visualmente agradables.
- **Colores personalizados por símbolo:** Asigna un color único a cada símbolo de
  criptomoneda para una mejor diferenciación visual.
- **Eliminación de datos duplicados:** Filtra los datos entrantes para evitar la
  duplicación de puntos en el gráfico, basándose en una combinación única de
  símbolo y timestamp.
- **Mensajes de error descriptivos:** Muestra mensajes de error claros en la
  interfaz de usuario en caso de problemas con la conexión WebSocket o el
  procesamiento de datos.

## Tecnologías utilizadas

- **[React](https://reactjs.org/):** Una biblioteca de JavaScript para construir
  interfaces de usuario.
- **[TypeScript](https://www.typescriptlang.org/):** Un superset tipado de
  JavaScript que mejora la mantenibilidad y escalabilidad del código.
- **[Bun](https://bun.sh/):** Un runtime de JavaScript rápido y todo en uno,
  usado como gestor de paquetes, ejecutor de pruebas y bundler.
- **[Rspack](https://www.rspack.dev/):** Un bundler de alto rendimiento
  basado en Rust, para un desarrollo y construcción rápidos.
- **[Biome](https://biomejs.dev/):** Un formateador y linter de código de alto rendimiento,
  que ayuda a mantener un código limpio y consistente.
- **[react-charts](https://www.npmjs.com/package/react-charts):** Una librería
  simple y flexible para crear gráficos en React.

## ¿Por qué Bun, Rspack y Biome?

Este proyecto apuesta por un stack de herramientas moderno, orientado a
la velocidad y la eficiencia. **Bun** ofrece un entorno de desarrollo rápido
y unificado, **Rspack** acelera drásticamente el proceso de bundling, y
**Biome** garantiza la calidad yconsistencia del código con un rendimiento excepcional.
Juntos, permiten un flujo de trabajo de desarrollo ágil y una aplicación final optimizada.

## Estructura del proyecto

- `src/`: Contiene el código fuente de la aplicación.
  - `components/`: Componentes de React reutilizables.
    - `TradeChart.tsx`: Componente que renderiza el gráfico de trading.
  - `hooks/`: Hooks personalizados.
    - `useWebSocket.ts`: Hook para la gestión de la conexión WebSocket.
  - `models/`: Modelos de datos.
    - `SocketData.ts`: Interfaz para los datos recibidos por el WebSocket.
    - `Trade.ts`: Interfaz para los datos de trading individuales.
  - `webSocketAdapter.ts`: Adaptador funcional para la conexión y manejo de mensajes
    WebSocket.
  - `App.tsx`: Componente principal de la aplicación.
  - `index.tsx`: Punto de entrada de la aplicación.
- `public/`: Contiene archivos estáticos.

## Para empezar

1. Clona el repositorio: `git clone <URL del repositorio>`
2. Instala las dependencias: `bun install`
3. Inicia el servidor WebSocket: Asegúrate de tener un servidor WebSocket
   corriendo en `ws://localhost:8080/ws/trades` que envíe datos en el formato
   esperado. El código del servidor se encuentra en la carpeta `proxy-server`.
   Para correr el servidor de Go, navega a la carpeta `proxy-server` y ejecuta
   `go run .`.
4. Inicia la aplicación: `bun run dev` (o el comando que hayas configurado para iniciar
   el servidor de desarrollo)

## Contribuciones

Las contribuciones son bienvenidas. Siéntete libre de abrir un issue o un pull
request.

## Licencia

MIT
