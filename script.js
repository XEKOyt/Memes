fetch('files.json')
    .then(response => response.json())
    .then(data => {
        const gallery = document.querySelector('.gallery');
        data.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            
            const extension = item.url.split('.').pop().toLowerCase();
            let mediaElement;

            if (['mp4', 'webm', 'mov'].includes(extension)) {
                mediaElement = document.createElement('video');
                mediaElement.setAttribute('controls', '');
                const source = document.createElement('source');
                source.src = item.url;
                source.type = `video/${extension}`;
                mediaElement.appendChild(source);
            } else {
                mediaElement = document.createElement('img');
                mediaElement.src = item.url;
                mediaElement.alt = item.name;
            }

            galleryItem.appendChild(mediaElement);
            galleryItem.setAttribute('data-url', item.url);
            gallery.appendChild(galleryItem);

            galleryItem.addEventListener('click', () => {
                openModal(item.url);
            });
        });

        document.getElementById('close-modal').addEventListener('click', closeModal);
        document.getElementById('copy-link').addEventListener('click', copyLink);
    })
    .catch(error => console.error('Error loading files.json:', error));

function openModal(url) {
    const modal = document.getElementById('media-modal');
    const modalVideo = document.getElementById('modal-video');
    const modalImage = document.getElementById('modal-image');
    
    const extension = url.split('.').pop().toLowerCase();

    if (['mp4', 'webm', 'mov'].includes(extension)) {
        modalVideo.src = url;
        modalVideo.style.display = 'block';
        modalImage.style.display = 'none';
    } else {
        modalImage.src = url;
        modalImage.style.display = 'block';
        modalVideo.style.display = 'none';
    }

    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('media-modal');
    const modalVideo = document.getElementById('modal-video');
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
}

function copyLink(event) {
    const link = event.target.closest('.media-modal').querySelector('[data-url]').getAttribute('data-url');
    navigator.clipboard.writeText(link)
        .then(() => alert('Link copied to clipboard!'))
        .catch(err => alert('Failed to copy link!'));
}
