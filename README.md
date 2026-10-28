# Heroínas Olvidadas

Historieta educativa interactiva sobre diez pioneras de la ciencia, las letras y el arte. Proyecto escolar desarrollado con apoyo de IA a partir de los archivos e ilustraciones proporcionados.

## Abrir

Descomprime todo y abre `index.html`. Conserva `assets/`, `data.js`, `script.js` y `style.css` junto a él. No requiere instalar dependencias. También se puede servir como sitio estático.

## Funciones

- Diez ilustraciones locales, ampliables mediante un diálogo que se cierra con el botón o Escape.
- Navegación que permanece disponible en las cuatro secciones.
- Diseño de escritorio con índice lateral; diseño móvil hasta 760 px con índice horizontal y una columna.
- Quiz con barajado Fisher-Yates de preguntas y opciones, validación previa y nuevo intento.
- Botón «Sorpréndeme» que selecciona e invoca una de tres funciones aleatorias.
- Laboratorio Canvas 2D inspirado en The Nature of Code: fuerzas vectoriales, Euler semimplícito, amortiguación y tres modos.
- Animación pausada al ocultar la pestaña o salir del laboratorio; respeto a la preferencia de movimiento reducido.
- Referencias históricas y técnicas, textos alternativos, foco visible y controles nativos.

## Estructura

`index.html`: estructura semántica y secciones.
`style.css`: plantillas de escritorio y móvil.
`data.js`: biografías, preguntas y fuentes.
`script.js`: navegación, quiz, aleatoriedad y motor de partículas.
`assets/`: diez ilustraciones PNG originales, renombradas sin espacios.
`reporte-tecnico.pdf`: revisión y documentación de mejoras.
`GUIA-GITHUB.html`: pasos para publicar y entregar.
`.gitignore`: exclusión de archivos temporales y secretos.

## Publicación

Consulta `GUIA-GITHUB.html`. Sube **el contenido** de esta carpeta a la raíz de un repositorio público y activa Pages desde `main`, `/(root)`. La entrega requiere la liga real del repositorio y la del sitio. Ninguna liga de ejemplo equivale a una publicación realizada.

## Créditos y criterio editorial

Se conservaron el tema, las diez protagonistas, la idea de historieta y el quiz de la base recibida. Se integraron las ilustraciones suministradas. Los diálogos son recreaciones literarias y no deben citarse como frases históricas. No se atribuye una licencia abierta a imágenes de procedencia no documentada. Las fuentes están enlazadas en la página.

El laboratorio es una adaptación original de los principios de fuerzas de Daniel Shiffman, https://natureofcode.com/forces/ . Se utiliza Canvas 2D nativo; no se afirma utilizar p5.js o Three.js. Si el profesor exige específicamente una de esas bibliotecas, además de aceptar Nature of Code como indica la consigna, será necesario confirmar ese criterio.

## Validación

Sintaxis JS, integridad de rutas locales e imágenes, consistencia de respuestas y pruebas del núcleo de aleatoriedad y simulación. La revisión visual e interacción en un navegador real queda por realizar; consulta el reporte. La publicación en GitHub Pages requiere acceso a la cuenta de la alumna.
