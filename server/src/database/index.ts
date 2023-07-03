import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/kanbanApp', {
    autoIndex: true
}).then(() => {
    console.log('Conectado ao Banco de Dados');
}).catch(error => {
    console.log(error);
});