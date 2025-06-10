function createProduct() {
    // Create a group to hold all vase parts
    const vaseGroup = new THREE.Group();
    
    // Materials
    const vaseMaterial = new THREE.MeshStandardMaterial({
        color: 0x88ccff,  // Light blue color for the vase
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.9
    });

    const flowerMaterial = new THREE.MeshStandardMaterial({
        color: 0xff69b4,  // Pink color for the flower
        roughness: 0.5,
        metalness: 0.1
    });

    const stemMaterial = new THREE.MeshStandardMaterial({
        color: 0x228B22,  // Forest green for the stem
        roughness: 0.8,
        metalness: 0.1
    });

    // Vase body
    const vaseGeometry = new THREE.CylinderGeometry(1, 0.5, 2, 32);
    const vase = new THREE.Mesh(vaseGeometry, vaseMaterial);
    vase.castShadow = true;
    vase.receiveShadow = true;
    vase.name = "Vase";
    vaseGroup.add(vase);

    // Flower stem
    const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = 1.5;
    stem.castShadow = true;
    stem.receiveShadow = true;
    stem.name = "Stem";
    vaseGroup.add(stem);

    // Flower petals
    const petalGeometry = new THREE.ConeGeometry(0.3, 0.5, 5);
    for (let i = 0; i < 5; i++) {
        const petal = new THREE.Mesh(petalGeometry, flowerMaterial);
        petal.position.y = 2.3;
        petal.rotation.x = Math.PI / 2;
        petal.rotation.z = (i * Math.PI * 2) / 5;
        petal.castShadow = true;
        petal.receiveShadow = true;
        petal.name = `Petal ${i + 1}`;
        vaseGroup.add(petal);
    }

    // Flower center
    const centerGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const center = new THREE.Mesh(centerGeometry, new THREE.MeshStandardMaterial({
        color: 0xffd700,  // Gold color for the center
        roughness: 0.3,
        metalness: 0.8
    }));
    center.position.y = 2.3;
    center.castShadow = true;
    center.receiveShadow = true;
    center.name = "Flower Center";
    vaseGroup.add(center);

    // Add subtle rotation animation
    vaseGroup.userData.rotationSpeed = 0.005;

    // Center the vase at origin
    vaseGroup.position.y = 0;

    return vaseGroup;
} 