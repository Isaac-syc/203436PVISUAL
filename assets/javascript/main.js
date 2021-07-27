var con;


function login() {   
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;


    if (username == 'admin' && password == '123456') {

        if (localStorage.getItem('host') == null) {
            location.href = '../views/index.html';  
        }else{
            process.env.host = localStorage.getItem('host');
            process.env.user = localStorage.getItem('user');
            process.env.password = localStorage.getItem('password');
            process.env.database = localStorage.getItem('database');
            process.env.port = localStorage.getItem('port');
            location.href = '../views/tabla.html';
        }

    }else{
        window.alert("Credenciales incorrectas");
    }
    
}

function loginDB() {
    con = require('./../assets/javascript/connect');
    
    
    setTimeout(function(){
        if (localStorage.getItem('host') != null) {
            location.href = '../views/tabla.html';
        }
    }, 5000);

}


function userStore() {
    con = require('./../assets/javascript/connect');
    const name = document.getElementById('name').value;
    const apPaterno = document.getElementById('apPaterno').value;
    const apMaterno = document.getElementById('apMaterno').value;
    const age = document.getElementById('age').value;
    $queryInsert = `INSERT INTO persona(nombre, ap_paterno, ap_materno, edad) VALUES ("${name}","${apPaterno}","${apMaterno}","${age}")`;
    con.query($queryInsert, function (err, rows, fields) {

        if (err) {
            console.log('Error Query');
            console.log(err);
            return;
        }

        console.log("Query exitoso", rows);
    });

    con.end(function () {
        console.log('Conexion finalizada');
    }); 
}

function selectData() {
    if (localStorage.getItem('host') == null) {
        return;
    }

    con = require('./../assets/javascript/connect');
    var rHtml = "";
    var rHtml2 = "";
    var rHtml3 = "";
    var rHtml4 = "";

    var conta = 0;
    $querySelect = `SELECT * FROM persona`;
    con.query($querySelect, function (err, rows, fields) {

        if (err) {
            console.log('Error Query');
            console.log(err);
            return;
        }

        rows.forEach(row => {
            rHtml += "<input class='input-custom input is-primary' disabled type='text' placeholder='"+ row.nombre +"' style='top: " + conta + "px'>";
            rHtml2 += "<input class='input-custom input is-primary' disabled type='text' placeholder='"+ row.ap_paterno +"' style='top: " + conta + "px'> ";
            rHtml3 += "<input class='input-custom input is-primary' disabled type='text' placeholder='"+ row.ap_materno +"' style='top: " + conta + "px'> ";
            rHtml4 += "<input class='input-custom input is-primary' disabled type='text' placeholder='"+ row.edad +"' style='top: " + conta + "px'> ";
            
            conta = conta + 15;
        });
        document.getElementById('renderHtml').innerHTML = rHtml;
        document.getElementById('render2Html').innerHTML = rHtml2;
        document.getElementById('render3Html').innerHTML = rHtml3;
        document.getElementById('render4Html').innerHTML = rHtml4;
        var offsetHeight = document.getElementById('column1').offsetHeight;
        document.getElementById('column1').style.height = '' + (offsetHeight + conta + 30) + 'px';
    });

}

window.onload = selectData();