<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Bitkingdom</b-navbar-brand>
    </b-navbar>
    <b-container>
      <b-row align-h="center">
        <b-col md="6" class="mt-5">
          <b-form @submit.prevent="onSubmit" @reset="onReset" v-if="show" ref="form">
            <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="$v.form.email.$model"
                lazy
                type="email"
                placeholder="Enter email"
                :state="validateState('email')"
              ></b-form-input>
              <b-form-invalid-feedback>
                A valid email address is required
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="$v.form.name.$model"
                lazy
                name="name"
                placeholder="Enter name"
                :state="validateState('name')"
              ></b-form-input>
              <b-form-invalid-feedback>
                Your name is required and must be at least 3 characters
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="input-group-3" label="Phone:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="$v.form.phone.$model"
                placeholder="Enter Phone Number"
                :state="validateState('phone')"
              ></b-form-input>
              <b-form-invalid-feedback>
                A valid phone number is required
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="input-group-4" label="Claim Amount:" label-for="input-4">
              <b-form-input
                id="input-4"
                v-model="$v.form.amount.$model"
                placeholder="Enter Amount"
                :state="validateState('amount')"
              ></b-form-input>
              <b-form-invalid-feedback>
                A valid amount is required
              </b-form-invalid-feedback>
            </b-form-group>
      
            <!-- Styled -->
            <b-form-group id="input-group-5" label="Upload" label-for="input-5">
            <b-form-file
              v-model="form.file"
              :state="Boolean(form.file)"
              accept="image/jpeg, image/png, image/gif"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            </b-form-group>
            <VueHcaptcha
              ref="invisibleHcaptcha"
              sitekey="d6328d81-36bf-40ef-84df-492d2bdc2df1"
              size="invisible"
              @verify="onCallback"
              @expired="onExpire"
            />
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>


<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength, email, integer } from "vuelidate/lib/validators"
  import VueHcaptcha from '@hcaptcha/vue-hcaptcha';

  export default {
    mixins: [validationMixin],
    data() {
      return {
        form: {
          email: '',
          phone: null,
          amount: null,
          name: '',
          file: null
        },
        show: true,
        verified: false
      }
    },
    components: {
      VueHcaptcha
    },
    validations: {
      form:{
        email: {
          required,
          email
        },
        name: {
          required,
          minLength: minLength(4)
        },
        phone: {
          required,
          phoneValid:(phone) => { //a custom validator!
      	    return !phone || /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone)
          }
        },
        amount: {
          required,
          integer
        }
      }
    },
    methods: {
      onCallback(response) {
        this.verified = true;
        console.log(`Callback Response: ${response}`)
        alert('now we will send the info to firebase')
      },
      onExpire() {
          this.verified = false;
          console.log("Expired");
      },
      onSubmit(evt) {
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        } else {
          this.$refs.invisibleHcaptcha.execute()
          // alert('form looks fine to submit')
        }
      },
      onError(err) {
          console.log(`Error: ${err}`)
      },
      validateState(name) {
        const { $dirty, $error } = this.$v.form[name]
        return $dirty ? !$error : null
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



