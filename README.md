# chatBotWP
ChatBot con WhatsApp

# Estructura del proyecto

La estructura del proyecto esta de la siguiente manera:

```plaintext
src/
├── app/
│   ├── controllers/             # Controladores HTTP
│   │   └── WebhookController.js # Clase del controlador del webhook
│   ├── services/                # Servicios de lógica de negocio
│       └── MessagingService.js  # Clase de servicio de mensajería
├── domain/                      # Dominio (entidades y lógica de negocio específica)
├── infrastructure/
│   ├── axiosClient.js           # Cliente de Axios para llamadas HTTP
├── config/
│   └── environment.js           # Carga de variables de entorno
├── routes/
│   └── webhookRoutes.js         # Definición de rutas del webhook
└── server.js                    # Punto de entrada de la aplicación
```

## Explicación de la Estructura

1. **Configuración** (*config/environment.js*): Centraliza las variables de entorno para fácil acceso desde otros módulos.
2. **Infraestructura** (*infrastructure/axiosClient.js*): Define el cliente HTTP para realizar solicitudes externas.
3. **Servicios** (*app/services/messagingService.js*): Gestiona la lógica de negocio relacionada con el envío y marcado de mensajes.
4. **Controladores** (*app/controllers/webhookController.js*): Procesa las solicitudes HTTP entrantes, haciendo uso de los servicios para la lógica de negocio.
5. **Rutas** (*routes/webhookRoutes.js*): Define las rutas y los controladores asociados para cada endpoint.
5. **Servidor** (*server.js*): Punto de entrada principal donde se configuran y cargan las rutas en el servidor Express.