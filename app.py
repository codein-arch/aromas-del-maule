"""
Aromas del Maule - Aplicación web comercial hecha con Flask.

Este archivo crea la instancia de Flask y define la ruta principal ("/"),
que entrega los datos comerciales a la plantilla templates/index.html
usando render_template().
"""

from flask import Flask, render_template

# Instancia de la aplicación. Flask busca automáticamente las carpetas
# "templates" y "static" junto a este archivo.
app = Flask(__name__)

# Datos del negocio (en un proyecto real vendrían de una base de datos).
NEGOCIO = {
    "nombre": "Aromas del Maule",
    "eslogan": "Café de especialidad tostado en Linares, directo a tu taza.",
    "descripcion": (
        "Somos un emprendimiento local que selecciona granos de pequeños "
        "productores, los tuesta en lotes pequeños y los entrega frescos "
        "en tu casa u oficina."
    ),
    "whatsapp": "56900000000",  # Reemplazar por el número real del equipo
    "correo": "contacto@aromasdelmaule.cl",
    "ciudad": "Linares, Región del Maule",
}

PRODUCTOS = [
    {
        "id": 1,
        "nombre": "Bosque Nativo",
        "categoria": "grano",
        "descripcion": "Tueste medio, notas a chocolate y avellana. Ideal para el día a día.",
        "precio": 8990,
        "emoji": "☕",
    },
    {
        "id": 2,
        "nombre": "Amanecer Andino",
        "categoria": "grano",
        "descripcion": "Tueste claro, acidez brillante y notas cítricas. Perfecto para filtrado.",
        "precio": 10490,
        "emoji": "🌄",
    },
    {
        "id": 3,
        "nombre": "Noche Maulina",
        "categoria": "molido",
        "descripcion": "Tueste oscuro molido para cafetera italiana. Cuerpo intenso y dulce.",
        "precio": 8490,
        "emoji": "🌙",
    },
    {
        "id": 4,
        "nombre": "Suave Hogar",
        "categoria": "molido",
        "descripcion": "Molido medio, sabor equilibrado y suave. El favorito de la familia.",
        "precio": 7990,
        "emoji": "🏡",
    },
    {
        "id": 5,
        "nombre": "Kit Barista en Casa",
        "categoria": "accesorios",
        "descripcion": "Prensa francesa de 600 ml + 250 g de café a elección.",
        "precio": 21990,
        "emoji": "🫖",
    },
    {
        "id": 6,
        "nombre": "Taza Artesanal",
        "categoria": "accesorios",
        "descripcion": "Taza de cerámica hecha a mano por artesanos de la región.",
        "precio": 6990,
        "emoji": "🍵",
    },
]

BENEFICIOS = [
    {"titulo": "Frescura garantizada", "texto": "Tostamos por pedido; tu café llega en menos de 7 días desde el tueste.", "icono": "🔥"},
    {"titulo": "Comercio justo", "texto": "Pagamos precios justos a pequeños productores y trabajamos con trazabilidad.", "icono": "🤝"},
    {"titulo": "Envío a todo Chile", "texto": "Despachamos con seguimiento y embalaje que protege el aroma.", "icono": "📦"},
]


@app.route("/")
def index():
    """Ruta principal: renderiza la vista comercial con los datos del negocio."""
    return render_template(
        "index.html",
        negocio=NEGOCIO,
        productos=PRODUCTOS,
        beneficios=BENEFICIOS,
    )


if __name__ == "__main__":
    # debug=True recarga el servidor al guardar cambios (solo para desarrollo).
    app.run(debug=True)
