// Raycaster for mouse interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject = null;
let originalColor = null;
let originalScale = null;

// Info panel element
const infoPanel = document.getElementById('info-panel');

function updateInteraction(camera, scene, product) {
    // Update mouse position
    raycaster.setFromCamera(mouse, camera);

    // Find intersections
    const intersects = raycaster.intersectObjects(product.children, true);

    // Handle hover and click
    if (intersects.length > 0) {
        const object = intersects[0].object;
        
        // Hover effect
        if (selectedObject !== object) {
            // Reset previous object
            if (selectedObject) {
                selectedObject.material.color.setHex(originalColor);
                selectedObject.scale.copy(originalScale);
            }
            
            // Set new object
            selectedObject = object;
            originalColor = object.material.color.getHex();
            originalScale = object.scale.clone();
            
            // Highlight effect
            object.material.color.setHex(0x00ff00);
            object.scale.multiplyScalar(1.1);
            
            // Show info panel
            infoPanel.style.display = 'block';
            infoPanel.textContent = object.name;
        }
    } else {
        // Reset when not hovering over any object
        if (selectedObject) {
            selectedObject.material.color.setHex(originalColor);
            selectedObject.scale.copy(originalScale);
            selectedObject = null;
            infoPanel.style.display = 'none';
        }
    }
}

// Mouse move event
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Click event
window.addEventListener('click', () => {
    if (selectedObject) {
        // Click effect
        selectedObject.material.color.setHex(0xff0000);
        setTimeout(() => {
            if (selectedObject) {
                selectedObject.material.color.setHex(0x00ff00);
            }
        }, 200);
    }
}); 