<template>
  <div>
    <!-- <header style="display: flex; justify-content: space-between; background-color: #98142c;">
      <h1>Riskfin Direct</h1>
      <img src="/../riskfin-logo.png" alt="description" style="width: 10%; background-color: white;">
    </header> -->
    <div style="max-width: 50%; margin: 2rem;">
      <h1>Welcome {{ $route.query.firstNames }}</h1><br>
      <p>Thank you for your interest. <br>
        Please confirm your contact details below and click Next to continue or Back to change it.</p>
    </div>
    <div style=" margin-bottom: 1rem; margin-left: 35%;">
      <p>First Names </p>
      <p class="right">: {{ $route.query.firstNames }}</p>
      <p>Surname </p>
      <p class="right">: {{ $route.query.surname }}</p>
      <p>Identity Number </p>
      <p class="right">: {{ $route.query.idNumber }}</p>
      <p>Email </p>
      <p class="right">: {{ $route.query.email }}</p>
      <p>Contact Phone Number </p>
      <p class="right">: {{ $route.query.contactPhoneNumber }}</p>


      <div style=" padding-bottom: 2rem;margin-left: 50%;">
        <button @click="sendEmailAndGoToThankYou"
          style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; margin-right: 10px; background-color: #98142c; color: #fff; cursor: pointer;">Next</button>
        <button @click="goToRegistration"
          style="padding: 3px 12px; border: solid 1px #39f; border-radius: 4px; background-color: #98142c; color: #fff; cursor: pointer;">Back</button>
      </div>
      <div style=" max-width: 95%;padding-bottom: 0.5rem;font-size: 80%;text-align: end;">
        <a href="#" @click="openModal" style="color: black;">Need Help ?</a>
      </div>
    </div>

    <!-- Use the reusable modal component -->
    <modal :is-open="isModalOpen" title="What to do next?" @close="closeModal">
      <!-- Content of the modal goes here -->
      <p>Click the "Continue" button to proceed with the application process or click the "Back" button to return to edit
        the deatils displayed.</p>
      <p>- Riskfin Direct</p>
    </modal>
  </div>
</template>

<!-- <script>
import { useRouter } from 'vue-router';
import Modal from './help-modal.vue';


const router = useRouter()
const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

