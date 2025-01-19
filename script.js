const imageUpload = document.getElementById('image-upload');
        const preview = document.getElementById('preview');
        const filterButtons = document.querySelectorAll('.filter-btn');

        imageUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    preview.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });

        filterButtons.forEach((button) => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                preview.style.filter = filter;
            });
        });