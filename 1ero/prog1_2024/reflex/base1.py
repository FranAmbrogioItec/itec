import reflex as rx

def index():
    page = rx.box (
        rx.heading("Titulo"),
        rx.divider(),
        rx.text("Nombre"),
        rx.input(),



        rx.text("Lo ultimo de la pagina"),
        background = "green",
    )
    
    return page

app = rx.App()
app.add_page(index)