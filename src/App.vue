<template>
  <div id="form">
    <el-row :gutter="40">
      <el-col :span="22" :offset="2">
        <h1>Clear.Bank query form</h1>
        <p>Please fill the form below to submit your query.</p>
      </el-col>
    </el-row>          
    <el-row :gutter="40">          
      <el-col :span="10" :offset="2">
        <el-form ref="clearBankForm" :model="userInput" :rules="rules" label-position="top">
          <el-form-item label="First name">
            <el-input v-model="userInput.firstName"></el-input>
          </el-form-item>
          <el-form-item label="Last name">
            <el-input v-model="userInput.lastName"></el-input>
          </el-form-item>
          <el-form-item label="Mobile number">
            <el-input v-model.number="userInput.mobileNumber"></el-input>          
          </el-form-item>
          <el-form-item prop="email" label="Email">
            <el-input v-model="userInput.email"></el-input>
          </el-form-item>
      <el-row :gutter="40">
        <el-col :span="10">
          <el-form-item prop="age" label="Age">
            <el-input v-model="userInput.age"></el-input>
          </el-form-item>
        </el-col>      
        <el-col :span="10">
          <el-form-item label="Date of birth">
            <el-date-picker type="date" placeholder="Pick a date" v-model="userInput.dob"></el-date-picker>
          </el-form-item>
        </el-col>      
      </el-row>        
    
          <el-form-item label="Your query">
            <el-input type="textarea" v-model="userInput.query" placeholder="Type your query here..."></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm(clearBankForm)">Clear</el-button>
            <el-button type="primary" @click="submit" icon="check">Submit query</el-button>
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
            <h3>Thank you for getting in touch, we will get back to you within 48 hours.</h3>
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
          { required: true, message: 'Please provide your first name', trigger: 'blur' }
        ],
        lastName: [
          { required: true, message: 'Please provide your surname', trigger: 'blur' }
        ],
        mobileNumber: [
          { required: true, message: 'Please provide your mobile number', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Please input email address', trigger: 'blur' },
          { type: 'email', message: 'Please input correct email address', trigger: 'blur,change' }
        ],
        age: [
          { type: 'number', message: 'Please use numbers only', trigger: 'blur,change' }
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
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
            // this.$data.noDataYet = false;
    //       this.$store.dispatch('updateUserInput', {
            // firstName: this.userInput.firstName,
            // lastName: this.userInput.lastName,
            // mobileNumber: this.userInput.mobileNumber,
            // email: this.userInput.email,
            // age: this.userInput.age,
            // dob: this.userInput.dob,
            // query: this.userInput.query
      // })
    //     } else {
    //       console.log('error submitting form. Please try again');
    //       return false;
    //     }
    //   });
    // },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submit() {
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
    }
  }
}

</script>

<style lang="scss">
#form {
  font-family: system-ui, Helvetica, Arial, sans-serif;
  color: #2c3e50;
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
