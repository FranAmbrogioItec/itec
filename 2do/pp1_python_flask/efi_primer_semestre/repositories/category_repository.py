from app import db
from models.models import Category

class CategoryRepository:
    
    @staticmethod
    def get_all():
        """Devuelve todas las categorías."""
        return Category.query.all()

    @staticmethod
    def get_by_id(category_id):
        """Busca una categoría por su ID."""
        return Category.query.get(category_id)
        
    @staticmethod
    def get_by_name(name):
        """Busca una categoría por su nombre."""
        return Category.query.filter_by(name=name).first()

    def create_category(self, name):
        """Crea una nueva categoría."""
        if self.get_by_name(name):
            raise ValueError("La categoría ya existe.")
            
        new_category = Category(name=name)
        db.session.add(new_category)
        db.session.commit()
        return new_category
    
    @staticmethod
    def update_category(category, name):
        """Actualiza el nombre de una categoría existente."""
        category.name = name
        db.session.commit()
        return category

    @staticmethod
    def delete_category(category):
        """Elimina una categoría."""
        db.session.delete(category)
        db.session.commit()

    def count_all(self):
        """Cuenta todas las categorías en la base de datos."""
        return Category.query.count()
    