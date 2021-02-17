<template>
  <div>
    <b-button v-b-modal.modal-1 class="btn btn-primary float-right">Add Provider Local</b-button>
    <b-modal id="modal-1" size="lg" title="Provider" :hide-footer="true">
      <form class="mt-3">
        <div>
          <b-card class="mt-2" title="Provider" aria-hidden="true">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" v-model="name" name="name" id="name" aria-describedby="emailHelp"
                         placeholder="Name">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="text" class="form-control" v-model="email" name="email" id="email" aria-describedby="emailHelp"
                         placeholder="Email">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone">Phone</label>
                  <input type="text" class="form-control" v-model="phone" name="phone" id="phone" aria-describedby="emailHelp"
                         placeholder="Phone">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="city">City</label>
                  <input type="text" class="form-control" v-model="city" name="city" id="city" aria-describedby="emailHelp"
                         placeholder="City">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="phone">State/Province</label>
                  <input type="text" class="form-control" v-model="state" name="state" id="state" aria-describedby="emailHelp"
                         placeholder="State">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="city">Country</label>
                  <input type="text" class="form-control" v-model="country" name="country" id="country" aria-describedby="emailHelp"
                         placeholder="Country">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-12 mt-1">
                <div v-if="errors.length" class="alert alert-danger alert-dismissible fade show">
                  <ul><li v-for="error in errors" :key="error" >
                    <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                    {{ error }}
                  </li><br></ul>
                </div>
                <div class="alert alert-success alert-dismissible fade show" v-if="success">
                  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                  {{ success }}
                </div>
              </div>
            </div>
          </b-card>
          <div class="row mt-1" v-if="this.name && this.email && this.phone && this.city && this.state && this.country">
            <div class="col-12">
              <div class="float-right">
                <!--              <button class="btn btn-primary" @click="addAppointment">Save</button>-->
                <input v-if="updateId === 0" class="btn btn-primary" @click="addProvider" type="button" value="Save">
                <input v-if="updateId !== 0" class="btn btn-primary" @click="updateProvider" type="button" value="Update">
              </div>
            </div>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal id="modal-2" size="lg" title="Provider" :hide-footer="true">
      <form class="mt-3">
        <div class="row" >
          <div class="col-md-6">
            <div class="form-group">
              <label>From Time</label>
              <div>
                <b-form-timepicker v-model="from_time" locale="en"></b-form-timepicker>
              </div>

            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label>To Time</label>
              <div>
                <b-form-timepicker v-model="to_time" locale="en"></b-form-timepicker>
              </div>

            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <b-form-group label="Days:" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selectedDays"
                :aria-describedby="ariaDescribedby"
                name="flavour-2"
                :options="daysList"
              >
              </b-form-checkbox-group>
            </b-form-group>
          </div>
        </div>
        <div class="row">
        <div class="col-md-12">
          <b-form-group label="Radios using options" v-slot="{ ariaDescribedby }">
          <b-form-radio-group
            id="radio-group-1"
            v-model="appLength"
            :options="optionsTime"
            :aria-describedby="ariaDescribedby"
            name="radio-options"
          ></b-form-radio-group>
        </b-form-group>
        </div>
      </div>
        <div class="row mt-1">
          <div class="col-12">
            <div class="float-right">
              <input class="btn btn-primary" @click="addCalender" type="button" value="Save">
            </div>
          </div>
        </div>
      </form>
    </b-modal>

  </div>
