# ☕ Aromas del Maule

Aplicación web comercial creada desde cero con **Python y Flask**.
Proyecto de la *Evaluación I de Programación Orientada a Objeto* — 4º Medio H,
Liceo Bicentenario Instituto Comercial Linares.

## 1. Propósito y propuesta comercial

| Elemento | Definición |
| --- | --- |
| **Emprendimiento** | Aromas del Maule, tostaduría de café de especialidad de Linares |
| **Público objetivo** | Jóvenes y adultos que quieren café fresco en casa u oficina, y pequeñas empresas de la zona |
| **Propuesta de valor** | Café tostado por pedido, con granos de pequeños productores y envío a todo Chile |
| **Objetivo de la página** | Mostrar el catálogo y convertir visitas en pedidos por WhatsApp |

## 2. Integrantes

> Completar con los nombres del equipo (6 estudiantes).

| Integrante | Aporte principal |
| --- | --- |
| Nombre 1 | |
| Nombre 2 | |
| Nombre 3 | |
| Nombre 4 | |
| Nombre 5 | |
| Nombre 6 | |

## 3. Estructura del proyecto

```
aromas-del-maule/
├── app.py                 # Aplicación Flask: instancia y ruta principal
├── requirements.txt       # Dependencias exactas del proyecto
├── .gitignore             # Archivos que Git debe ignorar (venv, __pycache__...)
├── README.md              # Esta documentación
├── templates/
│   └── index.html         # Vista principal (plantilla Jinja2)
└── static/
    ├── css/
    │   └── styles.css     # Estilos de la página
    ├── js/
    │   └── app.js         # Interacciones (filtros, carrito, formulario)
    └── img/
        └── logo.svg       # Logo del emprendimiento
```

## 4. Cómo ejecutar el proyecto en otro equipo

**Requisito:** tener instalado [Python 3.10 o superior](https://www.python.org/downloads/) y Git.

### Paso 1: clonar el repositorio

```bash
git clone https://github.com/USUARIO/aromas-del-maule.git
cd aromas-del-maule
```

### Paso 2: crear el entorno virtual `venv`

Un entorno virtual es una carpeta aislada donde se instalan las librerías del
proyecto, para no mezclarlas con las de otros proyectos ni con las del sistema.

```bash
# Windows
python -m venv venv

# macOS / Linux
python3 -m venv venv
```

### Paso 3: activar el entorno virtual

```bash
# Windows (PowerShell)
venv\Scripts\Activate.ps1

# Windows (CMD)
venv\Scripts\activate.bat

# macOS / Linux
source venv/bin/activate
```

Cuando está activo, verás `(venv)` al inicio de la línea de la terminal.

> Si PowerShell bloquea el script, ejecuta una vez:
> `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

### Paso 4: instalar las dependencias

```bash
pip install -r requirements.txt
```

Esto instala Flask y las librerías que necesita (Werkzeug, Jinja2, etc.).

### Paso 5: ejecutar la aplicación

```bash
python app.py
```

### Paso 6: abrir en el navegador

Entra a **http://127.0.0.1:5000**. Para detener el servidor presiona `Ctrl + C`.

Para salir del entorno virtual: `deactivate`.

## 5. Cómo se construyó (paso a paso)

Este es el proceso que siguió el equipo desde cero:

1. **Definir la idea comercial.** Se eligió un emprendimiento de café y se definió nombre, público, propuesta de valor y objetivo.
2. **Crear la carpeta del proyecto** `aromas-del-maule` (sin espacios).
3. **Crear el entorno virtual:** `python -m venv venv`.
4. **Activar el venv e instalar Flask:** `pip install flask`.
5. **Crear `app.py`:** se crea `app = Flask(__name__)` y la ruta `@app.route("/")` que devuelve `render_template("index.html", ...)`. Los datos del negocio, productos y beneficios viven en listas y diccionarios de Python y se envían a la vista.
6. **Crear la vista** `templates/index.html` con encabezado, propuesta de valor, beneficios, productos, llamada a la acción y contacto. Usa Jinja2 (`{% for %}`, `{{ variable }}`) para generar las tarjetas desde los datos de Python.
7. **Crear los recursos estáticos** `static/css/styles.css` y `static/js/app.js`, enlazados con `url_for('static', filename=...)`.
8. **Diseñar e incorporar interacción** con CSS (paleta café/crema, diseño responsive, animaciones) y JavaScript (ver sección 6).
9. **Probar localmente:** se revisó la ruta `/`, los archivos estáticos, los enlaces y el comportamiento en celular y computador.
10. **Generar `requirements.txt`** desde el venv activo: `pip freeze > requirements.txt`.
11. **Crear `.gitignore`** para no subir `venv/`, `__pycache__/` ni archivos temporales.
12. **Publicar en GitHub** (ver sección 7).

## 6. Explicación del código

### `app.py`
- `Flask(__name__)` crea la aplicación y le indica dónde buscar `templates` y `static`.
- `@app.route("/")` asocia la URL principal con la función `index()`.
- `render_template("index.html", negocio=..., productos=..., beneficios=...)` toma la plantilla HTML y le pasa los datos de Python.
- `if __name__ == "__main__": app.run(debug=True)` inicia el servidor de desarrollo al ejecutar `python app.py`.

### `templates/index.html`
- Usa `{{ url_for('static', filename='css/styles.css') }}` para enlazar CSS, JS e imagen sin escribir rutas a mano.
- Los productos se generan con un ciclo `{% for p in productos %}`, así agregar un producto solo requiere editar la lista en `app.py`.

### `static/css/styles.css`
- Variables CSS (`:root`) para la paleta de colores.
- Diseño con Flexbox y Grid; adaptable a celulares mediante `@media`.

### `static/js/app.js`
- **Filtro de productos:** muestra u oculta tarjetas según la categoría elegida.
- **Carrito de compras:** agregar, sumar, restar y vaciar productos; calcula el total y genera un enlace de pedido por WhatsApp con el detalle.
- **Menú móvil:** botón hamburguesa para pantallas pequeñas.
- **Validación del formulario de contacto:** revisa nombre, correo y largo del mensaje antes de "enviar".

## 7. Publicar en GitHub

```bash
git init
git add .
git commit -m "Primera versión de Aromas del Maule"
git branch -M main
git remote add origin https://github.com/USUARIO/aromas-del-maule.git
git push -u origin main
```

Antes de subir, verifica con `git status` que **no aparezca la carpeta `venv/`**.
Para que se vea el trabajo colaborativo, cada integrante debe hacer sus propios
commits (`git pull` antes de trabajar, `git push` al terminar) y el docente debe
tener acceso al repositorio (público o con invitación).

## 8. Tecnologías

- Python 3 · Flask 3.1 · Jinja2
- HTML5 · CSS3 · JavaScript (sin librerías externas)
