<template>
  <div id="form">
    <el-row :gutter="40">
      <el-col :span="22" :offset="2" class="form__header">
        <h1>Customer query form</h1>
        <p>Please fill the form below to submit your query.</p>
      </el-col>
    </el-row>
    <el-row :gutter="40">          
      <el-col :span="10" :offset="2">
        <el-form ref="userInput" :model="userInput" :rules="rules" label-position="top">
          <el-form-item prop="firstName" label="First name">
            <el-input v-model="userInput.firstName"></el-input>
          </el-form-item>
          <el-form-item prop="lastName" label="Last name">
            <el-input v-model="userInput.lastName"></el-input>
          </el-form-item>
          <el-form-item prop="mobileNumber" label="Mobile number">
            <el-input v-model.number="userInput.mobileNumber"></el-input>          
          </el-form-item>
          <el-form-item prop="email" label="Email">
            <el-input v-model="userInput.email"></el-input>
          </el-form-item>
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item prop="age" label="Age">
                <el-input v-model.number="userInput.age"></el-input>
              </el-form-item>
            </el-col>      
            <el-col :span="8">
              <el-form-item prop="dob" label="Date of birth">
                <el-date-picker type="date" v-model="userInput.dob" format="dd-MM-yyyy" placeholder="Pick a date" width="100%"></el-date-picker>
              </el-form-item>
            </el-col>      
          </el-row>        
          <el-form-item prop="query" label="Your query">
            <el-input type="textarea" v-model="userInput.query" :autosize="{ minRows: 2, maxRows: 10}" placeholder="Type your query here..."></el-input>
          </el-form-item>
          <el-form-item class="form__buttons">
            <el-button @click="clearFields">Clear</el-button>
            <el-button type="primary" @click="submitForm" icon="check">Submit query</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-card v-if="noDataYet" class="box-card">
          <div class="text item">
            You have not yet submitted your query.
          </div>
        </el-card>
        <el-card v-if="!noDataYet" class="box-card">
          <div slot="header" class="clearfix">
            <h3>Thank you for getting in touch, {{submittedQuery.firstName}}.</h3>
          </div>
          <div class="text">
            <p>Here is a summary of what you submitted:</p>
          </div>
          <div class="text item">
            <strong>Full name:</strong> {{submittedQuery.firstName}} {{submittedQuery.lastName}}
          </div>
          <div class="text item">            
            <strong>Phone:</strong> {{submittedQuery.mobileNumber}}
          </div>
          <div class="text item">            
            <strong>Email:</strong> {{submittedQuery.email}}
          </div>            
          <div class="text item">            
            <strong>Age:</strong> {{submittedQuery.age}}
          </div>            
          <div class="text item">            
            <strong>Date of birth:</strong> {{submittedQuery.dob}}
          </div>            
          <div class="text item">            
            <strong>Query:</strong> <p>{{submittedQuery.query}}</p> 
          </div>            
        </el-card>
      </el-col>
    </el-row>          
  </div>
</template>

<script>
export default {
  name: 'app',
  data: function() {
    return { 
      userInput: {},
      noDataYet: true,
      rules: {
        firstName: [
          { required: true, pattern: /[a-zA-Z\s]+/, message: 'Please provide your first name using only letters', trigger: 'blur' }
        ],
        lastName: [
          { required: true, pattern: /[a-zA-Z\s]+/, message: 'Please provide your surname using only letters', trigger: 'blur' }
        ],
        mobileNumber: [
          { required: true, type: 'number', message: 'Please provide your mobile number', trigger: 'blur' }
        ],
        email: [
          { required: true, type: 'email', message: 'Please provide a correct email address', trigger: 'blur' },
        ],
        age: [
          { type: 'number', message: 'Please use numbers only', trigger: 'blur' }
        ],
        dob: [
          { required: true, format: 'date', message: 'Please provide your date of birth', trigger: 'change' }
        ],
        query: [
          { required: true, message: 'Please type your query', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    submittedQuery() {
      return this.$store.state.userQuery
    }
  },
  methods: {
    submitForm(userInput) {
      // Additional formatting for datePicker currently not displaying chosen date. 
      if (this.userInput.dob) {
        this.userInput.dob = new Intl.DateTimeFormat('en-GB').format(this.userInput.dob)
      }
      this.$refs.userInput.validate((valid) => {
        if (valid) {
          this.$data.noDataYet = false; 
          this.$store.dispatch('updateUserInput', {
            firstName: this.userInput.firstName,
            lastName: this.userInput.lastName,
            mobileNumber: this.userInput.mobileNumber,
            email: this.userInput.email,
            age: this.userInput.age,
            dob: this.userInput.dob,
            query: this.userInput.query
          })
        } else {
          console.log('error submitting form. Please try again');
          return false;
        }
      });
    },
    clearFields() {
      this.$data.userInput = {}
    }
  }
}
</script>

<style lang="scss">
#form {
  font-family: system-ui, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.form__header {
  padding-bottom: 40px;
}

.form__buttons {
  padding-top: 40px;
  text-align: right;
}
.item {
  padding: 18px 0;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
  width: 480px;
  margin-top: 24px;
}
</style>
