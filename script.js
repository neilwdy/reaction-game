    // Game State Management
        const GameState = {
            IDLE: 'idle',
            WAITING: 'waiting',
            READY: 'ready',
            COMPLETE: 'complete'
        };

        class ReactionGame {
            constructor() {
                this.state = GameState.IDLE;
                this.startTime = null;
                this.timeoutId = null;
                this.attempts = 0;
                this.times = [];
                this.scene = null;
                this.camera = null;
                this.renderer = null;
                this.shapes = [];
                this.animationId = null;
                
                this.initThreeJS();
                this.initEventListeners();
                this.animate();
            }

            initThreeJS() {
                const canvas = document.getElementById('gameCanvas');
                const container = canvas.parentElement;
                
                // Scene setup
                this.scene = new THREE.Scene();
                this.scene.background = new THREE.Color(0x1E293B);
                
                // Camera
                this.camera = new THREE.PerspectiveCamera(
                    75,
                    container.clientWidth / container.clientHeight,
                    0.1,
                    1000
                );
                this.camera.position.z = 5;
                
                // Renderer
                this.renderer = new THREE.WebGLRenderer({ 
                    canvas: canvas,
                    antialias: true,
                    alpha: true
                });
                this.updateRendererSize();
                
                // Lighting
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
                this.scene.add(ambientLight);
                
                const pointLight1 = new THREE.PointLight(0x3B82F6, 1, 100);
                pointLight1.position.set(5, 5, 5);
                this.scene.add(pointLight1);
                
                const pointLight2 = new THREE.PointLight(0x10B981, 0.8, 100);
                pointLight2.position.set(-5, -5, 5);
                this.scene.add(pointLight2);
                
                // Create initial idle shapes
                this.createIdleShapes();
                
                // Handle window resize
                window.addEventListener('resize', () => this.updateRendererSize());
            }

            updateRendererSize() {
                const container = this.renderer.domElement.parentElement;
                const w = container.clientWidth;
                const h = container.clientHeight;
                
                this.camera.aspect = w / h;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(w, h);
            }

            createIdleShapes() {
                this.clearShapes();
                
                // Complex nested geometry structure
                const group = new THREE.Group();
                
                // Outer torus
                const torusGeom = new THREE.TorusGeometry(1.5, 0.2, 16, 100);
                const torusMat = new THREE.MeshPhongMaterial({ 
                    color: 0x3B82F6,
                    shininess: 100,
                    transparent: true,
                    opacity: 0.8
                });
                const torus = new THREE.Mesh(torusGeom, torusMat);
                group.add(torus);
                
                // Inner dodecahedron
                const dodecaGeom = new THREE.DodecahedronGeometry(0.8);
                const dodecaMat = new THREE.MeshPhongMaterial({ 
                    color: 0x8B5CF6,
                    shininess: 120,
                    wireframe: false
                });
                const dodeca = new THREE.Mesh(dodecaGeom, dodecaMat);
                group.add(dodeca);
                
                // Orbiting small spheres
                for (let i = 0; i < 8; i++) {
                    const sphereGeom = new THREE.SphereGeometry(0.15, 16, 16);
                    const sphereMat = new THREE.MeshPhongMaterial({ 
                        color: 0x10B981,
                        shininess: 100
                    });
                    const sphere = new THREE.Mesh(sphereGeom, sphereMat);
                    const angle = (i / 8) * Math.PI * 2;
                    sphere.position.x = Math.cos(angle) * 2;
                    sphere.position.y = Math.sin(angle) * 2;
                    group.add(sphere);
                }
                
                this.scene.add(group);
                this.shapes.push({ 
                    mesh: group, 
                    rotationSpeed: 0.01,
                    children: group.children 
                });
            }

            createWaitingShapes() {
                this.clearShapes();
                
                // Complex layered structure
                const group = new THREE.Group();
                
                // Outer wireframe sphere
                const sphereGeom = new THREE.IcosahedronGeometry(2, 1);
                const sphereMat = new THREE.MeshPhongMaterial({ 
                    color: 0xF59E0B,
                    wireframe: true,
                    transparent: true,
                    opacity: 0.6
                });
                const sphere = new THREE.Mesh(sphereGeom, sphereMat);
                group.add(sphere);
                
                // Middle octahedron
                const octaGeom = new THREE.OctahedronGeometry(1.2);
                const octaMat = new THREE.MeshPhongMaterial({ 
                    color: 0xF59E0B,
                    shininess: 80
                });
                const octa = new THREE.Mesh(octaGeom, octaMat);
                group.add(octa);
                
                // Inner tetrahedron
                const tetraGeom = new THREE.TetrahedronGeometry(0.7);
                const tetraMat = new THREE.MeshPhongMaterial({ 
                    color: 0xFBBF24,
                    shininess: 100
                });
                const tetra = new THREE.Mesh(tetraGeom, tetraMat);
                group.add(tetra);
                
                this.scene.add(group);
                this.shapes.push({ mesh: group, rotationSpeed: 0.02 });
            }

            createReadyShapes() {
                this.clearShapes();
                
                // Explosive complex arrangement
                const colors = [0x10B981, 0x3B82F6, 0x8B5CF6, 0xEC4899];
                
                // Create multiple complex groups
                for (let i = 0; i < 8; i++) {
                    const group = new THREE.Group();
                    
                    // Core shape
                    const coreGeom = new THREE.DodecahedronGeometry(0.4);
                    const coreMat = new THREE.MeshPhongMaterial({ 
                        color: colors[i % colors.length],
                        shininess: 100
                    });
                    const core = new THREE.Mesh(coreGeom, coreMat);
                    group.add(core);
                    
                    // Surrounding ring
                    const ringGeom = new THREE.TorusGeometry(0.6, 0.1, 8, 16);
                    const ringMat = new THREE.MeshPhongMaterial({ 
                        color: colors[(i + 1) % colors.length],
                        transparent: true,
                        opacity: 0.7
                    });
                    const ring = new THREE.Mesh(ringGeom, ringMat);
                    ring.rotation.x = Math.PI / 2;
                    group.add(ring);
                    
                    const angle = (i / 8) * Math.PI * 2;
                    const radius = 2.5;
                    group.position.x = Math.cos(angle) * radius;
                    group.position.y = Math.sin(angle) * radius;
                    
                    this.scene.add(group);
                    this.shapes.push({ 
                        mesh: group, 
                        rotationSpeed: 0.03 + Math.random() * 0.02,
                        orbitSpeed: 0.02,
                        orbitAngle: angle
                    });
                }
            }

            clearShapes() {
                this.shapes.forEach(shape => {
                    this.scene.remove(shape.mesh);
                    
                    // Handle groups with multiple children
                    if (shape.mesh.type === 'Group') {
                        shape.mesh.children.forEach(child => {
                            if (child.geometry) child.geometry.dispose();
                            if (child.material) {
                                if (Array.isArray(child.material)) {
                                    child.material.forEach(mat => mat.dispose());
                                } else {
                                    child.material.dispose();
                                }
                            }
                        });
                    } else {
                        // Handle single meshes
                        if (shape.mesh.geometry) shape.mesh.geometry.dispose();
                        if (shape.mesh.material) {
                            if (Array.isArray(shape.mesh.material)) {
                                shape.mesh.material.forEach(mat => mat.dispose());
                            } else {
                                shape.mesh.material.dispose();
                            }
                        }
                    }
                });
                this.shapes = [];
            }

            animate() {
                this.animationId = requestAnimationFrame(() => this.animate());
                
                // Animate shapes based on current state
                this.shapes.forEach((shape, idx) => {
                    shape.mesh.rotation.x += shape.rotationSpeed;
                    shape.mesh.rotation.y += shape.rotationSpeed;
                    
                    if (shape.orbitSpeed) {
                        const time = Date.now() * 0.001;
                        const angle = shape.orbitAngle + time * shape.orbitSpeed;
                        const radius = 2.5;
                        shape.mesh.position.x = Math.cos(angle) * radius;
                        shape.mesh.position.y = Math.sin(angle) * radius;
                    }
                    
                    // Animate nested children in idle state
                    if (shape.children) {
                        shape.children.forEach((child, childIdx) => {
                            if (child.geometry.type === 'SphereGeometry') {
                                const time = Date.now() * 0.001;
                                const angle = (childIdx / 8) * Math.PI * 2 + time * 0.5;
                                child.position.x = Math.cos(angle) * 2;
                                child.position.y = Math.sin(angle) * 2;
                            }
                        });
                    }
                });
                
                this.renderer.render(this.scene, this.camera);
            }

            initEventListeners() {
                document.getElementById('startBtn').addEventListener('click', () => this.startGame());
                document.getElementById('resetBtn').addEventListener('click', () => this.resetStats());
                document.getElementById('gameCanvas').addEventListener('click', () => this.handleCanvasClick());
            }

            startGame() {
                if (this.state !== GameState.IDLE) return;
                
                this.state = GameState.WAITING;
                this.hideError();
                this.updateUI();
                this.createWaitingShapes();
                
                // Random delay between 1-5 seconds
                const delay = 1000 + Math.random() * 4000;
                
                this.timeoutId = setTimeout(() => {
                    this.state = GameState.READY;
                    this.startTime = performance.now();
                    this.updateUI();
                    this.createReadyShapes();
                }, delay);
            }

            handleCanvasClick() {
                if (this.state === GameState.IDLE) {
                    // Start the game by clicking the canvas
                    this.startGame();
                } else if (this.state === GameState.WAITING) {
                    // False start
                    this.handleFalseStart();
                } else if (this.state === GameState.READY) {
                    // Valid reaction
                    this.handleReaction();
                }
            }

            handleFalseStart() {
                clearTimeout(this.timeoutId);
                this.state = GameState.COMPLETE;
                this.showError('⚠️ False Start! Wait for the visual change before clicking.');
                
                // Show false start message on canvas
                const statusDiv = document.getElementById('gameStatus');
                statusDiv.innerHTML = `
                    <div class="status-text error">Too Early!</div>
                    <div class="status-subtext" style="color: #EF4444; font-weight: 600;">Wait for the shapes to change</div>
                `;
                
                this.createIdleShapes();
                
                // Return to idle after showing message
                setTimeout(() => {
                    this.state = GameState.IDLE;
                    this.updateUI();
                }, 2000);
            }

            handleReaction() {
                const reactionTime = performance.now() - this.startTime;
                this.state = GameState.COMPLETE;
                
                this.attempts++;
                this.times.push(reactionTime);
                
                this.updateStats();
                this.displayResult(reactionTime);
                
                // Return to idle after showing result
                setTimeout(() => {
                    this.state = GameState.IDLE;
                    this.createIdleShapes();
                    this.updateUI();
                }, 2000);
            }

            getPerformanceRating(time) {
                // Performance benchmarks based on reaction time research
                if (time < 150) return { text: '🚀 Superhuman', color: '#EC4899' };
                if (time < 200) return { text: '⚡ Excellent', color: '#8B5CF6' };
                if (time < 250) return { text: '🎯 Great', color: '#10B981' };
                if (time < 300) return { text: '👍 Good', color: '#3B82F6' };
                if (time < 350) return { text: '✓ Average', color: '#F59E0B' };
                return { text: '🐌 Slow', color: '#EF4444' };
            }

            displayResult(time) {
                const statusDiv = document.getElementById('gameStatus');
                const msTime = Math.round(time);
                const rating = this.getPerformanceRating(time);
                
                statusDiv.innerHTML = `
                    <div class="status-text react">${msTime} ms</div>
                    <div class="status-subtext" style="color: ${rating.color}; font-weight: 600; font-size: 1.1rem;">${rating.text}</div>
                `;
            }

            updateStats() {
                const avg = this.times.reduce((a, b) => a + b, 0) / this.times.length;
                const best = Math.min(...this.times);
                const avgRating = this.getPerformanceRating(avg);
                
                document.getElementById('attempts').textContent = this.attempts;
                document.getElementById('average').textContent = `${Math.round(avg)} ms`;
                document.getElementById('best').textContent = `${Math.round(best)} ms`;
                
                const ratingEl = document.getElementById('rating');
                ratingEl.textContent = avgRating.text;
                ratingEl.style.color = avgRating.color;
            }

            resetStats() {
                if (this.state !== GameState.IDLE) {
                    this.showError('⚠️ Cannot reset while game is active');
                    return;
                }
                
                this.attempts = 0;
                this.times = [];
                
                document.getElementById('attempts').textContent = '0';
                document.getElementById('average').textContent = '-';
                document.getElementById('best').textContent = '-';
                document.getElementById('rating').textContent = '-';
                document.getElementById('rating').style.color = '#3B82F6';
                
                this.hideError();
            }

            updateUI() {
                const statusDiv = document.getElementById('gameStatus');
                const startBtn = document.getElementById('startBtn');
                
                switch(this.state) {
                    case GameState.IDLE:
                        statusDiv.innerHTML = `
                            <div class="status-text ready">Ready to Start</div>
                            <div class="status-subtext">Click here or the button to begin</div>
                        `;
                        startBtn.disabled = false;
                        startBtn.textContent = 'Start Game';
                        break;
                        
                    case GameState.WAITING:
                        statusDiv.innerHTML = `
                            <div class="status-text waiting">Wait...</div>
                            <div class="status-subtext">Get ready to react</div>
                        `;
                        startBtn.disabled = true;
                        break;
                        
                    case GameState.READY:
                        statusDiv.innerHTML = `
                            <div class="status-text react">CLICK NOW!</div>
                            <div class="status-subtext">React as fast as you can!</div>
                        `;
                        startBtn.disabled = true;
                        break;
                        
                    case GameState.COMPLETE:
                        startBtn.disabled = false;
                        startBtn.textContent = 'Play Again';
                        break;
                }
            }

            showError(message) {
                const errorDiv = document.getElementById('errorMessage');
                errorDiv.textContent = message;
                errorDiv.style.display = 'block';
            }

            hideError() {
                const errorDiv = document.getElementById('errorMessage');
                errorDiv.style.display = 'none';
            }

            destroy() {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId);
                }
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                }
                this.clearShapes();
                this.renderer.dispose();
            }
        }

        // Initialize game
        const game = new ReactionGame();

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            game.destroy();
        });