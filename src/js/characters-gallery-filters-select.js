
const select = document.querySelector('.input-white');
const option = select.options[select.selectedIndex];
let dataForm = JSON.parse(localStorage.getItem('form')) || {};
reloadPage();

select.addEventListener('change', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  console.log({ currentOption: option.value });

  if (option.value === '') {
    return alert('Please choose any option!');
  }

  dataForm[select.id] = option.value;
  localStorage.setItem('form', JSON.stringify(dataForm));
  e.currentTarget.reset();
}

function reloadPage() {
  if (dataForm[select.id]) {
    select.value = dataForm[select.id];
  }
}
  
