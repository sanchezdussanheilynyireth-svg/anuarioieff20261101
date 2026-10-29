/* =====================================================================
   ANUARIO · DATOS  (este es el ÚNICO archivo que tienes que editar)
   ---------------------------------------------------------------------
   · El libro se arma solo según cuántos estudiantes pongas en ESTUDIANTES
     (30, 35, 42… los que sean). Las páginas salen en el MISMO ORDEN en que
     los escribas aquí. Docentes y momentos funcionan igual.
   · El diseño no se toca: solo cambian los textos y las imágenes.
   · Todos los campos son opcionales: lo que dejes vacío ("" o []) muestra el
     texto de ejemplo y se puede llenar a mano en la página (botón ✏️ Editar).

   IMÁGENES (3 formas, puedes mezclarlas):
     1) Ruta de archivo:  foto:"fotos/estudiantes/01.jpg"
     2) Enlace completo:  foto:"https://…/mi-foto.jpg"
     3) Google Drive:     foto:drive("ID_DEL_ARCHIVO")   (el archivo debe estar compartido)
     Si QUITAS la línea foto/firma de un estudiante, se busca sola en la carpeta
     según el número de su página (ver "rutaFoto…" abajo): basta con guardar
     01.jpg, 02.jpg, 03.jpg… en fotos/estudiantes/ sin escribir nada más.
     Si quieres que NO se busque (y poder subirla desde la página): foto:"".

   CAMPOS DE CADA ESTUDIANTE / DOCENTE
     nombre           nombre completo
     foto, fotoPos    foto tipo carné · fotoPos opcional para encuadrar: "50% 20%"
     firma            imagen de la firma (PNG con fondo transparente se ve mejor)
     frase            frase favorita
     recuerdo         recuerdo favorito
     aspiraciones     lista:  ["Estudiar medicina", "Viajar"]
     agradecimientos  texto
     tema             estilo de la página: base · bts · anime · futbol · natura ·
                      gamer · arte · rock   (docentes: profe)
     profesion        cinta "Futuro/a en…": medicina · enfermeria · psicologia ·
                      derecho · ingenieria · sistemas · arquitectura · admin ·
                      conta · educacion · arte · musica · deporte · cocina ·
                      veterinaria · agro · comunicacion · fuerza · aviacion
                      (también sirve el nombre: "Medicina")
     personaje        sticker grande, un emoji:  "🐱"
     color            color de la página, por ejemplo "#7b4bc4" (vacío = el del tema)

   DESPUÉS DE EDITAR: guarda y recarga la página (Ctrl+F5).
   Si cambias los datos de una página, esa página se vuelve a armar desde aquí
   (lo escrito a mano en el navegador para ESA página se descarta).
   ===================================================================== */

const drive=(id,w=900)=>"https://drive.google.com/thumbnail?id="+id+"&sz=w"+w;

/* ---------- AJUSTES GENERALES ---------- */
const CONFIG={
 colegio:"I.E. Eugenio Ferro Falla",
 grado:"1101",
 anio:2026,
 lema:"Ciencia · Virtud · Progreso",
 escudo:"escudo1.gif",

 modoEdicion:true,   /* true = barra superior y edición · false = libro final para compartir */

 /* qué campos se muestran en las páginas (false = se oculta ese dato aunque esté escrito) */
 mostrar:{frase:true,recuerdo:true,aspiraciones:true,agradecimientos:true},

 cintaAutomatica:false, /* true = deduce la cinta "Futuro/a en…" leyendo las aspiraciones */

 /* carpeta donde se busca la imagen cuando NO escribes foto/firma ({n} = 01, 02, 03…) */
 rutaFotoEstudiante:"fotos/estudiantes/{n}.jpg",
 rutaFotoDocente:"fotos/docentes/{n}.jpg",
 rutaFirma:"fotos/firmas/{n}.png",   /* {n} = número de la persona (estudiantes 1…N, docentes N+1…) */

 portada:{
  foto:"",   /* foto del colegio, ej. "fotos/portada/colegio.jpg" */
  banda:"Grandes momentos, mejores personas ♡",
  chips:["Amistad","Respeto","Superación","Futuro"]
 }
};

