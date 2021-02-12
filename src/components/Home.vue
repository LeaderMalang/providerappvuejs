<template>

  <b-card
    header="Provider List"
    header-tag="header"
  >
    <b-container fluid>
    <div class="row">
      <b-col lg="6" md="6" sm="12" class="my-1 float-left">
        <b-form-group
          label-for="filter-input"
          label-size="md"
          class="mb-0"
        >
          <b-input-group size="md">
            <b-form-input
              id="filter-input"
              v-model="filter"
              class="col-sm-6 col-lg-4 col-md-7"
              type="search"
              @input="getDataList(currentPage, perPage, filter)"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="6" md="12" sm="12">
        <AddProvider ref="form" :api-key-parent='apiKey' @my-custom-event="getDataList(currentPage, perPage, filter)" ></AddProvider>
      </b-col>
    </div>
  <div class="mt-5 table-responsive-sm">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Phone</th>
        <th scope="col">City</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="showLoader == true">
        <td colspan="9">
          <Loader></Loader>
        </td>
      </tr>
      <tr v-if="items != [] && showLoader == false" v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>
          <b-btn variant="link" @click="getsingleDetails(item.id)" class="btn-link" >{{ item.name }}</b-btn>
        </td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.city }}</td>
        <td>
          <b-button size="sm" @click="editInfo(item)" class="btn btn-sm btn-primary mr-1">
            <i class="fa fa-edit"></i>
          </b-button>
          <b-button size="sm" @click="deleteItem(item)" class="btn btn-sm btn-danger">
            <i class="fa fa-trash"></i>
          </b-button>
        </td>
      </tr>
      </tbody>
    </table>
    </div>
    </b-container>
    <div class="row">
        <div class="col-lg-4 col-md-6 col-sm-12 ">
          <div class="float-left">
          <b-col sm="12" md="12" class="my-1">
          <b-form-group
            label-for="per-page-select"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              @change="getDataList(1, perPage, filter)"
              :options="pageOptions"
              size="md"
            ></b-form-select>
          </b-form-group>
        </b-col>
      </div>
        </div>
      <div class="col-lg-8 col-md-6 col-sm-12">
        <div class="align-self-center">
        <b-col sm="12" md="12" class="my-1">
          <nav aria-label="Page navigation">
            <ul class="pagination justify-content-end">
              <li class="page-item" v-show="page != 1">
                <a class="page-link btn" @click="getDataList(page-1, perPage, filter)" tabindex="-1">Previous</a>
              </li>
              <li class="page-item" :key="pageNumber" v-for="pageNumber in allPages" >
                <a class="page-link" :data-id='pageNumber' :class="(page == pageNumber) ? 'activbtn' : ''" @click="getDataList(pageNumber, perPage, filter)">{{pageNumber}}</a>
              </li>
              <li class="page-item" v-if="page != totalPages">
                <a class="page-link" @click="getDataList(page+1, perPage, filter)" >Next</a>
              </li>
            </ul>
          </nav>
        </b-col>
        </div>
      </div>
    </div>

  <!--    This model is to show contact Details-->
  <b-modal  size="lg" :id="contactDetails.id" :title="contactDetails.content.name" ok-only @hide="resetcontactDetails">
  <ContactDetailsModel  :contact-details="contactDetails" :show-model-loader="showModelLoader"></ContactDetailsModel>
  </b-modal>
  </b-card>
</template>

<script>
import axios from 'axios'
import 'vue-select/dist/vue-select.css'
import Loader from './Loader.vue'
import ContactDetailsModel from './ContactDetailsModel'
import AddProvider from './AddProvider'

