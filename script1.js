async function fetchAndDisplayAppointments() {
  const api = "http://localhost:3000"; // Ensure this URL is correct and points to your server

  try {
      const response = await fetch(`${api}/appointments`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
          const data = await response.json();
          // Assuming `data` is an array of appointments
          const appointmentList = document.getElementById('appointment-list');
          
          // Clear previous content
          appointmentList.innerHTML = '';

          // Create list items for each appointment
          data.forEach(appointment => {
              const listItem = document.createElement('li');
              listItem.innerHTML = `
                  <strong>Nome:</strong> ${appointment.name} <br>
                  <strong>Telefone:</strong> ${appointment.phone} <br>
                  <strong>Serviço:</strong> ${appointment.service} <br>
                  <strong>Data:</strong> ${appointment.date} <br>
                  <strong>Hora:</strong> ${appointment.time}
              `;
              appointmentList.appendChild(listItem);
          });
      } else {
          console.error('Erro ao obter agendamentos:', response.statusText);
      }
  } catch (err) {
      console.error('Erro ao fazer requisição:', err);
  }
}

fetchAndDisplayAppointments()