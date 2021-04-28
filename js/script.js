window.addEventListener('DOMContentLoaded', () => {

    // modal
    const modal = document.querySelector('.modal'),
        modalTrigger = document.querySelectorAll('[data-modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    
    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    modalCloseBtn.addEventListener('click', closeModal);    

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown' , (e) => {
        if (e.code == 'Escape') {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    // forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg',
        success: 'Thank you, we\'ll soon contact you',
        failure: 'Some problems, try later'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('summit', (e) => {
            e.preventDefault();
            
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 3px auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                   'Content-type': 'application/json' 
                },
                body: JSON.stringify(object)
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                show
            })
        });
    }
});