export default {
  name: 'Home',
  components: {
    Loader,
    AddProvider,
    ContactDetailsModel
  },
  data () {
    return {
      errors: [],
      firstArray: [],
      success: '',
      apiKey: '',
      msg: '',
      allPages: 0,
      showModal: false,
      value: '',
      value1: '',
      items: [],
      totalRows: 0,
      totalPages: 1,
      currentPage: 1,
      perPage: 5,
      page: 1,
      disableNext: false,
      disablePrevious: false,
      sortBy: '',
      baseUrlLive: 'https://evergenius.staging.wishpond.com/',
      baseUrlLocal: 'http://localhost:3000/',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      showLoader: false,
      showModelLoader: false,
      contactDetails: {
        id: 'contactDetails-modal',
        title: '',
        content: []
      },
      pageOptions: [
        5, 10, 15,
        {
          value: 100,
          text: 'Show a lot'
        }],
      fields: [
        {key: 'status', label: 'Status'},
        {key: 'provider_name', label: 'Provider', class: 'text-center'},
        {key: 'contact_name', label: 'Name', class: 'text-center'},
        {key: 'book_datetime', label: 'Date Received'},
        {key: 'start_datetime', label: 'Requested Time'},
        {key: 'mobile_number', label: 'Mobile'},
        {key: 'contact_type', label: 'Patient Type'},
        {key: 'scheduling_method', label: 'Scheduling Method'},
        {key: 'action', label: 'Action'}]
    }
  },
  created () {
    let uri = window.location.href.split('?')
    uri = uri[1].split('=')
    this.apiKey = uri[1]
    this.getDataList(this.currentPage, this.perPage, this.filter)
  },
  methods: {
    getDataList (page, perPage, filter = '') {
      this.page = page
      this.currentPage = page
      var start = 0
      if (page !== 1) {
        start = (this.perPage * (page - 1))
      }
      var pPage = this.perPage
      this.showLoader = true
      var url = this.baseUrlLive + 'api/users'
      axios.post(url, {
        auth_key: this.apiKey,
        columns: [{data: 'id', name: '', orderable: true, search: { value: '', regex: false }, searchable: true},
          {data: null, name: '', orderable: true, search: { value: '', regex: false }, searchable: true},
          {data: null, name: '', orderable: true, search: { value: '', regex: false }, searchable: true},
          {data: null, name: '', orderable: true, search: { value: '', regex: false }, searchable: true},
          {data: 'city', name: '', orderable: false, search: { value: '', regex: false }, searchable: true},
          {data: null, name: '', orderable: true, search: { value: '', regex: false }, searchable: true}],
        start: start,
        length: pPage,
        search: { value: filter, regex: false }
      })
        .then(response => {
          this.items = response.data.data
          this.showLoader = false
          this.totalRows = response.data.recordsTotal
          let numberOfPages = 1
          if (response.data.recordsFiltered) {
            numberOfPages = Math.ceil(response.data.recordsFiltered / this.perPage)
          } else {
            numberOfPages = Math.ceil(response.data.recordsTotal / this.perPage)
          }
          this.totalPages = numberOfPages
          this.dataPages()
        })
    },
    getsingleDetails (contactid) {
      var url = this.baseUrlLive + 'api/users/show/' + contactid
      this.showModelLoader = true
      axios.get(url, {
        params: {auth_key: this.apiKey}
      })
        .then(response => {
          this.contactDetails.content = response.data.data
          this.$root.$emit('bv::show::modal', this.contactDetails.id)
          if (this.contactDetails.content.name) {
            this.contactDetails.title = this.contactDetails.content.name
          } else {
            this.contactDetails.title = ''
          }
          this.showModelLoader = false
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    resetcontactDetails () {
      this.contactDetails.title = ''
      this.contactDetails.content = ''
    },
    editInfo (item) {
      this.$refs.form.editForm(item.id)
    },
    deleteItem (item) {
      this.$confirm('Are you sure You want to Delete Provider?').then(() => {
        var url = this.baseUrlLive + 'api/users/user/' + item.id
        axios.delete(url, {
          params: {
            auth_key: this.apiKey
          }
        })
          .then(response => {
            this.getDataList(this.currentPage, this.perPage, this.filter)
            this.$alert('Provider Deleted Successfully')
          })
          .catch(e => {
            this.errors.push(e)
          })
      })
    },
    dataPages () {
      let previousPages = []
      let nextPages = []
      let i = this.currentPage
      let nextValues = this.currentPage + 2
      if (nextValues > this.totalPages) {
        nextValues = this.currentPage + 1
      }
      if (nextValues <= this.totalPages && this.currentPage <= this.totalPages) {
        while (i <= this.totalPages) {
          if (i <= this.totalPages && i <= nextValues) {
            nextPages.push(i)
            i++
          } else {
            break
          }
        }
      }
      let allPages = []
      allPages = allPages.concat(nextPages)

      let w = this.currentPage
      if (w > 1 && ((w - 2) >= 1)) {
        while (w > this.currentPage - 2) {
          if (w <= this.totalPages) {
            if (allPages.includes(w) === false) {
              previousPages.push(w)
            }
            w--
          } else {
            break
          }
        }
      }
      previousPages.sort()
      allPages = allPages.concat(previousPages)
      if (allPages.includes(this.currentPage) === false) {
        allPages.push(this.currentPage)
      }
      this.allPages = allPages.sort()
    }
  }
}
</script>
<style scoped>

.activeElement {
  display: block;
}
.removeActiveElement{
  display: none;
}
button.page-link {
  display: inline-block;
}
.slink:disabled{
  color: black;
  background-color: gray;
}
.activbtn{
  background-color: green;
}
button.page-link {
  font-size: 20px;
  color: #29b3ed;
  font-weight: 500;
}
.offset{
  width: 500px !important;
  margin: 20px auto;
}
.spantitle {
  color: #999;
  font-weight: 500;
  font-size: 16px;
  /*top: -12px;*/
  /*left: 0;*/
  background: #fff;
  padding: 1px 10px 0 0px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
