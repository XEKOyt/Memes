fetch('files.json')
    .then(response => response.json())
    .then(files => {
        const gallery = document.querySelector('.gallery');

        files.forEach(item => {
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
            galleryItem.setAttribute('data-name', item.name);
            gallery.appendChild(galleryItem);

            galleryItem.addEventListener('click', () => openModal(item.url, item.name, extension));
        });

        function openModal(url, name, extension) {
            const modal = document.getElementById('media-modal');
            const modalVideo = document.getElementById('modal-video');
            const modalImage = document.getElementById('modal-image');

            const copyLinkBtn = document.getElementById('copy-link');
            copyLinkBtn.setAttribute('data-url', url);

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

        document.getElementById('close-modal').addEventListener('click', () => {
            const modal = document.getElementById('media-modal');
            modal.style.display = 'none';
            document.getElementById('modal-video').pause();
            document.getElementById('modal-video').currentTime = 0;
        });

        document.getElementById('copy-link').addEventListener('click', (event) => {
            const link = event.target.getAttribute('data-url');
            navigator.clipboard.writeText(link)
                .then(() => alert('Link copied to clipboard!'))
                .catch(err => alert('Failed to copy link!'));
        });
    })
    .catch(err => console.error('Error loading files.json:', err));
