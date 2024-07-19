document.addEventListener('DOMContentLoaded', () => {
    const modalTrigger = document.getElementById('modal_add');
    const modal = document.getElementById('add-modal');
    const modalBackground = document.getElementById('modal-background');
    const closeModalBtn = modal ? modal.querySelector('button[data-modal-toggle="defaultModal"]') : null;

    if (modalTrigger && modal && modalBackground) {
        modalTrigger.addEventListener('click', () => {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            modalBackground.classList.remove('hidden');
        });

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
                modalBackground.classList.add('hidden');
            });
        }

        modalBackground.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            modalBackground.classList.add('hidden');
        });
    }
});
