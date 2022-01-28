window.addEventListener('load', () =>{

    //definimos las variables latitud y longitud
    let lon
    let lat
    //referenciamos los elementos del DOM para poder modificarlos
    let temperatura = document.getElementById('temperatura_valor');
    let temp_descrip = document.getElementById('temperatura_descripcion');
    let ubi = document.getElementById('ubicacion');
    let icon_anima = document.getElementById('icono_animado');
    let viento = document.getElementById('velocidad_viento');

    if(navigator.geolocation){
        //mostramos la ubicación
        navigator.geolocation.getCurrentPosition( posicion =>{
            //mostrando por consola la ubicacion
        // console.log(position.coords.latitude)
         lon = posicion.coords.longitude
         lat = posicion.coords.latitude

         //llamada a la api
         //const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ce12e315fc596df1ab75326c2ea8412c`
         //llamada por ciudad, además se aclaró el lenguaje y las unidades...
         const api_url = `https://api.openweathermap.org/data/2.5/weather?q=Argentina&lang=es&units=metric&appid=ce12e315fc596df1ab75326c2ea8412c`

         //console.log(api_url)
         //peticiones hacia la api, usando fetch...
         fetch(api_url)
         //promesas... Respuesta de la api.
         .then(response => {return response.json()})
         .then(data => {
             //obtener la temperatura por consola
            console.log(data.main.temp)
            let temp = Math.round(data.main.temp)
            //mostramos la variable que declaramos arriba con el id para mod el DOM
            temperatura.textContent = `${temp} °C`
            //mostramos por consola la descripcion
            console.log(data.weather[0].description)
            //lo almacenamos en una variable
            let desc = data.weather[0].description
            temp_descrip.textContent = desc.toUpperCase();
            //vamos por la ubicacion...
            console.log(data.name);
            let ubicacion = data.name
            ubi.textContent = ubicacion.toUpperCase();
            //viento... 
            console.log(data.wind.speed);
            let velocidad = data.wind.speed;
            viento.textContent = `${(velocidad)} m/s`;
            //íconos...
            console.log(data.weather[0].main)
            console.log(data)
            //vamos a mostrar iconos según la descripcion corta..
            switch (data.weather[0].main) {
                case 'Thunderstorm':
                    icon_anima.src='animated/thunder.svg'
                  console.log('TORMENTA');
                  break;
                case 'Drizzle':
                    icon_anima.src='animated/rainy-2.svg'
                  console.log('LLOVIZNA');
                  break;
                case 'Rain':
                    icon_anima.src='animated/rainy-7.svg'
                  console.log('LLUVIA');
                  break;
                case 'Snow':
                    icon_anima.src='animated/snowy-6.svg'
                    console.log('NIEVE');
                  break;                        
                case 'Clear':
                    icon_anima.src='animated/day.svg'
                    console.log('LIMPIO');
                  break;
                case 'Atmosphere':
                    icon_anima.src='animated/weather.svg'
                    console.log('ATMOSFERA');
                    break;  
                case 'Clouds':
                    icon_anima.src='animated/cloudy-day-1.svg'
                    console.log('NUBES');
                    break;  
                default:
                    icon_anima.src='animated/cloudy-day-1.svg'
                  console.log('por defecto');
            }
              })
        .catch(err => {
            //para capturar algun error
            console.log(err); })

        })
    }
})