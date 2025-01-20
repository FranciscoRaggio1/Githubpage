// Optimized JavaScript for the Image Filter App
const imageUpload = document.getElementById('image-upload');
const preview = document.getElementById('preview');
const filterButtons = document.querySelectorAll('.filter-btn');
const downloadButton = document.getElementById('download-btn');

let currentFilter = 'none';

// Handle image upload
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
            preview.style.filter = currentFilter;
        };
        reader.readAsDataURL(file);
    }
});

// Apply selected filter
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentFilter = button.dataset.filter;
        preview.style.filter = currentFilter === 'none' ? '' : currentFilter;
    });
});

// Download filtered image
downloadButton.addEventListener('click', () => {
    if (!preview.src) {
        alert('Please upload and apply a filter to an image first.');
        return;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;

        // Apply CSS filter to the canvas context
        context.filter = getComputedStyle(preview).filter;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        const link = document.createElement('a');
        link.download = 'filtered-image.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    image.src = preview.src;
});
