
# Ruleta 1–100 con panel privado

## Cómo funciona
- `/admin` es tu panel privado.
- Ahí introduces la contraseña y eliges el número ganador.
- `/` es el link público que compartes.
- El público NO recibe el número ganador antes del giro.
- Al terminar la animación, la ruleta pide al servidor que revele el resultado.

## Importante
Cambia `ADMIN_PASSWORD` antes de publicar. En Render, por ejemplo, se configura como una variable de entorno.

## Ejecutar en tu PC
1. Instala Node.js.
2. Abre una terminal en esta carpeta.
3. Ejecuta `npm install`
4. Ejecuta `npm start`
5. Abre `http://localhost:3000/admin` para el panel.
6. Comparte `http://localhost:3000/` solo cuando lo hayas publicado en internet.

## Publicarla
Sube esta carpeta a un servicio de hosting para Node.js (por ejemplo Render).
Comando de instalación: `npm install`
Comando de inicio: `npm start`
Variable de entorno:
`ADMIN_PASSWORD=TU_CONTRASEÑA_SECRETA`

No compartas `/admin` ni la contraseña.
