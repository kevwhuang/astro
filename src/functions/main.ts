document.querySelector('.hamburger')?.addEventListener('click', () => {
    for (const e of document.querySelectorAll('.link')) {
        e.classList.toggle('expanded');
    }
});
