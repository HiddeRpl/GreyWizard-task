document.addEventListener('DOMContentLoaded', function () {
    const invokers = document.querySelectorAll('.accordionTitle');
    const contents = document.querySelectorAll('.accordionContent');
    invokers.forEach(header => {
        header.addEventListener('click', function () {
            const target = this.dataset.target;
            const targetEl = document.getElementById(target);
            closeAll();
            this.classList.add('open');
            targetEl.classList.add('open');
        })
    });

    function closeAll() {
        invokers.forEach(header => {
            header.classList.remove('open');
        });
        contents.forEach(content => {
            content.classList.remove('open');
        });
    }
});