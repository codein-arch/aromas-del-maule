Aromas del Maule

Aplicación web hecha con Flask para la Evaluación I de Programación Orientada a Objeto (4º Medio H, Liceo Bicentenario Instituto Comercial Linares).

Integrantes:Martin Cerda, Hugo Escudero, Nikolas Ramirez, Diego Zenteno

Idea comercial

Aromas del Maule es un emprendimiento de café de especialidad de Linares. La página está dirigida a personas que quieren café fresco en su casa u oficina. Su propuesta es café tostado por pedido, con granos de pequeños productores y envío a todo Chile. El objetivo es mostrar los productos y recibir pedidos por WhatsApp.

Estructura
aromas-del-maule/
├── app.py
├── requirements.txt
├── .gitignore
├── README.md
├── templates/
│   └── index.html
└── static/
    ├── css/styles.css
    ├── js/app.js
    └── img/logo.svg
app.py: crea la aplicación Flask y la ruta principal, que muestra index.html.
templates/index.html: la página, con los productos generados desde los datos de app.py.
static/css/styles.css: los estilos.
static/js/app.js: filtro de productos, carrito, menú del celular y validación del formulario.
Cómo ejecutarlo

Se necesita Python 3.10 o superior.

Clonar el repositorio y entrar a la carpeta:
   git clone https://github.com/USUARIO/aromas-del-maule.git
   cd aromas-del-maule
Crear el entorno virtual:
   python -m venv venv
Activarlo:
   venv\Scripts\activate          (Windows)
   source venv/bin/activate       (Mac / Linux)
Instalar las dependencias:
   pip install -r requirements.txt
Ejecutar:
   python app.py
Abrir http://127.0.0.1:5000 en el navegador.
Paso a paso de lo que hicimos
Definimos la idea comercial.
Creamos la carpeta del proyecto.
Creamos el entorno virtual con python -m venv venv y lo activamos.
Instalamos Flask con pip install flask.
Creamos app.py con la instancia de Flask y la ruta / que usa render_template().
Creamos templates/index.html con el contenido de la página.
Creamos static/css/styles.css y static/js/app.js y los enlazamos en el HTML con url_for.
Probamos la página en el computador y corregimos errores.
Generamos requirements.txt con pip freeze > requirements.txt.
Creamos el .gitignore para no subir venv ni __pycache__.
Subimos el proyecto a GitHub.
