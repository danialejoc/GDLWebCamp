(function() {
  "use strict";

  var regalo = document.getElementById('regalo');

  document.addEventListener("DOMContentLoaded", function(){

    // En la documentacion no hace referencia a usar un "if" pero es necesario para que no afecte el codigo

    // var mapa = document.getElementById('mapa');
    if (mapa) {
      var map = L.map('mapa').setView([11.755834, -70.182595], 15);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      L.marker([11.755834, -70.182595]).addTo(map)
          .bindPopup('GLDWebcamp')
          .openPopup();
    }   
        
    //Campo Datos de Usuario
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var email = document.getElementById('email');

    //Campos Pases
    var pase_dia = document.getElementById("pase_dia");
    var pase_dosdias = document.getElementById("pase_dosdias");
    var pase_completo = document.getElementById("pase_completo");

    //Botones y DIVs
    var calcular = document.getElementById('calcular');
    var errorDiv = document.getElementById('error');
    var botonRegistro = document.getElementById('btnRegistro');
    var lista_Productos = document.getElementById('lista_productos');
    var suma = document.getElementById('suma-total');

    //Extras
    var etiquetas = document.getElementById('etiquetas');
    var camisas = document.getElementById('camisa_evento');

    calcular.addEventListener("click", calcularMontos);
    pase_dia.addEventListener("blur", mostrarDias);
    pase_dosdias.addEventListener("blur", mostrarDias);
    pase_completo.addEventListener("blur", mostrarDias);

    nombre.addEventListener("blur", validarCampos);
    apellido.addEventListener("blur", validarCampos);
    email.addEventListener("blur", validarCampos);
    email.addEventListener('blur', validarMail);

    function validarCampos() {
      if(this.value == '') {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = "Este campo es obligatorio";
        this.style.border = '1px solid red';
        errorDiv.style.border = '1px solid red';
      } else {
        errorDiv.style.display = 'none';
        this.style.border = '1px solid #cccccc'; 
      }
    }

    // VALIDAR CORREO

    function validarMail() {
      if(this.value.indexOf("@") > -1) {
        errorDiv.style.display = 'none';
        this.style.border = '1px solid #cccccc'; 
      } else {
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = "Debe contener al menos una @";
        this.style.border = '1px solid red';
        errorDiv.style.border = '1px solid red';
      }
    }

    // CALCULAR MONTOS

    function calcularMontos(event){
      event.preventDefault();
      if(regalo.value === '') {
        alert("Debes Elegir un Regalo");
        regalo.focus();
      } else {
        
        var boletosDia = parseInt(pase_dia.value, 10) || 0,
            boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
            boletoCompleto = parseInt(pase_completo.value, 10) || 0,
            cantCamisas = parseInt(camisas.value, 10) || 0,
            cantEtiquetas = parseInt(etiquetas.value, 10) || 0;

        var totalPagar = (boletosDia * 30) + (boletos2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas *10) * .93) + (cantEtiquetas * 2);

        var listadoProductos = [];

        if(boletosDia >= 1) {
          listadoProductos.push(boletosDia + ' Pases por día');         
        }

        if(boletos2Dias >= 1) {
          listadoProductos.push(boletos2Dias + ' Pases por 2 días');         
        }

        if(boletoCompleto >= 1) {
          listadoProductos.push(boletoCompleto + ' Pases Completos');        
        }

        if(cantCamisas >= 1) {
          listadoProductos.push(cantCamisas + ' Camisas');        
        }

        if(cantEtiquetas >= 1) {
          listadoProductos.push(cantEtiquetas + ' Etiquetas');        
        }

        lista_Productos.style.display = "block";

        lista_Productos.innerHTML = '';
        for(var i = 0; i< listadoProductos.length; i++) {
          lista_productos.innerHTML += listadoProductos[i] + '</br>';
        }

        suma.innerHTML = "$" + totalPagar.toFixed(2);
        
      }

    }

    // MOSTRAR DIAS 

    function mostrarDias() {
      var boletosDia = parseInt(pase_dia.value, 10) || 0,
          boletos2Dias = parseInt(pase_dosdias.value, 10) || 0,
          boletoCompleto = parseInt(pase_completo.value, 10) || 0;

      var diasElegidos = [];

      if(boletosDia > 0) {
        diasElegidos.push('viernes');
      }
      if(boletos2Dias > 0) {
        diasElegidos.push('viernes', 'sabado');
      }
      if(boletoCompleto > 0) {
        diasElegidos.push('viernes', 'sabado', 'domingo');
      }

      for(var i=0; i < diasElegidos.length; i++) {
        document.getElementById(diasElegidos[i]).style.display = 'block';
      }
    }

  }); //DOM CONTENT LOADED

})();


// SECCION CON JQUERY

$(function() {

  // programa de conferencias
  $('.programa-evento .info-curso:first').show();
  $('.menu-programa a:first').addClass('activo');
  $('.menu-programa a').on('click', function() {
  $('.menu-programa a').removeClass('activo');

  $(this).addClass('activo');
  $('.ocultar').hide();
  var enlace = $(this).attr('href');
  $(enlace).fadeIn(1000);
  return false;
  });
});
  // $('.menu-programa a:first').addClass('activo');
    // $('.menu-programa a').removeClass('activo');
    // $(this).addClass('activo');

        // return false;