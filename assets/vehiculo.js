export default {
    data() {
        return {
            mensaje: "CRUD De Vehiculo",
            enEdicion: false,
            vehiculo: {
                tipo: "",
                placa: "",
                color: "",
                marca: "",
                ciudadDeLaPlaca: "",
                FechaDeIngreso: "",
                HoraDeIngreso: "",

                acciones: true
            },
            lista_vehiculo: [
                {
                    tipo: "Carro",
                    placa: "BWG-196",
                    color: "Negro",
                    marca: "Clio Renault",
                    ciudadDeLaPlaca: "Bogota",
                    FechaDeIngreso: "14/03/2020",
                    HoraDeIngreso: "12:10pm",
                    acciones: true
                }
            ],
            opciones_tipo: [
                { value: null, text: "Seleccione el tipo de vehiculo", disabled: true },
                { value: "Carro", text: "Carro" },
                { value: "Moto", text: "Moto" },
                { value: "Bicicleta", text: "Bicicleta" },
                { value: "Camion", text: "Camion" }
            ],
        };
    },
    methods: {
        crearVehiculo() {

          if (this.lista_vehiculo.findIndex(vehiculo => vehiculo.placa == this.vehiculo.placa) === -1 ){
              this.lista_vehiculo.push(this.vehiculo);
          }else{
              alert('repedita placa');
            } 

           
            this.vehiculo = {
                tipo: "",
                placa: "",
                color: "",
                marca: "",
                ciudadDeLaPlaca: "",
                FechaDeIngreso: "",
                HoraDeIngreso: "",
                acciones: true
            };
            this.saveLocalStorage();
        },
        eliminarVehiculo({ item }) {
            let posicion = this.lista_vehiculo.findIndex(
                vehiculo => vehiculo.placa == item.placa
            );
            this.lista_vehiculo.splice(posicion,1);
            this.saveLocalStorage();
            
            
        },
        cargarVehiculo({ item }) {
           
            let vehiculos = this.lista_vehiculo.find(
                vehiculo => vehiculo.placa == item.placa
            );
            this.enEdicion = true;
            this.vehiculo = Object.assign({}, vehiculos);
            this.saveLocalStorage();
        },
        actualizarVehiculo() {
            let posicion = this.lista_vehiculo.findIndex(
                vehiculo => vehiculo.placa == this.vehiculo.placa
            );
            this.lista_vehiculo.splice(posicion, 1, this.vehiculo);
            this.vehiculo = {
                tipo: "",
                placa: "",
                color: "",
                marca: "",
                ciudadDeLaPlaca: "",
                FechaDeIngreso: "",
                HoraDeIngreso: "",
                acciones: true
            };
            this.saveLocalStorage();
            this.enEdicion = false;

        },
        saveLocalStorage() {
            localStorage.setItem("vehiculo", JSON.stringify(this.lista_vehiculo));
        },
        getLocalStorage() {
            if (localStorage.getItem("vehiculo")) {
                this.lista_vehiculo = JSON.parse(localStorage.getItem("vehiculo"));
            }
        },
        calcular(item){
            if(item == "Carro"){
                return this.fechas * 8000;
            }else if(item == "Moto"){
                return this.fechas * 4000;
            }else if(item == "Bicicleta"){
                return this.fechas * 2000;
            }else{
                return this.fechas * 21000;
            }
        },
        
        makeToast( { item }, variant = null ){
            
            let vehiculos = this.lista_vehiculo.find(
                vehiculo => vehiculo.placa == item.placa
            );
            let fechaActual = new Date();
            let srt = vehiculos.FechaDeIngreso.split("-")
            let hur = vehiculos.HoraDeIngreso.split(":")
            let date = new Date(srt[0], (srt[1] - 1), srt[2], hur[0], hur[1]);
            var fechas = (fechaActual.getTime() - date.getTime())/(1000 * 3600);
            this.fechas = Math.round(fechas);
            this.enEdicion = true;
            this.vehiculo = Object.assign({}, vehiculos);
            this.saveLocalStorage();            
            this.$bvToast.toast('Tiempo que se demoro en el parqueadero :'+ this.fechas 
            + '  Precio que debe pagar:' + this.calcular(vehiculos.tipo), {
                tittle: 'Notificacion',
                variant: variant,
                solid: true         
            })
           
                this.saveLocalStorage();

        }
    }
};