from repositories.category_repository import CategoryRepository

class CategoryService:
    
    def __init__(self):
        self.repo = CategoryRepository()

    def get_all_categories(self):
        """Obtiene la lista de todas las categorías."""
        return self.repo.get_all()

    def create_new_category(self, data):
        """Crea una nueva categoría."""
        return self.repo.create_category(data['name'])
    
    def update_existing_category(self, category_id, data):
        """Actualiza una categoría existente."""
        category = self.repo.get_by_id(category_id)
        if not category:
            raise ValueError("Categoría no encontrada.")
            
        return self.repo.update_category(category, data['name'])

    def delete_category_by_id(self, category_id):
        """Elimina una categoría."""
        category = self.repo.get_by_id(category_id)
        if not category:
            raise ValueError("Categoría no encontrada.")
            
        self.repo.delete_category(category)