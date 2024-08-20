document.getElementById('formulario').addEventListener('submit', handleAddBack);

async function handleAddBack(e){
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const data = {
        name,
        phone,
        service,
        date,
        time
    };

    
    console.log(data);
    
    const api = "http://localhost:3000"
    
    try{
        const response = await fetch(`${api}/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        if(response.ok){
            
            const result = await response.json();
            alert(JSON.stringify(result))
            document.getElementById('confirmarmsg').textContent = 'Agendamento confirmado!';
        }else{
            console.log('erro ao agendar')
        }
    }catch(err){
        console.log(err)
    }
}

