//funciones js para el modulo de categorias
//const urlApi = "http://localhost:8080";//colocar la url con el puerto

function listarCategorias(){
    validaToken();
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
    }
    fetch(urlApi+"/categorias",settings)
    .then(response => response.json())
    .then(function(data){
        
            var categorias = `
            <div class="p-3 mb-2 bg-light text-dark">
                    <h1 class="display-5"><i class="fa-solid fa-list"></i> Listado de categorias</h1>
                </div>
                  
                <a href="#" onclick="registerForm('true')" class="btn btn-outline-success"><i class="fa-solid fa-user-plus"></i></a>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Category name</th>
                        <th scope="col">Description category</th>
                        </tr>
                    </thead>
                    <tbody id="listar">`;
            for(const categoria of data){
                console.log(categoria.nombreca)
                categorias += `
                
                        <tr>
                            <th scope="row">${categoria.id}</th>
                            <td>${categoria.nombreca}</td>
                            <td>${categoria.descripcionca}</td>
                        </tr>
                    `;
                
            }
            categorias += `
            </tbody>
                </table>
            `;
            document.getElementById("datos").innerHTML = categorias;
    })
}

function registerForm(auth=false){
    cadena = `
            <div class="p-3 mb-2 bg-light text-dark">
                <h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Registrar Categoria</h1>
            </div>
              
            <form action="" method="post" id="myFormReg">
                <input type="hidden" name="id" id="id">
                <label for="nombreca" class="form-label">Category Name</label>
                <input type="text" class="form-control" name="nombreca" id="nombreca" required> <br>
                <label for="descripcionca"  class="form-label">Category Description</label>
                <input type="text" class="form-control" name="descripcionca" id="descripcionca" required> <br>
                <button type="button" class="btn btn-outline-info" onclick="crearCategoria('${auth}')">Agregar</button>
            </form>`;
            console.log(cadena);
            document.getElementById("contentModalPrueba").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalCategoria'))
            myModal.toggle();
}

async function crearCategoria(auth=false){
    var myForm = document.getElementById("myFormReg");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    console.log("data user ",jsonData);
    const request = await fetch(urlApi+"/categoria", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json())
    .then(function(respuesta){
        console.log("respuesta peticion", respuesta)
    });
    if(auth){
        listarCategorias();
    }
    alertas("Se ha registrado la categoria exitosamente!",1)
    document.getElementById("contentModalPrueba").innerHTML = '';
    var myModalEl = document.getElementById('modalCategoria')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function modalConfirmacion(texto,funcion){
    document.getElementById("contenidoConfirmacion").innerHTML = texto;
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacion'))
    myModal.toggle();
    var confirmar = document.getElementById("confirmar");
    confirmar.onclick = funcion;
}

function salir(){
    localStorage.clear();
    location.href = "index.html";
}

function validaToken(){
    if(localStorage.token == undefined){
        salir();
    }
}