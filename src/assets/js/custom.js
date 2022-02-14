let uploader = {
  file() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('jsFile')) {
        let uploader = e.target;

        let input = uploader.closest('div').querySelector('input');

        input.click();

        input.addEventListener('change', (e) => {
          uploader.querySelector('img').src = URL.createObjectURL(e.target.files[0]);
        });
      }
    })
  },
}

uploader.file();
