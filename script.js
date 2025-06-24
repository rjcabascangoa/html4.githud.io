

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const gallery = document.getElementById('gallery');
    const imageUrlInput = document.getElementById('imageUrl');
    const addButton = document.getElementById('addButton');
    const removeButton = document.getElementById('removeButton');
    
    let selectedImage = null;
    
    // Función para agregar una nueva imagen
    function addImage() {
        const imageUrl = imageUrlInput.value.trim();
        
        if (!imageUrl) {
            alert('Por favor ingresa una URL válida');
            return;
        }
        
        // Crear elemento de imagen
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Imagen de la galería';
        
        // Crear contenedor de la imagen
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item added';
        galleryItem.appendChild(img);
        
        // Manejar clic en la imagen
        galleryItem.addEventListener('click', function() {
            // Deseleccionar la imagen actualmente seleccionada
            if (selectedImage) {
                selectedImage.classList.remove('selected');
            }
            
            // Seleccionar la nueva imagen
            this.classList.add('selected');
            selectedImage = this;
        });
        
        // Agregar a la galería
        gallery.appendChild(galleryItem);
        
        // Limpiar el input
        imageUrlInput.value = '';
        
        // Enfocar el input para nueva entrada
        imageUrlInput.focus();
    }
    
    // Función para eliminar la imagen seleccionada
    function removeSelectedImage() {
        if (!selectedImage) {
            alert('No hay ninguna imagen seleccionada');
            return;
        }
        
        // Agregar clase de animación
        selectedImage.classList.add('removed');
        
        // Eliminar después de la animación
        setTimeout(() => {
            selectedImage.remove();
            selectedImage = null;
        }, 500);
    }
    
    // Event listeners
    addButton.addEventListener('click', addImage);
    
    imageUrlInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addImage();
        }
    });
    
    removeButton.addEventListener('click', removeSelectedImage);
});