/* ---------- PÁGINA DE BIENVENIDA ---------- */
const BIENVENIDA={
 rector:"",     /* saludo del rector o rectora */
 director:"",   /* palabras del director de grupo */
 frase:""       /* "Nuestro curso en una frase" */
};

/* ---------- ESTUDIANTES (orden de lista = orden de las páginas) ---------- */
const ESTUDIANTES=[
  {
   nombre:"Laura Liney Alarcon Cortes",
   foto:drive("1Gwy4a1iObBHX734ieWDZN-e-kEWaoGAc"),
   firma:drive("1IPv--clJ5UyswHYTJjTlMi9K1ZtPqRyA"),
   frase:"El que persevera alcanza",
   recuerdo:"Haber encontrado una persona realmente leal en mi vida",
   aspiraciones:["Enfermera","Doctora","Ingeniera"],
   agradecimientos:"Agradezco a Dios y a mi familia que me acompañaron en esta etapa, por su apoyo, consejos y paciencia.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Narly Lizeth Amaya Losada",
   foto:drive("1fGMBAenGLS86sfqOlHCNcN9lYbg5jpmL"),
   firma:drive("19-rsYfIzTJYstmzLoP5_3SOlLnSpMgjX"),
   frase:"No entendí nada",
   recuerdo:"Mi recuerdo favorito es conocer a amistades que me ayudaron en el peor momento y me sacaban una sonrisa",
   aspiraciones:["Seguir estudiando","Terminar hasta sacar el tecnólogo","Trabajar para conseguir mis cosas"],
   agradecimientos:"A mis padres y a todos los docentes que me acompañaron",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Nycolt Danihela Barrera Mosquera",
   foto:drive("1Afics_wPmXbKt6b2k2HJhtzJhwtqH3CQ"),
   firma:drive("1lIuyzfjk_gTg_C7dMygCoYW7qEzw3o2d"),
   frase:"Su Madreeee",
   recuerdo:"Mi recuerdo favorito fue cuando iniciamos nuestro grupito de 4 en séptimo con unas amigas",
   aspiraciones:["Estudiar en el SENA","Hacer orgullosa a mi madre","Infante de Marina","Chef"],
   agradecimientos:"Le doy gracias a mi madre por darme su apoyo incondicional en mis estudios y por siempre confiar en mí",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Andres Felipe Bastidas Lombana",
   foto:drive("1Q_BcZBFbvz2IffUyVuvChQdZh5PIwRjf"),
   firma:drive("1gPg5rH-Mg6t2HjcoHEmtcMcEaEAtzpJH"),
   frase:"Relax que yo remonto",
   recuerdo:"Mi noviazgo",
   aspiraciones:["Ser odontólogo","Graduarme como bachiller"],
   agradecimientos:"Agradezco a mis padres por todo el esfuerzo que hicieron todos estos años para que yo pudiera llegar hasta acá",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Estiven Julian Benitez Castro",
   foto:drive("19NPaWe31ZieErbXIKnrIL4fTH5w1MJm-"),
   firma:drive("1wh3YCSf83k3EoFq0GOVR_vjlGKgD1vXc"),
   frase:"Mire a este negro",
   recuerdo:"Sin duda, mi recuerdo favorito fue el día en que me organizaron una fiesta de cumpleaños sorpresa. Ver reunidos a mis 4 mejores amigos para celebrar conmigo es un momento que guardo con muchísimo cariño en el corazón.",
   aspiraciones:["Mi mayor aspiración es convertirme en doctor y alcanzar todas mis metas profesionales, preparándome con dedicación para proteger la salud de las personas y cumplir con éxito cada objetivo que me proponga en el futuro."],
   agradecimientos:"Agradezco profundamente a mis compañeros, familiares y profesores por haberme acompañado y guiado en esta etapa. Su apoyo y compañía fueron fundamentales durante todo mi proceso educativo en la secundaria.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Nikoll Lizeth Bocanegra Giraldo",
   foto:drive("1z53NTeELCuo_n4iFVHHHIoCAUnGw0mt2"),
   firma:drive("1o6RCWXn0QQU-Dji6nyHquBYXT6ed-ZIw"),
   frase:"En nombre de Dios, todo lo lograré",
   recuerdo:"Todos los recuerdos de octavo, pero especialmente cuando dañamos un candado para no tener clases con una profesora",
   aspiraciones:["Estudiar la carrera de mis sueños"],
   agradecimientos:"Gracias a mi familia por el apoyo",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Danna Valentina Caviedes Perdomo",
   foto:drive("18uI9sY0pgl0awPkb-AJUyk9YocEH_jZI"),
   firma:drive("1Ck-IuPGAJcg_NJnxECB9U5rnTCrFv6km"),
   frase:"Ay Dios mío",
   recuerdo:"Mi recuerdo favorito es cuando unos compañeros estaban jugando con una pelota de papel, y accidentalmente le pegaron a una profesora casi dañándole las gafas.",
   aspiraciones:["Estudiar psicología","Seguir con el técnico"],
   agradecimientos:"Les doy las gracias a mis padres por su apoyo emocional, económico, a mis maestros por su paciencia, y todas las enseñanzas que me han dejado.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Zaidy Liceth Cuellar Caviedes",
   foto:drive("1mOYvzofE_O2CSRC74LTnZqa4RO0licBo"),
   firma:drive("10YOb6L7ZgzdIhLEgHVJqs5djKQEdCTEh"),
   frase:"Ay no, qué pena",
   recuerdo:"Mi recuerdo favorito de décimo fue compartir risas, locuras y momentos inolvidables con mis compañeros, creando recuerdos que siempre llevaré en mi corazón.",
   aspiraciones:["Estudiar en el SENA","Hacer sentir orgullosa a mi familia","Cumplir mi sueño sin rendirme","Crecer como persona y aprender de mis errores"],
   agradecimientos:"Agradezco a mis padres por su amor incondicional, por apoyarme en cada momento y por hacer tantos esfuerzos para darme lo mejor. Gracias por sus consejos, por confiar en mí y por motivarme a seguir adelante, incluso cuando las cosas se ponen difíciles. Ustedes son una parte fundamental de mi vida y una de mis mayores motivaciones para cumplir mis sueños. Todo lo que hacen por mí lo llevo en mi corazón, y espero algún día poder devolverles un poquito de todo lo que me han dado. Los amo mucho y me siento muy afortunada de tenerlos en mi vida.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Kewin Daniel Escobar Ramirez",
   foto:drive("1ej6XjqP9CyFix8nZVUa3uNpYwbALRO0r"),
   firma:drive("1nqxymZ5gGT2csSPludqqVY95I_iQcLoB"),
   frase:"Ole no",
   recuerdo:"El día que jugué un torneo departamental",
   aspiraciones:["Ser profesional en multimedia","Debutar como jugador"],
   agradecimientos:"Le agradezco a mi familia por apoyarme",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Laura Fuentes Aranda",
   foto:drive("14QqznC7cIClQJI3b_LetyBoWnrJehtyC"),
   firma:drive("1hQRvj96ZDvIuxYmWEMlhNXH4aBoVYnCe"),
   frase:"Estoy siendo víctima de xenofobia por parte de mi compañero Benítez",
   recuerdo:"Todos los días a partir de 9no (2024) han sido como el mejor de todos. Pero los mejores, como Prom, fueron las horas lúdicas a la última hora de todos los miércoles.",
   aspiraciones:["Ser programadora y tener una vida tranquila y digna."],
   agradecimientos:"Agradezco a cada uno de mis compañeros por haber formado parte de los recuerdos más bonitos de mi último año escolar. Me llevo conmigo las risas, las enseñanzas, los momentos compartidos y la tristeza de saber que una etapa tan especial está llegando a su fin.\nA Yuvettslit Yunda, por ser mi primera amiga al llegar a la institución, por permitirme verla crecer y por ocupar un lugar en mi corazón que el tiempo nunca podrá borrar. A Julieta Rocha, por ser mi compañía, cómplice, apoyo incondicional y una de las amistades más valiosas de este camino. A Isabella Monje, por tenderme la mano cuando más lo necesité; a Laura Serrato, por los momentos vividos; a Estiven Benítez, por su liderazgo, amistad y por hacerme bullying de vez en cuando; a Laura Marinez, por tantas risas y su apoyo; a Cristian Muñoz, por su compañía; a Heilyn Sánchez y Saory Montaña, por estar presentes cuando pudieron; a Laura Galindo, por su cariño y confianza; y a Johan Ramírez, por su carisma y honestidad. Gracias a todos por dejar un pedacito de ustedes en esta historia que siempre recordaré con cariño.\nA mis profesores, especialmente al profe Sebastián Masmelas, gracias por despertar en mí el amor por la programación.\n\nA mi padre, Leonardo Fuentes, por su apoyo económico durante mi formación; a mis hermanos mayores, Cristian Galindo y Yonatan Galindo, por tenderme la mano cuando lo necesité; y a Esther Hernández, por acompañarme espiritual y emocionalmente en este proceso.\n\nPero, sobre todo, mi agradecimiento más profundo es para mi mamá, Lina Aranda. Gracias por cada sacrificio, por cada esfuerzo silencioso y por luchar incansablemente para darme un futuro mejor. Gracias por salvarme de la ignorancia, por creer en mí incluso en medio de las dificultades y por dejarlo todo con tal de verme llegar lejos. Si hoy puedo soñar con un futuro lleno de oportunidades, es porque tú has construido el camino con tus propias manos.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Laura Valentina Galindo Diaz",
   foto:drive("11ufYvLxGH21KwTB_1CELVFFOaQ_HOEg7"),
   firma:drive("1xOEPp4iYRi_qSyw_vHDqTloY9BGHDXsB"),
   frase:"Tengo sueño",
   recuerdo:"Mi recuerdo favorito es cuando conocí por primera vez a mi mejor amiga Valeria",
   aspiraciones:["Poder especializarme en lo que más aspiro y lograrlo con esfuerzo y mucha dedicación."],
   agradecimientos:"Le agradezco a mis padres por darme motivación y fuerzas para lograr mis metas y poder seguir adelante.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Mariana García Pérez",
   foto:drive("1_rXuwN0kDITTVxw6ePxjUmOAvFQ94fqY"),
   firma:drive("1NTbYW0xUXR2IAa6DKy6tT6dcD0rnBMpk"),
   frase:"Falsos",
   recuerdo:"La vez que hicieron caer a Edwin y, de paso, a Natalia en el puente de guadua, y quedó cochino.",
   aspiraciones:["Psicología o Licenciatura en Lengua Castellana"],
   agradecimientos:"Agradezco principalmente a Dios y a mis padres, sobre todo a mi hermana Nubia, quien ha hecho el papel principal en apoyarme tanto académica como financieramente. Los amo.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Jesus Fernando Gutierrez Diz",
   foto:drive("1sfRXUOKSXYskq6o-q2E6FUUv91bJ3Au2"),
   firma:drive("10t7ZC-UdMbHzy3BVwn3Uk7Ngksh6OvZg"),
   frase:"Los errores ocurren",
   recuerdo:"Cuando obtuve las 80 horas sociales sin hacer prácticamente nada.",
   aspiraciones:["Convertirme en un médico o arquitecto más célebre y representativo."],
   agradecimientos:"Gracias a mis padres, hermano y profesores que me apoyaron en todo para poder salir adelante.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Julieta",
   foto:drive("1A-kdHoGADSSK0ifUBhS6XBSOg6l7xPoA"),
   firma:drive("1xJmvRGSIdFMgkE-v0dmxD6N3zWXABzhP"),
   frase:"Todo pasa por algo, los planes de Dios son perfectos",
   recuerdo:"",
   aspiraciones:["Quiero cumplir mis dos sueños: llegar a ser profesora de pedagogía infantil, para mostrar ese amor tan grande que tengo con los niños y enseñarles las bases que les van a servir para el resto de su vida, y después estudiar para ser azafata, uno de mis mayores sueños; lucharé para conseguirlo.","También poder tener la oportunidad de devolverles todo a mis papás, ya que han sido de gran apoyo."],
   agradecimientos:"",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Laura Sofia",
   foto:drive("1xaD5-0lkBCOQ7l_OANPiaPjTm4YsZLHt"),
   firma:drive("1mRmD3oL2RemUl23xSBuKdmDXAUFP0oPO"),
   frase:"Uy no, atrás Satanás",
   recuerdo:"Mi recuerdo favorito es cuando todos fuimos a la casa del chico que me gustaba y se pusieron a darle una serenata con la canción de la ventana marroncita.",
   aspiraciones:["Quiero graduarme feliz junto a mis amigos","Terminar el tecnólogo","Homologar y estudiar diseño","Estudiar más cursos en el SENA","Entrar en la universidad y estudiar biología","Graduarme de la universidad","Ser profesional con lo estudiado"],
   agradecimientos:"Gracias a mis amigos Laura Fuentes, Ancizar Triana, Joan Ramírez, Isabella Monje y Yuvettslit Yunda, y a todo el salón, por ser tan especiales para mí y por ser tan unidos a pesar de nuestras diferencias.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Laura Angeline Marinez Olaya",
   foto:drive("1-VsQzhQRQvmCZT4B3xWrRsIFqdZ3regx"),
   firma:drive("15We6yfCRc4oQIAI8ZgdkGyxfmi307jaI"),
   frase:"No joda",
   recuerdo:"Los momentos con mis padres cuando era pequeña.",
   aspiraciones:["Estudiar derecho"],
   agradecimientos:"Agradezco a mi familia",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Francy Fidelina Medina Garcia",
   foto:drive("1ehy9tYF3NRYSQelvJ5GhRCuWtTw5NCDd"),
   firma:drive("1ks6Xli0UV0blsupAvkBm2pJebN8IAVPT"),
   frase:"Todo es mental",
   recuerdo:"Mi recuerdo favorito en general es cuando compartimos",
   aspiraciones:["Graduarme","Ingresar a la universidad","Estudiar Medicina","Crecer como persona","Ayudar a mi familia","Conocer nuevos lugares","Cumplir cada uno de mis sueños"],
   agradecimientos:"Agradezco a mi familia, docentes y compañeros por su apoyo, dedicación y enseñanzas durante esta etapa, que han contribuido a mi formación personal y académica.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Isabella Monje Vega",
   foto:drive("198YHO7iwlGUdWOCUxQqHgJbaFc7EadRC"),
   firma:drive("17xfhc6I-iyRS62w0pUB4lDzj_5KjetVU"),
   frase:"Te cuento un chiste, amiga",
   recuerdo:"Cuando estaba en el puente con mis amigos y nos inventamos un caso para un juicio",
   aspiraciones:["Tener mi propia empresa y llegar a componer mis propias canciones"],
   agradecimientos:"Le agradezco a mi mamá, tío y abuela por nunca dejarme sola y confiar en mí incluso cuando yo no lo podía hacer",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Saory Valentina Montaña Piñeros",
   foto:drive("1NRKmorWYuMnlvDMlhQkCtvTxb8UTHe_W"),
   firma:drive("172aTK0HVy1QYD4oOlxepQkC5UAZL-cwD"),
   frase:"Tengo hambre",
   recuerdo:"Cuando me la pasaba jugando voleibol.",
   aspiraciones:["Salir del colegio y formar una carrera"],
   agradecimientos:"Agradezco a todos los que me acompañaron en mi formación académica.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Julieth Valentina Mora Esquivel",
   foto:drive("1EqxH5j63XALoksrbppNzSTxeHmKbYDRb"),
   firma:drive("1jUO3JInobkAUrlmebcsbfF90jS6yUD6k"),
   frase:"Somos la resistencia",
   recuerdo:"En séptimo, cuando jugábamos fútbol y la mayoría del salón estaba unida.",
   aspiraciones:["Estudiar lo que me gusta y terminarlo","Trabajar en eso","Formar una hermosa familia"],
   agradecimientos:"Agradezco primeramente a Dios por permitirme estar donde estoy y con vida, y a mis padres por apoyarme en cada momento de mi vida y suplir cada necesidad que tengo.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Cristian Rene Muñoz Quintero",
   foto:drive("1rhm62Kw6RgOgc05TjKzKwuERA0cXU1m3"),
   firma:drive("1SL19OeUyHtSL6d2y_aObhV_aJdYnUyhY"),
   frase:"",
   recuerdo:"Cuando tuvimos una salida con Álvaro y nos escapamos para la piscina.",
   aspiraciones:["Hacer un tecnólogo en el SENA","Ir a la UNI y estudiar lo que me gusta para ganar mucha plata"],
   agradecimientos:"",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Alex Felipe Ortiz Narvaez",
   foto:drive("1BElPcguZokclbu8LSIFmBHssYehEBLB6"),
   firma:drive("10YoPdJHBt4_EnPQYELcZgV5ZrfCVXzvM"),
   frase:"No mienta",
   recuerdo:"",
   aspiraciones:[],
   agradecimientos:"Primero que todo, quiero dar gracias a Dios por haberme permitido vivir esta experiencia escolar con salud y vida. También agradecer a los profesores que se esforzaron por enseñarnos con dedicación, paciencia y esfuerzo todos sus conocimientos y valores que nos puedan servir en nuestra vida cotidiana. Por último, estaré infinitamente agradecido con mis padres por haberme acompañado y apoyado en todos mis proyectos y en mi trayectoria como estudiante a través del tiempo.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Duvan Felipe Ortiz Sarmiento",
   foto:drive("1iaiZ-2vis8RWQvonJT2TzTX3r7vh2FiG"),
   firma:drive("1gbaKgYNO5AGJZB_nJOIfv_Bn_YUejFil"),
   frase:"Yo sí estudié pero se me olvidó todo",
   recuerdo:"Cuando jugué futbol con mis compañeros y nos golearon pero no faltaron las risas",
   aspiraciones:["Mis aspiraciones son terminar mis estudios, graduarme del colegio, estudiar lo que me gusta, convertirme en un gran profesional.","Sueño con tener un buen trabajo, una casa propia, ayudar económicamente a mi familia, hacer sentir orgullosos a mi mamá y hermano, viajar y conocer nuevos lugares.","Aspiro a ser una persona responsable, humilde y respetuosa, cumplir cada uno de mis sueños y construir un futuro lleno de felicidad, éxitos y bendiciones, siempre con la ayuda de Dios."],
   agradecimientos:"Gracias, Dios, por permitirme vivir esta hermosa etapa de mi vida, por darme la oportunidad de aprender, por cada compañero que puso una sonrisa en mis días y por cada maestro que me enseñó algo más que una lección. Gracias por los momentos felices, por las dificultades que me hicieron más fuerte y por los recuerdos que siempre llevaré en mi corazón. Hoy entiendo que el colegio no solo me dejó conocimientos, sino también amistades, experiencias y enseñanzas que me acompañarán toda la vida.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Joan Sebastian Ramirez Garcia",
   foto:drive("1Apw-0FYsWWQyt0P77iYRjirCVIYNgCwK"),
   firma:drive("1cMGdF6zeFoJ_S6f1ajfVl95hgqg5NqnA"),
   frase:"Sapa",
   recuerdo:"",
   aspiraciones:["Ser un gran empresario"],
   agradecimientos:"",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Heilyn Yireth Sanchez Dussan",
   foto:drive("12Tii4J_3ZgtwgLNvEnbNpfGyLnpIs7Sz"),
   firma:drive("18pKO18tqwZF1MoLhKQ8aNwRz7kA7QGh_"),
   frase:"Ya quisiera yo",
   recuerdo:"El compartir de la salchipapa.",
   aspiraciones:["Llegar a ser una persona exitosa que no necesite ayuda de los demás."],
   agradecimientos:"Agradezco a mi familia, amigos, compañeros y profesores por darme enseñanzas, ejemplos y aprendizaje que me ayudaron a formarme como la persona que soy ahora.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Thaliana Sofia Sanchez Rocha",
   foto:drive("1Yf0nQMO3T7Qx5qXfuwujg4tkAoNs08TR"),
   firma:drive("1J0jxNV3DfrN8CVZrQDg4dA88P6edZpCU"),
   frase:"Vive la vida",
   recuerdo:"El 2022 con mis amigas",
   aspiraciones:["Ser feliz"],
   agradecimientos:"Agradezco a MDZS, a mis padres, a mis profesores y a mis compañeros por ayudarme a lograr mis metas.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Hillary Natalia Serrato Acosta",
   foto:drive("105cQQ4GJrk37KC280fGPFzoot1Mh4SQm"),
   firma:drive("1LuRtGpqdPrLMoLgXrwzmJdQIcJGUj_0f"),
   frase:"No todo es para siempre, pero tú sí vas a poder con todo.",
   recuerdo:"Una vez que estaba caminando con mis amigos por el patio del colegio y después nos fuimos para un lado el cual había un río; esa vez me lanzaron al río con otro compañero. Yo no quería culpar ni avisar a la responsable, pero ya la habían delatado en coordinación; nos llevaron para allá, le pusieron observación y nos regañaron.",
   aspiraciones:["Quiero terminar mi bachillerato con la ayuda de Dios, graduarme y estudiar para ser una gran licenciada en educación infantil"],
   agradecimientos:"Agradezco al colegio por ser mi segundo hogar, a mis profesores por enseñarme con paciencia y dedicación, a mis compañeros por hacerme cada día más alegre. Me llevo lo aprendido y lo vivido en el corazón.",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Nicolas Soto Calderon",
   foto:drive("1cXOVlypcZyFssF8mzYwHz0uJrMjJGSaL"),
   firma:drive("1Enyh8QnHeBoJuEmIYkQrKVFcOA0PHXUC"),
   frase:"Yo que me saque un 3 me conformo",
   recuerdo:"Cuando jugamos un partido con mis amigos y nos golearon",
   aspiraciones:["Tener un trabajo estable","Tener un título profesional de ingeniero","Estar junto a mis padres"],
   agradecimientos:"Primero que todo darle el agradecimiento a mis padres que son los que me han apoyado siempre y en cualquier circunstancia, también a mis abuelas, que es otro mérito de orgullo saber que tengo una familia unida y que me apoya en todo, y gracias a eso he podido con todo y siempre salir adelante afrontando todo",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Ancizar Steven Triana Murcia",
   foto:drive("18NzJ3TYERWqcAsLJ6jMvL-mYRMPS6aIB"),
   firma:drive("1Cv-TT4F97KgUwTNO3nb_1UJP5PnoxZ8J"),
   frase:"Six seven",
   recuerdo:"El día del compartir en 10°",
   aspiraciones:["Terminar el tecnólogo","Irme del país junto a mi familia","Hacer la universidad","Tener hijos"],
   agradecimientos:"Al profesor Sebastián por enseñar tan bien y tan apasionadamente como lo ha hecho y a mis amigos por hacer todos estos años más divertidos y fáciles de pasar",
   tema:"", profesion:"", personaje:"", color:""
  },
  {
   nombre:"Yuvettslit Yunda Cortes",
   foto:drive("1nnCBhK8HLKlHwWTWW6npgM1t_qBRPaO4"),
   firma:drive("1KAYVPbtKyzA5Uw4rdCBrgbQiDVcPYzqj"),
   frase:"Life goes on",
   recuerdo:"Mi mamá y yo en la graduación de 9no, por cómo se veía y sentí su orgullo",
   aspiraciones:["Llegar a ser profesional en marketing","Ayudar a mi mamá","Viajar","Tener un trabajo estable","Obtener dinero y especializarme en algo"],
   agradecimientos:"A mi mamá y a mi hermano, por acompañarme durante todo este proceso, por su esfuerzo para conseguir lo que yo necesitaba y, sobre todo, por demostrarme su apoyo, amor y orgullo",
   tema:"", profesion:"", personaje:"", color:""
  },
];

/* ---------- DOCENTES (los que quieras; mismos campos que un estudiante) ---------- */
const DOCENTES=[
 {nombre:"", foto:"", firma:"", frase:"", recuerdo:"", aspiraciones:[], agradecimientos:"", tema:"", profesion:"", personaje:"", color:""},
 {nombre:"", foto:"", firma:"", frase:"", recuerdo:"", aspiraciones:[], agradecimientos:"", tema:"", profesion:"", personaje:"", color:""}
];

/* ---------- MOMENTOS IMPORTANTES (una página cada uno) ----------
   fotos: las que quieras (1 a 8); un "" deja el espacio libre para subirla desde la página. */
const MOMENTOS=[
 {nombre:"", titulo:"", texto:"", quienes:"", fotos:["","","",""]},
 {nombre:"", titulo:"", texto:"", quienes:"", fotos:["","","",""]},
 {nombre:"", titulo:"", texto:"", quienes:"", fotos:["","","",""]}
];

/* ---------- PÁGINA FINAL ---------- */
const CIERRE={
 agradecimiento:"",  /* "Agradecimientos del curso" */
 frase:""            /* frase de cierre */
};