</template>
<script>
// import axios from 'axios'
import axios from 'axios'
// post
// https://app.evergenius.com/api/celendars/set-default-weekschedule
export default {
  name: 'AddAppointmentModel',
  components: {},
  data () {
    return {
      apiKey: '',
      appLength: [],
      optionsTime: [
        {text: '30 Min', value: '30'},
        {text: '45 Min', value: '45'},
        {text: '1 Hour', value: '60'},
        {text: '1.5 Hour', value: '90'},
        {text: '2 Hour', value: '120'},
        {text: '3 Hour', value: '180'},
        {text: '4 Hour', value: '240'},
        {text: '5 Hour', value: '300'}
      ],
      selectedDays: [], // Must be an array reference!
      daysList: [
        { text: 'Monday', value: 'monday' },
        { text: 'Tuesday', value: 'tuesday' },
        { text: 'Wednesday', value: 'wednesday' },
        { text: 'Thursday', value: 'thursday' },
        { text: 'Friday', value: 'friday' },
        { text: 'Saturday', value: 'saturday' },
        { text: 'Sunday', value: 'sunday' }
      ],
      // baseUrlLive: 'https://evergenius.staging.wishpond.com/',
      baseUrlLive: 'http://localhost:3000/',
      name: '',
      from_time: '',
      to_time: '',
      updateId: 0,
      email: '',
      phone: '',
      city: '',
      state: '',
      password: '',
      country: '',
      gender: 1,
      success: '',
      errors: [],
      selDays: [],
      newProvider: []
    }
  },
  props: [ 'showModelLoader', 'bus', 'token' ],
  methods: {
    addProvider (e) {
      this.apiKey = this.token
      if (this.name && this.email && this.phone && this.city && this.country && this.state !== '') {
        var url = this.baseUrlLive + 'api/users/doctors'
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + this.token
        }
        axios.post(url, {
          name: this.name,
          email: this.email,
          phone: this.phone,
          city: this.city,
          state: this.state,
          country: this.country,
          gender: null,
          password: null,
          hd_publish_status: 1,
          job_title: null
        }, {
          headers: headers
        })
          .then(response => {
            if (response.data.data) {
              this.provider = response.data.data
              this.newProvider = this.provider.company_doctors[this.provider.company_doctors.length - 1]
              // this.newProvider = this.newProvider.company_doctors
              console.log(this.newProvider)
              this.$root.$emit('bv::hide::modal', 'modal-1')
              this.$alert('Provider Added Successfully')
              this.$root.$emit('bv::show::modal', 'modal-2')
              this.$emit('my-custom-event')
              // this.getDataList(this.currentPage, this.perPage, this.filter)
            }
            this.resetAll()
          })
          .catch(xhr => {
            this.errors = []
            this.errors.push(xhr.response.data.errors.message[0])
          })
        return true
      }

      if (!this.name) {
        this.errors.push('Name is required.')
      }
      if (!this.email) {
        this.errors.push('Email is required.')
      }
      if (!this.phone) {
        this.errors.push('Phone is required.')
      }
      if (!this.city) {
        this.errors.push('City is required')
      }
      if (!this.state) {
        this.errors.push('State is required.')
      }
      if (!this.country) {
        this.errors.push('Country is required')
      }
      e.preventDefault()
    },
    editForm (id) {
      var url = this.baseUrlLive + 'api/users/show/' + id
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + this.token
      }
      axios.get(url, {
        headers: headers
      })
        .then(response => {
          var resss = response.data.data
          if (resss) {
            this.$root.$emit('bv::show::modal', 'modal-1')
            this.updateId = resss.id
            this.name = resss.name
            this.email = resss.email
            this.phone = resss.phone
            this.city = resss.city
            this.state = resss.state
            this.country = resss.country
          }
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    resetAll () {
      this.updateId = 0
      this.name = ''
      this.email = ''
      this.phone = ''
      this.city = ''
      this.state = ''
      this.country = ''
    },
    addCalender () {
      let setnew = {}
      for (var i = 0; i <= this.selectedDays.length - 1; i++) {
        setnew[this.selectedDays[i]] = true
      }
      this.from_time = this.from_time.replace(/:[^:]*$/, '')
      this.to_time = this.to_time.replace(/:[^:]*$/, '')
      var url = this.baseUrlLive + 'api/celendars/set-default-weekschedule'
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + this.token
      }
      axios.post(url, {
        app_length: this.appLength,
        days: setnew,
        time_from: this.from_time,
        time_to: this.to_time,
        user_id: this.newProvider.id
      }, {
        headers: headers
      })
        .then(response => {
          if (response.status === 200) {
            this.$alert('Calender Added Successfully')
          }
          this.$root.$emit('bv::hide::modal', 'modal-2')
          this.$emit('my-custom-event')
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    updateProvider () {
      if (this.name && this.email && this.phone && this.city && this.country && this.state !== '') {
        var data = {id: this.updateId,
          name: this.name,
          email: this.email,
          phone: this.phone,
          city: this.city,
          password: null,
          state: this.state,
          country: this.country
        }
        var urlNew = this.baseUrlLive + 'api/users/show'
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer' + this.token
        }
        axios.put(urlNew, {
          data: data
        }, {
          headers: headers
        })
          .then(response => {
            console.log(response)
            if (response.data.data) {
              this.$alert('Provider Update Successfully')
            }
          })
          .catch(function (error) {
            if (error.response) {
              alert('Server Error')
            }
          })
        this.resetAll()
        this.$emit('my-custom-event')
        this.$root.$emit('bv::hide::modal', 'modal-1')
        return true
      }

      if (!this.name) {
        this.errors.push('Name is required.')
      }
      if (!this.email) {
        this.errors.push('Email is required.')
      }
      if (!this.phone) {
        this.errors.push('Phone is required.')
      }
      if (!this.city) {
        this.errors.push('City is required')
      }
      if (!this.state) {
        this.errors.push('State is required.')
      }
      if (!this.country) {
        this.errors.push('Country is required')
      }
    }
  }
}
</script>
