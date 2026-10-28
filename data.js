/* Datos educativos y fuentes. Los diálogos son recreaciones literarias. */
const heroinesData = [
  {
    "name": "Ada Lovelace",
    "field": "Tecnología / Matemáticas",
    "panel1Text": "Londres, 1843. Ada observa con fascinación la máquina analítica de Babbage.",
    "panel2Speech": "¡Los números pueden tejer diseños algebraicos tal como el telar de Jacquard teje flores y hojas!",
    "panel3Text": "En sus notas de 1843 publicó un algoritmo para calcular números de Bernoulli con la máquina analítica, y anticipó usos de la computación más allá del cálculo.",
    "panel4Speech": "Mi mente ve más allá de la simple aritmética; vislumbro el arte y la ciencia unidos en la computación.",
    "image": "assets/ada-lovelace.png",
    "sourceLabel": "Science Museum",
    "source": "https://blog.sciencemuseum.org.uk/ada-lovelace-visionary-of-the-computer-age/"
  },
  {
    "name": "Rosalind Franklin",
    "field": "Ciencia / Biofísica",
    "panel1Text": "King's College, 1952. Horas de meticulosa exposición fotográfica de alta precisión.",
    "panel2Speech": "La nitidez de la Fotografía 51 revela la verdadera simetría helicoidal del ADN.",
    "panel3Text": "Sus estudios de difracción de rayos X, incluida la Fotografía 51 obtenida con Raymond Gosling, aportaron evidencia crucial para determinar la estructura del ADN.",
    "panel4Speech": "La ciencia exige paciencia absoluta ante la placa fotográfica; la verdad siempre se revela ante la observación rigurosa.",
    "image": "assets/rosalind-franklin.png",
    "sourceLabel": "King’s College London",
    "source": "https://www.kcl.ac.uk/the-story-behind-photograph-51"
  },
  {
    "name": "Artemisia Gentileschi",
    "field": "Arte / Pintura Barroca",
    "panel1Text": "Roma, siglo XVII. El estudio se ilumina con la potente luz de una única vela.",
    "panel2Speech": "Plasmaré la fuerza y el valor en cada lienzo, desafiando las normas de mi época con claroscuro.",
    "panel3Text": "Maestra indiscutible del barroco, sus obras redefinieron el dramatismo visual y la perspectiva heroica.",
    "panel4Speech": "El arte no tiene género; tiene pulso, pasión y una verdad inquebrantable.",
    "image": "assets/artemisia-gentileschi.png",
    "sourceLabel": "National Gallery",
    "source": "https://www.nationalgallery.org.uk/artists/artemisia-gentileschi"
  },
  {
    "name": "Hipatia de Alejandría",
    "field": "Historia / Filosofía y Astronomía",
    "panel1Text": "Alejandría, siglo V. Estudiantes de todo el Mediterráneo acuden a escuchar sus enseñanzas.",
    "panel2Speech": "Debes enseñar a tu espíritu a cuestionar el cosmos; comprender los astros es liberarse.",
    "panel3Text": "Matemática, astrónoma y filósofa neoplatónica, enseñó en Alejandría. Las fuentes antiguas relacionan sus enseñanzas con instrumentos como el astrolabio.",
    "panel4Speech": "Defiende tu derecho a pensar, porque pensar erradamente es mejor que no pensar en absoluto.",
    "image": "assets/hipatia.png",
    "sourceLabel": "MacTutor · University of St Andrews",
    "source": "https://mathshistory.st-andrews.ac.uk/Biographies/Hypatia/"
  },
  {
    "name": "Katherine Johnson",
    "field": "Tecnología / Astronomía y Espacio",
    "panel1Text": "Langley, Virginia, 1962. Las trayectorias de vuelo requieren precisión milimétrica.",
    "panel2Speech": "Verifiquen los números del ordenador electrónico. Yo confío en las ecuaciones de transferencia orbital.",
    "panel3Text": "Matemática clave de la NASA cuyas trayectorias hicieron posible el éxito del Apolo 11 y los vuelos tripulados.",
    "panel4Speech": "Calculamos el camino hacia las estrellas con tiza, pizarra y una determinación implacable.",
    "image": "assets/katherine-johnson.png",
    "sourceLabel": "NASA",
    "source": "https://science.nasa.gov/people/katherine-johnson/"
  },
  {
    "name": "Marie Curie",
    "field": "Ciencia / Física y Química",
    "panel1Text": "París, 1898. El análisis de la pechblenda conduce a nuevas preguntas sobre la radiactividad.",
    "panel2Speech": "Hemos descubierto el polonio y el radio. Aún queda mucho trabajo para estudiar sus propiedades.",
    "panel3Text": "Recibió el Nobel de Física en 1903 y el de Química en 1911. Fue la primera mujer en recibir un Nobel y la primera persona en recibir dos.",
    "panel4Speech": "Nada en la vida debe ser temido, solo comprendido. Ahora es el momento de comprender más.",
    "image": "assets/marie-curie.png",
    "sourceLabel": "Nobel Prize",
    "source": "https://www.nobelprize.org/prizes/physics/1903/marie-curie/biographical/"
  },
  {
    "name": "Sor Juana Inés de la Cruz",
    "field": "Historia / Literatura y Letras",
    "panel1Text": "México, virreinato. Entre miles de volúmenes, la escritura es un acto de libertad intelectual.",
    "panel2Speech": "Hombres necios que acusáis a la mujer sin razón, sin ver que sois la ocasión de lo mismo que culpáis.",
    "panel3Text": "Fénix de América, escritora barroca excepcional y defensora incansable del derecho femenino al saber.",
    "panel4Speech": "Yo no estudio para saber más, sino para ser un poco menos ignorante.",
    "image": "assets/sor-juana.png",
    "sourceLabel": "Biblioteca Virtual Miguel de Cervantes",
    "source": "https://www.cervantesvirtual.com/portales/sor_juana_ines_de_la_cruz/"
  },
  {
    "name": "Hedy Lamarr",
    "field": "Tecnología / Telecomunicaciones",
    "panel1Text": "Hollywood y taller secreto, 1941. Entre rodajes cinematográficos, diseña sistemas de guía secreta.",
    "panel2Speech": "Este sistema de modulación por salto de frecuencia evitará que las señales de los torpedos sean interferidas.",
    "panel3Text": "Actriz e inventora, desarrolló junto con George Antheil un sistema de salto de frecuencia patentado en 1942: un antecedente de las comunicaciones de espectro ensanchado.",
    "panel4Speech": "Las ideas bellas provienen tanto de la creatividad artística como de la invención técnica.",
    "image": "assets/hedy-lamarr.png",
    "sourceLabel": "National Women’s History Museum",
    "source": "https://www.womenshistory.org/education-resources/biographies/hedy-lamarr"
  },
  {
    "name": "Hilma af Klint",
    "field": "Arte / Pintura Abstracta",
    "panel1Text": "Suecia, 1906. Pinceladas guiadas por una visión moderna y profunda del universo invisible.",
    "panel2Speech": "Las formas geométricas y los colores vibrantes expresan verdades espirituales que el ojo físico aún no alcanza.",
    "panel3Text": "Pionera de la abstracción, comenzó en 1906 una serie de pinturas no figurativas. Su obra amplía la historia del surgimiento del arte abstracto.",
    "panel4Speech": "El futuro contemplará estas pinturas con otros ojos; el mundo guardará mi arte hasta que esté listo.",
    "image": "assets/hilma-af-klint.png",
    "sourceLabel": "Hilma af Klint Foundation",
    "source": "https://hilmaafklint.se/about-hilma-af-klint/"
  },
  {
    "name": "Jane Goodall",
    "field": "Ciencia / Primatología y Ecología",
    "panel1Text": "Tanzania, 1960. Paciencia absoluta observando la vida social de los chimpancés en su hábitat.",
    "panel2Speech": "Miren cómo usa esa ramita como herramienta. Los primates también fabrican instrumentos para sobrevivir.",
    "panel3Text": "Primatóloga y antropóloga revolucionaria que transformó nuestra comprensión de la empatía animal y la conservación.",
    "panel4Speech": "Comprender a otros seres vivos puede inspirarnos a cuidarlos y a proteger los lugares que habitan.",
    "image": "assets/jane-goodall.png",
    "sourceLabel": "Jane Goodall Institute",
    "source": "https://janegoodall.org/jane-goodalls-story/"
  }
];
const quizData = [
  {
    "question": "¿Qué publicó Ada Lovelace en 1843?",
    "options": [
      "El primer motor a vapor industrial",
      "Un algoritmo para la máquina analítica",
      "La primera cámara fotográfica a color"
    ],
    "correct": 1
  },
  {
    "question": "¿Qué técnica fotográfica clave utilizó Rosalind Franklin para revelar la estructura del ADN?",
    "options": [
      "Difracción de Rayos X",
      "Fotografía infrarroja nocturna",
      "Holografía láser avanzada"
    ],
    "correct": 0
  },
  {
    "question": "¿A qué corriente artística perteneció Artemisia Gentileschi?",
    "options": [
      "Impresionismo",
      "Barroco",
      "Surrealismo"
    ],
    "correct": 1
  },
  {
    "question": "¿Cuál fue una de las contribuciones tecnológicas e ingenieriles de Hedy Lamarr?",
    "options": [
      "El diseño inicial del transistor de silicio",
      "Un sistema de salto de frecuencia, junto con George Antheil",
      "El primer lenguaje de programación para satélites"
    ],
    "correct": 1
  },
  {
    "question": "¿Por qué destaca históricamente la obra de Hilma af Klint?",
    "options": [
      "Por ser una pionera de la abstracción desde 1906",
      "Por pintar los retratos oficiales de la realeza sueca",
      "Por diseñar los planos arquitectónicos de museos modernos"
    ],
    "correct": 0
  }
];
