let autoRotate = true;
let rotationSpeed = 0.5; // degrees per frame
let lastTime = 0;

function updateCamera(camera, controls) {
    if (!autoRotate) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Calculate rotation angle based on time
    const rotationAngle = (rotationSpeed * deltaTime) / 1000;
    
    // Rotate camera around Y axis
    const radius = Math.sqrt(
        camera.position.x * camera.position.x +
        camera.position.z * camera.position.z
    );
    
    const currentAngle = Math.atan2(camera.position.z, camera.position.x);
    const newAngle = currentAngle + rotationAngle;
    
    camera.position.x = radius * Math.cos(newAngle);
    camera.position.z = radius * Math.sin(newAngle);
    
    // Look at origin
    camera.lookAt(0, 0, 0);

    // Rotate vase
    const vase = scene.getObjectByName("Vase")?.parent;
    if (vase && vase.userData.rotationSpeed) {
        vase.rotation.y += vase.userData.rotationSpeed;
    }
}

// Toggle auto-rotation when user interacts with controls
function setupAutoRotationToggle(controls) {
    controls.addEventListener('start', () => {
        autoRotate = false;
    });
    
    controls.addEventListener('end', () => {
        autoRotate = true;
    });
}

// Initialize auto-rotation toggle
setupAutoRotationToggle(controls); 