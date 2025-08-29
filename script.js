document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    const grid = document.getElementById('portfolio-grid');
    const filters = document.getElementById('filters');

    // --- Mouse Follow Glow Effect ---
    window.addEventListener('mousemove', e => {
        // Use requestAnimationFrame for performance
        window.requestAnimationFrame(() => {
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        });
    });

    // --- Theme Switching Logic ---
    const applyTheme = (theme) => {
        if (theme === 'light') {
            body.classList.add('light-theme');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            body.classList.remove('light-theme');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });

    // --- Portfolio Filtering Logic (Only run on the main page) ---
    if (grid && filters) {
        const portfolioItems = [
            { category: 'short-form', title: 'Viral Social Media Clip', video: 'https://cdn.pixabay.com/video/2023/01/18/146820-791333615_tiny.mp4', poster: 'https://placehold.co/600x400/a855f7/ffffff?text=Short+Form' },
            { category: 'gaming', title: 'Epic Gameplay Montage', video: 'https://cdn.pixabay.com/video/2022/09/23/130354-753063313_tiny.mp4', poster: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Gaming' },
            { category: 'ecommerce', title: 'Luxury Product Ad', video: 'https://cdn.pixabay.com/video/2023/05/29/164245-830248285_tiny.mp4', poster: 'https://placehold.co/600x400/10b981/ffffff?text=eCommerce' },
            { category: 'documentary', title: 'Scenic Mountain Views', video: 'https://cdn.pixabay.com/video/2020/08/13/49112-449553142_tiny.mp4', poster: 'https://placehold.co/600x400/3b82f6/ffffff?text=Documentary' },
            { category: 'anime', title: 'Abstract Animation', video: 'https://cdn.pixabay.com/video/2022/10/25/134942-764952639_tiny.mp4', poster: 'https://placehold.co/600x400/f97316/ffffff?text=Anime' },
            { category: 'short-form', title: 'Quick Recipe Reel', video: 'https://cdn.pixabay.com/video/2022/03/15/109018-688950153_tiny.mp4', poster: 'https://placehold.co/600x400/a855f7/ffffff?text=Short+Form' },
            { category: 'gaming', title: 'Strategy Game Timelapse', video: 'https://cdn.pixabay.com/video/2019/09/11/27951-361833111_tiny.mp4', poster: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Gaming' },
            { category: 'ecommerce', title: 'Skincare Product Launch', video: 'https://cdn.pixabay.com/video/2022/10/05/133120-757342393_tiny.mp4', poster: 'https://placehold.co/600x400/10b981/ffffff?text=eCommerce' },
            { category: 'anime', title: 'Flowing Lines Animation', video: 'https://cdn.pixabay.com/video/2022/10/25/134944-764952678_tiny.mp4', poster: 'https://placehold.co/600x400/f97316/ffffff?text=Anime' },
        ];

        const setupVideoHover = () => {
            const videoCards = document.querySelectorAll('.video-card');
            videoCards.forEach(card => {
                const video = card.querySelector('video');
                let playTimeout;
                if (video) {
                    card.addEventListener('mouseenter', () => {
                        playTimeout = setTimeout(() => {
                            video.play().catch(e => {
                                if (e.name !== 'AbortError') console.error("Video play failed:", e);
                            });
                        }, 200);
                    });
                    card.addEventListener('mouseleave', () => {
                        clearTimeout(playTimeout);
                        video.pause();
                        video.currentTime = 0;
                    });
                }
            });
        };

        const renderPortfolio = (filter = 'all') => {
            grid.innerHTML = '';
            const filteredItems = filter === 'all' 
                ? portfolioItems 
                : portfolioItems.filter(item => item.category === filter);
            filteredItems.forEach(item => {
                const card = `
                    <div class="video-card bg-gray-800 rounded-lg overflow-hidden shadow-lg" data-category="${item.category}">
                        <div class="relative">
                            <video loop muted playsinline poster="${item.poster}">
                                <source src="${item.video}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div class="p-5">
                            <h4 class="font-bold text-lg mb-1">${item.title}</h4>
                            <p class="text-sm text-gray-400 capitalize">${item.category.replace('-', ' ')}</p>
                        </div>
                    </div>
                `;
                grid.insertAdjacentHTML('beforeend', card);
            });
            setupVideoHover();
        };

        filters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filters.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                renderPortfolio(e.target.getAttribute('data-filter'));
            }
        });

        renderPortfolio();
    }
});

