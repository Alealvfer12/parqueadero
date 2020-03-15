<template>
  <div>
    <br />
    <b-container class="bv-example-row mb-3" >
      <b-row cols="1" >
        <b-col>
          <b-card title="Parqueadero">
            <b-card-text>A continuación ingrese los datos de su vehiculo: </b-card-text>

            <b-form action="javascript:void(0)" @submit="crearVehiculo()">
              <b-form-group>

                <b-form-select v-model="vehiculo.tipo" :options="opciones_tipo" required></b-form-select>
              <br/> 
              </b-form-group>

              <b-form-group label="Placa" label-for="placa">
                <b-form-input
                  class="form-control"
                  v-model="vehiculo.placa"
                  id="placa"
                  placeholder="Ingrese la placa de su vehiculo" required
                  
                />
              </b-form-group>

              <b-form-group label="Color" label-for="color" >
                <b-form-input
                  class="form-control"
                  v-model="vehiculo.color"
                  id="color"
                  placeholder="Ingrese color de su vehiculo" required
                />
              </b-form-group>

              <b-form-group label="Marca" label-for="marca">
                <b-form-input
                  class="form-control"
                  v-model="vehiculo.marca"
                  id="marca"
                  placeholder="Ingrese la marca de su vehiculo" required
                />
              </b-form-group>

              <b-form-group label="Ciudad" label-for="ciudadDeLaPlaca">
                <b-form-input
                  class="form-control"
                  v-model="vehiculo.ciudadDeLaPlaca"
                  id="ciudadDeLaPlaca"
                  placeholder="Ingrese la ciudad de la placa de su vehiculo" required
                />
              </b-form-group>

              <b-form-group label="Fecha" label-for="FechaDeIngreso">
                <b-form-input
                  type = text            
                  class="form-control"
                  v-model="vehiculo.FechaDeIngreso"
                  id="fechaDeIngreso"
                  placeholder="AAAA-MM-DD" required
                />
              </b-form-group>

              <b-form-group label="Hora" label-for="HoraDeIngreso">
                <b-form-input
                  type = text
                  class="form-control"
                  v-model="vehiculo.HoraDeIngreso"
                  id="horaDeIngreso"
                  placeholder="HH:MM" required
                />
              </b-form-group>

              <b-button type="submit" variant="danger" v-if="!enEdicion">Crear Vehiculo</b-button>
              <b-button @click="actualizarVehiculo()" variant="primary" v-else>Actualizar Vehiculo</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col>

            <br> <br> <br> <br> <br>

          <b-table striped hover :items="lista_vehiculo">
            <template v-slot:cell(acciones)="row">
              <b-button size="sm" @click="cargarVehiculo(row)" class="mr-2" variant="warning">Modificar</b-button>
              <br>
              <br>
              <b-button size="sm" @click="eliminarVehiculo(row)" class="mr-2" variant="danger">Eliminar</b-button>
              <br>
              <br>
              <b-button size="sm" @click="makeToast(row)" class="mr-2" variant="warning">Dar Salida</b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script src="../assets/vehiculo.js"/>