// Replace this fictional sendEmail function with a real email sending implementation
async function sendEmail(userData) {
  try {

    const response = await fetch('http://localhost:9000/riskfin_direct_user', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    // console.log(`Sending email to ${emailAddress}`);

    if (response.ok) {
      console.log('Email sent successfully');
      return true;
    } else {
      console.error('Email sending failed');
      return false;
    }
  } catch (error) {
    console.error(`Failed to send email: ${error.message}`);
    return false;
  }
}


export default {
  components: {
    Modal,
  },
  data() {
    return {
      storedData: {
        firstNames: '',
        surname: '',
        email: '',
        contactPhoneNumber: '',
      },
      isModalOpen: false,
    };
  },
  methods: {
    goToRegistration() {
      this.$router.go(-1);
    },
    // sendEmailAndGoToThankYou() {
    //   this.$router.push({ name: 'thank-you' });
    // },

    // Method to open the modal
    openModal() {
      this.isModalOpen = true;
    },

    // Method to close the modal
    closeModal() {
      this.isModalOpen = false;
    },
 

  async sendEmailAndGoToThankYou() {
    const userData = {
        name: this.storedData.firstNames,
        surname: this.storedData.surname,
        email: this.storedData.email,
        mobile_number: this.storedData.contactPhoneNumber,
      };

      const emailSent = await sendEmail(userData);

      if (emailSent) {
        // Email sent successfully, navigate to the thank-you page
        this.$router.push({ name: 'thank-you' });
      } else {
        // Handle the case where email sending fails
        console.error('Email sending failed. Please try again.');
      }
    },
  },
  created() {
    // Retrieve the stored data from the query parameters
    this.storedData.firstNames = this.$route.query.firstNames || '';
    this.storedData.surname = this.$route.query.surname || '';
    this.storedData.email = this.$route.query.email || '';
    this.storedData.contactPhoneNumber = this.$route.query.contactPhoneNumber || '';
  },
}
</script> -->

<script>
import Modal from './help-modal.vue';

const bearerToken = "1HW94aH3Gu9BNxqw2QnY4y7zMa1xwlm_rg2ZiA9tt3fu";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      storedData: {
        firstNames: '',
        surname: '',
        email: '',
        contactPhoneNumber: '',
        idNumber: '',
      },
      isModalOpen: false,
    };
  },
  methods: {
    goToRegistration() {
      this.$router.go(-1);
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async sendEmail(userData) {
      try {
        const response = await fetch('http://localhost:9000/riskfin_direct_user', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        console.log('Authorization', `Bearer ${bearerToken}`);
        console.log(userData);

        if (response.ok) {
          console.log('Email sent successfully');
          return true;
        } else {
          const responseBody = await response.text();
          console.error(`Email sending failed. Status: ${response.status}, Response: ${responseBody}`);
          return false;
        }
      } catch (error) {
        console.error(`Failed to send email: ${error.message}`);
        return false;
      }
    },

    async sendEmailAndGoToThankYou() {
      const userData = {
        name: this.storedData.firstNames,
        surname: this.storedData.surname,
        email: this.storedData.email,
        mobile_number: this.storedData.contactPhoneNumber,
        idNumber: this.storedData.idNumber,
      };

      const emailSent = await this.sendEmail(userData);

      if (emailSent) {
        // Email sent successfully, navigate to the thank-you page
        console.log('Email sent');
        this.$store.dispatch('updateUserData', userData);
        this.$router.push({ name: 'thank-you' });
      } else {
        // Handle the case where email sending fails
        console.error('Email sending failed. Please try again.');
      }
    },
  },
  created() {
    // Retrieve the stored data from the query parameters
    this.storedData.firstNames = this.$route.query.firstNames || '';
    this.storedData.surname = this.$route.query.surname || '';
    this.storedData.email = this.$route.query.email || '';
    this.storedData.contactPhoneNumber = this.$route.query.contactPhoneNumber || '';
    this.storedData.idNumber = this.$route.query.idNumber || '';
  },
};
</script>


<style lang="scss">
.right {
  margin-block-start: -2.5rem;
  margin-inline-start: 15rem;
}
</style>

<!-- 
<style scoped>
/* Add styling for the modal and its overlay */
.modal {
  position: fixed;
  z-index: 1000;
  display: none;
  align-items: flex-start;
  justify-content: center;
  background-color: rgba(0, 0, 0, 50%);
  block-size: 100%;
  inline-size: 100%;
  inset-block-start: 0;
  inset-inline-start: 0;
}

.modal.is-active {
  display: flex;
}

.modal-content {
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 20%);
  margin-block-start: 3rem;
  max-inline-size: 80%;
  padding-block: 20px 80px;
  padding-inline: 20px 80px;
}

.modal-close {
  position: absolute;
  border: none;
  background-color: transparent;
  cursor: pointer;
  inset-block-start: 10px;
  inset-inline-end: 10px;
}
</style> -->


<!-- 
<script>
export default {
  data() {
    return {
      contact: {
        firstNames: '',
        surname: '',
        email: '',
        phoneNumber: ''
      }
    };
  },
  methods: {
    submitForm() {
      // You can access the user's contact details from this.contact
      // Perform any necessary actions, such as sending the data to a server
      console.log('Contact details submitted:', this.contact);
    },
    goBack() {
      // Implement the logic to go back to the previous page or step
      console.log('Go back button clicked');
    }
  }
};
</script> -->

<!-- 
<script>
// import { inject } from "vue";

// export default {
//   name: 'AnotherComponent',
//   setup() {
//     const formData = inject("formData");

//     // Now you can access the form data properties like this:
//     const firstNames = formData.firstNames;
//     const email = formData.email;
//     const contactPhoneNumber = formData.contactPhoneNumber;
//     const surname = formData.surname;

//     // You can also access the submitForm method:
//     const submitForm = formData.submitForm;

//     // Now you can use these values and methods in this component.
    
//     // For example, you can display the values in the template:
//     // return {
//     //   firstNames,
//     //   email,
//     //   contactPhoneNumber,
//     //   surname,
//     //   submitForm,
//     // };
//   },
// };
</script> -->

