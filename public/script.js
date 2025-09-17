// Asset Management System - JavaScript
class AssetManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.sidebarCollapsed = false;
        this.expandedKPI = null;
        this.mockAssets = this.generateMockAssets();
        this.filteredAssets = [...this.mockAssets];
        this.groupByCategory = false;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupSidebar();
        this.setupDashboard();
        this.setupCatalog();
        this.setupForm();
        this.setupImageUpload();
        this.loadAssets();
    }

    // Navigation System
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item[data-page]');
        const quickActions = document.querySelectorAll('[data-navigate]');
        
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                this.navigateTo(page);
            });
        });

        quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const page = action.dataset.navigate;
                this.navigateTo(page);
            });
        });
    }

    navigateTo(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(`page-${pageId}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        
        const activeNav = document.querySelector(`[data-page="${pageId}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }
        
        this.currentPage = pageId;
        
        // Trigger page-specific setup
        this.onPageChange(pageId);
    }

    onPageChange(pageId) {
        switch(pageId) {
            case 'catalogo':
                this.loadAssets();
                break;
            case 'cadastro':
                this.resetForm();
                break;
        }
    }

    // Sidebar Management
    setupSidebar() {
        const toggle = document.getElementById('sidebar-toggle');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');
        
        toggle.addEventListener('click', () => {
            this.sidebarCollapsed = !this.sidebarCollapsed;
            
            if (this.sidebarCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent.style.marginLeft = '4rem';
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.style.marginLeft = '16rem';
            }
            
            this.updateToggleIcon();
        });

        // Mobile handling
        if (window.innerWidth < 1024) {
            this.setupMobileNav();
        }
    }

    updateToggleIcon() {
        const toggle = document.getElementById('sidebar-toggle');
        const icon = toggle.querySelector('svg');
        
        if (this.sidebarCollapsed) {
            icon.innerHTML = `
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            `;
        } else {
            icon.innerHTML = `
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            `;
        }
    }

    setupMobileNav() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        const mainContent = document.getElementById('main-content');
        
        mainContent.style.marginLeft = '0';
        
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.add('hidden');
        });
    }

    // Dashboard Features
    setupDashboard() {
        const expandableCards = document.querySelectorAll('[data-expandable]');
        
        expandableCards.forEach(card => {
            card.addEventListener('click', () => {
                const expandId = card.dataset.expandable;
                const expandElement = document.getElementById(`expand-${expandId}`);
                
                if (this.expandedKPI === expandId) {
                    // Collapse
                    expandElement.classList.add('hidden');
                    this.expandedKPI = null;
                } else {
                    // Collapse others first
                    document.querySelectorAll('.kpi-expanded').forEach(el => {
                        el.classList.add('hidden');
                    });
                    
                    // Expand this one
                    expandElement.classList.remove('hidden');
                    this.expandedKPI = expandId;
                }
            });
        });
    }

    // Mock Data Generation
    generateMockAssets() {
        const categories = ['computadores', 'monitores', 'impressoras', 'cadeiras'];
        const statuses = ['livre', 'em_uso', 'assistencia', 'manutencao'];
        const brands = ['Dell', 'HP', 'Lenovo', 'Samsung', 'LG', 'Canon', 'Epson'];
        
        const assets = [];
        
        for (let i = 1; i <= 50; i++) {
            const category = categories[Math.floor(Math.random() * categories.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const brand = brands[Math.floor(Math.random() * brands.length)];
            
            assets.push({
                id: i,
                nome: `${brand} ${category.slice(0, -1)} ${String(i).padStart(3, '0')}`,
                categoria: category,
                serial: `SN${String(i).padStart(6, '0')}`,
                marca: brand,
                status: status,
                ultimoMovimento: this.getRandomDate(),
                localizacao: ['Administrativo', 'TI', 'Vendas', 'RH'][Math.floor(Math.random() * 4)],
                imagem: `https://picsum.photos/300/200?random=${i}`
            });
        }
        
        return assets;
    }

    getRandomDate() {
        const start = new Date(2024, 0, 1);
        const end = new Date();
        const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
        return new Date(randomTime).toLocaleDateString('pt-BR');
    }

    // Catalog Management
    setupCatalog() {
        const searchInput = document.getElementById('search-input');
        const categoryFilter = document.getElementById('category-filter');
        const statusFilter = document.getElementById('status-filter');
        const groupToggle = document.getElementById('group-toggle');
        
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterAssets());
        }
        
        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.filterAssets());
        }
        
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.filterAssets());
        }
        
        if (groupToggle) {
            groupToggle.addEventListener('click', () => {
                this.groupByCategory = !this.groupByCategory;
                groupToggle.classList.toggle('active', this.groupByCategory);
                this.loadAssets();
            });
        }
    }

    filterAssets() {
        const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
        const categoryFilter = document.getElementById('category-filter')?.value || '';
        const statusFilter = document.getElementById('status-filter')?.value || '';
        
        this.filteredAssets = this.mockAssets.filter(asset => {
            const matchesSearch = asset.nome.toLowerCase().includes(searchTerm) ||
                                asset.serial.toLowerCase().includes(searchTerm) ||
                                asset.categoria.toLowerCase().includes(searchTerm);
            
            const matchesCategory = !categoryFilter || asset.categoria === categoryFilter;
            const matchesStatus = !statusFilter || asset.status === statusFilter;
            
            return matchesSearch && matchesCategory && matchesStatus;
        });
        
        this.loadAssets();
    }

    loadAssets() {
        const container = document.getElementById('assets-container');
        const noResults = document.getElementById('no-results');
        
        if (!container) return;
        
        if (this.filteredAssets.length === 0) {
            container.innerHTML = '';
            noResults?.classList.remove('hidden');
            return;
        }
        
        noResults?.classList.add('hidden');
        
        if (this.groupByCategory) {
            this.renderGroupedAssets(container);
        } else {
            this.renderAssetGrid(container);
        }
    }

    renderAssetGrid(container) {
        container.innerHTML = this.filteredAssets.map(asset => this.createAssetCard(asset)).join('');
    }

    renderGroupedAssets(container) {
        const grouped = this.filteredAssets.reduce((acc, asset) => {
            if (!acc[asset.categoria]) acc[asset.categoria] = [];
            acc[asset.categoria].push(asset);
            return acc;
        }, {});
        
        let html = '';
        Object.entries(grouped).forEach(([category, assets]) => {
            html += `
                <div class="category-section">
                    <h3 class="category-title">${this.formatCategoryName(category)} (${assets.length})</h3>
                    <div class="assets-grid">
                        ${assets.map(asset => this.createAssetCard(asset)).join('')}
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }

    createAssetCard(asset) {
        return `
            <div class="asset-card card-hover">
                <img src="${asset.imagem}" alt="${asset.nome}" class="asset-image" loading="lazy">
                
                <div class="asset-header">
                    <div>
                        <h3 class="asset-title">${asset.nome}</h3>
                        <p class="asset-category">${this.formatCategoryName(asset.categoria)}</p>
                    </div>
                    <span class="status-badge status-${asset.status.replace('_', '-')}">${this.formatStatus(asset.status)}</span>
                </div>
                
                <div class="asset-details">
                    <div class="asset-detail">
                        <span class="asset-label">Serial:</span>
                        <span>${asset.serial}</span>
                    </div>
                    <div class="asset-detail">
                        <span class="asset-label">Localização:</span>
                        <span>${asset.localizacao}</span>
                    </div>
                    <div class="asset-detail">
                        <span class="asset-label">Último movimento:</span>
                        <span>${asset.ultimoMovimento}</span>
                    </div>
                </div>
                
                <div class="asset-actions">
                    <button class="asset-btn" onclick="assetManager.viewAsset(${asset.id})">Ver</button>
                    <button class="asset-btn" onclick="assetManager.editAsset(${asset.id})">Editar</button>
                    <button class="asset-btn" onclick="assetManager.linkAsset(${asset.id})">Vincular</button>
                </div>
            </div>
        `;
    }

    formatCategoryName(category) {
        const names = {
            'computadores': 'Computadores',
            'monitores': 'Monitores',
            'impressoras': 'Impressoras',
            'cadeiras': 'Cadeiras'
        };
        return names[category] || category;
    }

    formatStatus(status) {
        const statuses = {
            'livre': 'Livre',
            'em_uso': 'Em Uso',
            'assistencia': 'Assistência',
            'manutencao': 'Manutenção',
            'baixado': 'Baixado'
        };
        return statuses[status] || status;
    }

    // Asset Actions
    viewAsset(id) {
        this.showToast('Funcionalidade em desenvolvimento', 'Ver detalhes do ativo será implementado em breve.', 'info');
    }

    editAsset(id) {
        this.showToast('Funcionalidade em desenvolvimento', 'Edição de ativo será implementado em breve.', 'info');
    }

    linkAsset(id) {
        this.navigateTo('vincular');
    }

    // Form Management
    setupForm() {
        const form = document.getElementById('asset-form');
        
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }

    resetForm() {
        const form = document.getElementById('asset-form');
        if (form) {
            form.reset();
            
            // Reset image preview
            const imagePreview = document.getElementById('imagePreview');
            const uploadArea = document.getElementById('imageUploadArea');
            
            if (imagePreview) imagePreview.classList.add('hidden');
            if (uploadArea) uploadArea.style.display = 'block';
        }
    }

    async handleFormSubmit(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const submitText = document.getElementById('submitText');
        const submitLoader = document.getElementById('submitLoader');
        
        // Validation
        const nome = document.getElementById('nome').value.trim();
        const categoria = document.getElementById('categoria').value;
        
        if (!nome || !categoria) {
            this.showToast('Erro', 'Nome e categoria são obrigatórios.', 'error');
            return;
        }
        
        // Simulate loading
        submitBtn.disabled = true;
        submitText.classList.add('hidden');
        submitLoader.classList.remove('hidden');
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create new asset
            const formData = new FormData(e.target);
            const newAsset = {
                id: this.mockAssets.length + 1,
                nome: formData.get('nome') || nome,
                categoria: categoria,
                serial: formData.get('serial') || `SN${String(this.mockAssets.length + 1).padStart(6, '0')}`,
                marca: formData.get('marca') || 'Sem marca',
                status: formData.get('status') || 'livre',
                ultimoMovimento: new Date().toLocaleDateString('pt-BR'),
                localizacao: formData.get('localizacao') || 'Não definido',
                imagem: `https://picsum.photos/300/200?random=${this.mockAssets.length + 1}`
            };
            
            this.mockAssets.unshift(newAsset);
            this.filteredAssets = [...this.mockAssets];
            
            this.showToast('Sucesso!', 'Ativo cadastrado com sucesso.', 'success');
            
            // Reset form and navigate
            this.resetForm();
            setTimeout(() => {
                this.navigateTo('catalogo');
            }, 1500);
            
        } catch (error) {
            this.showToast('Erro', 'Erro ao cadastrar ativo. Tente novamente.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitText.classList.remove('hidden');
            submitLoader.classList.add('hidden');
        }
    }

    // Image Upload
    setupImageUpload() {
        const fileInput = document.getElementById('imageUpload');
        const uploadArea = document.getElementById('imageUploadArea');
        const removeBtn = document.getElementById('removeImage');
        
        if (!fileInput || !uploadArea) return;
        
        uploadArea.addEventListener('click', () => fileInput.click());
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'hsl(var(--primary))';
            uploadArea.style.backgroundColor = 'hsl(var(--primary) / 0.05)';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '';
            uploadArea.style.backgroundColor = '';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '';
            uploadArea.style.backgroundColor = '';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleImageFile(files[0]);
            }
        });
        
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleImageFile(e.target.files[0]);
            }
        });
        
        if (removeBtn) {
            removeBtn.addEventListener('click', () => this.removeImage());
        }
    }

    handleImageFile(file) {
        // Validate file
        if (!file.type.startsWith('image/')) {
            this.showToast('Erro', 'Apenas arquivos de imagem são permitidos.', 'error');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            this.showToast('Erro', 'Arquivo muito grande. Máximo 5MB.', 'error');
            return;
        }
        
        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const previewImage = document.getElementById('previewImage');
            const imagePreview = document.getElementById('imagePreview');
            const uploadArea = document.getElementById('imageUploadArea');
            
            if (previewImage && imagePreview && uploadArea) {
                previewImage.src = e.target.result;
                imagePreview.classList.remove('hidden');
                uploadArea.style.display = 'none';
            }
        };
        reader.readAsDataURL(file);
    }

    removeImage() {
        const fileInput = document.getElementById('imageUpload');
        const imagePreview = document.getElementById('imagePreview');
        const uploadArea = document.getElementById('imageUploadArea');
        
        if (fileInput) fileInput.value = '';
        if (imagePreview) imagePreview.classList.add('hidden');
        if (uploadArea) uploadArea.style.display = 'block';
    }

    // Toast Notifications
    showToast(title, description, type = 'success') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-title">${title}</div>
            <div class="toast-description">${description}</div>
        `;
        
        container.appendChild(toast);
        
        // Auto remove
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease-out forwards';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }
}

// Initialize the application
const assetManager = new AssetManager();

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.add('hidden');
    }
});