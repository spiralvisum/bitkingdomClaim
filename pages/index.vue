<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Bitkingdom</b-navbar-brand>
    </b-navbar>
    <b-container>
      <b-row align-h="center">
        <b-col md="6" class="mt-5">
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="Enter email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="form.name"
                required
                placeholder="Enter name"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Phone:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="form.phone"
                required
                placeholder="Enter Phone Number"
              ></b-form-input>
            </b-form-group>


            <b-form-group id="input-group-4" label="Claim Amount:" label-for="input-4">
              <b-form-input
                id="input-4"
                v-model="form.amount"
                required
                placeholder="Enter Amount"
              ></b-form-input>
            </b-form-group>

            <!-- Styled -->
            <b-form-group id="input-group-5" label="Upload" label-for="input-5">
            <b-form-file
              v-model="file"
              :state="Boolean(file)"
              accept="image/jpeg, image/png, image/gif"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          phone: null,
          amount: null,
          file: null
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.phone = null
        this.form.amount = null
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>



