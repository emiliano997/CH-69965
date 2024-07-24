console.log('Holi')
const formRegister = document.getElementById("formRegister");
formRegister.addEventListener('submit', async e => {

  e.preventDefault()

  const datos = {
    name: formRegister[0].value,
    email: formRegister[1].value,
    password: formRegister[2].value,
  }

  console.log(datos)

  const respuesta = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const content = await respuesta.json();

  const { accessToken } = content;

  if (accessToken) {
    localStorage.setItem("access_token", accessToken);
    location.href = '/'
  } else {
    location.href = '/register-error'
  }
})