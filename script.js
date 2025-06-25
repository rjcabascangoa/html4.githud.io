document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const gallery = document.getElementById('gallery');
    const imageUrlInput = document.getElementById('imageUrl');
    const addButton = document.getElementById('addButton');
    const removeButton = document.getElementById('removeButton');
    
    let selectedImage = null;
    let infoBox = null;
    
    // Crear cuadro de información si no existe
    function createInfoBox() {
        if (!infoBox) {
            infoBox = document.createElement('div');
            infoBox.className = 'image-info-box';
            document.body.appendChild(infoBox);
        }
    }
    
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
        
        // Crear elemento para mostrar la URL de origen
        const sourceInfo = document.createElement('div');
        sourceInfo.className = 'image-source';
        sourceInfo.textContent = `Fuente: ${imageUrl}`;
        sourceInfo.style.marginTop = '5px';
        sourceInfo.style.fontSize = '12px';
        sourceInfo.style.color = '#666';
        
        galleryItem.appendChild(img);
        galleryItem.appendChild(sourceInfo);
        
        // Manejar clic en la imagen
        galleryItem.addEventListener('click', function() {
            // Deseleccionar la imagen actualmente seleccionada
            if (selectedImage) {
                selectedImage.classList.remove('selected');
            }
            
            // Seleccionar la nueva imagen
            this.classList.add('selected');
            selectedImage = this;
            
            // Mostrar información de la imagen
            showImageInfo(imageUrl, img);
        });
        
        // Agregar a la galería
        gallery.appendChild(galleryItem);
        
        // Limpiar el input
        imageUrlInput.value = '';
        
        // Enfocar el input para nueva entrada
        imageUrlInput.focus();
    }
    
    // Función para mostrar información de la imagen
    function showImageInfo(url, imgElement) {
        createInfoBox();
        
        // Obtener posición de la imagen seleccionada
        const rect = selectedImage.getBoundingClientRect();
        
        // Configurar contenido y posición del cuadro de información
        infoBox.innerHTML = `
            <h4>Información de la Imagen</h4>
            <p><strong>URL:</strong> <span class="url-text">${url}</span></p>
            <p><strong>Dimensiones:</strong> ${imgElement.naturalWidth} × ${imgElement.naturalHeight} px</p>
            <p><strong>Fecha de adición:</strong> ${new Date().toLocaleString()}</p>
            <button class="copy-btn">Copiar URL</button>
        `;
        
        // Posicionar el cuadro junto a la imagen
        infoBox.style.display = 'block';
        infoBox.style.left = `${rect.right + 10}px`;
        infoBox.style.top = `${rect.top}px`;
        
        // Añadir evento al botón de copiar
        const copyBtn = infoBox.querySelector('.copy-btn');
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(url)
                .then(() => {
                    copyBtn.textContent = '¡Copiado!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copiar URL';
                    }, 2000);
                });
        });
    }
    
    // Función para eliminar la imagen seleccionada
    function removeSelectedImage() {
        if (!selectedImage) {
            alert('No hay ninguna imagen seleccionada');
            return;
        }
        
        // Ocultar cuadro de información
        if (infoBox) {
            infoBox.style.display = 'none';
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