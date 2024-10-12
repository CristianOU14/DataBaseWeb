import app from './app.js';

const Main = ()=>
    {
        app.listen(app.get('port'));
        console.log('La app escucha en el puerto: ',app.get('port'));
    }
Main();