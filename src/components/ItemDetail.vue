<template> 
    <div>
        <div>{{item.title}}</div>
            <div class="gallery-grid">
            <figure class="gallery-frame">
              <img class="gallery-img" :src="item.image.url"/>
                <!-- <img v-for="img in item.images" v-bind:key="img.id" class="gallery-img" :src="img.url" alt="" title="Image form kobo"> -->
                <figcaption>Product Image</figcaption>
            </figure>
            </div>
            <div>
            </div>
            <p><router-link :to="'/'">Go back...</router-link></p>

              <div id="contact-form" class="contact-form">
                  <h1 class="contact-form_title">Contact Form</h1>
                  <div class="separator"></div>

                  <div v-show="isSending" class="loading">Sending...</div>
                  <div v-show="err" class="error">{{err_msg}}</div>

                  <form class="form" @submit="onSubmit" >
                    <input type="text"  v-model="contact.name" required name="name" placeholder="Name" autocomplete="off"/>               
                    <input  required name="email" v-model="contact.email" placeholder="E-mail" type="email" autocomplete="off"/>
                    <input  name="phone" type="tel" v-model="contact.phone" placeholder="Phone" autocomplete="off"/>
                    <div class="separator"></div>
                    <label for="quantity">Order quantity (between 1 and 10):</label>
                    <input type="number" id="quantity" name="quantity" min="1" max="10" v-model="contact.num">
                    <button class="button">Send</button>
                  </form>
                      <div class="separator"></div>
                </div>
    </div>
</template>

<script>
export default {
    name: 'ItemDetail',
    data() {
      return {
        item : {},
        items: [],
        err: false,
        err_msg: 'couldent send the email, please try later...',
        contact: {
          name: '',
          email: '',
          phone: '',
          num: 0,
        },
        isSending: false
      }
    },
    components:{
    }, 
    async mounted() {
    // GET request using fetch with async/await
    const response = await fetch("https://app.konimbo.co.il/api/v2?storeId=5596&token=f6666e751b7fbe2cd5167fec753318469dea6caa161558c1d8a77b2369e3809b361b3003784c7346&groupName=group1&modelName=item");
    const data = await response.json();
    this.items = data;
    this.getItemById();
  },
  computed:{

  },

  methods:{
        getItemById : function (){
        this.items.forEach(element => {
            if(element.id  == this.$route.params.id)
            this.item = element;
            return;
        });
    },


		//Clear the form	
		clearForm : function () {
			for (let field in this.contact) {
				this.contact[field] = ''
			}
		},

    // Handler for submit
		onSubmit: async function (evt) {
      evt.preventDefault();
      
        var t = this.contact;
        var payload = {name: this.name, email: this.email, phone: this.phone, unm: this.contact.num};

			// Build for data
				let form = new URLSearchParams();
				for (let field in this.contact) {
					form.append(field, this.contact[field]);
        }

        let url = 'https://webhook.site/9cf9ca89-89d7-4554-8f3a-af41025d85c5';
        let options = {method: 'post',body: form};
        this.isSending = true;
        try{
            let res = await fetch(url,options);
            this.isSending = false;
            console.log(res);
        }
        catch(e)
        {
          console.log(e)
            this.err = true;
            await this.sleep(2000);
            this.err = false;
            this.isSending = false;  
        }
    },    
    sleep: function (ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }
}
</script>

<style scoped>
/* First the Grid */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1.5rem;
  justify-items: center;
  margin: 0;
  padding: 0;
}

/* The Picture Frame */
.gallery-frame {
  /* padding: .5rem; */
  padding: 10px;
  font-size: 1.2rem;
  text-align: center;
  background-color: #333;
  color: #d9d9d9;
}

/* The Images */
.gallery-img {
  width: 200px;
  max-width: 50%;
  height: auto;
  object-fit: cover;
  transition: opacity 0.25s ease-in-out;
}

.gallery-img:hover {
  opacity: .7;
}


body {
	background: #f1f1f1;
	font-family: 'Roboto', sans-serif;
}

.contact-form {
	font-family: 16px;
	margin: 0 auto;
	max-width: 600px;
	width: 100%;
}

.contact-form .separator {
	border-bottom: solid 1px #ccc;
	margin-bottom: 15px;
}

.contact-form .form {
	display: flex;
	flex-direction: column;
	font-size: 16px;
}

.contact-form_title {
	color: #333;
	text-align: left;
	font-size: 28px;
}

.contact-form input[type="email"],
.contact-form input[type="text"],
.contact-form input[type="tel"],
.contact-form input[type="number"]
{
	border: solid 1px gray;
	font-family: 'Roboto', sans-serif;
	padding: 10px 7px;
	margin-bottom: 15px;
	outline: none;
}

.contact-form textarea {
	resize: none;
}

.contact-form .button {
	background: #da552f;
	border: solid 1px #da552f;
	color: white;
	cursor: pointer;
	padding: 10px 50px;
	text-align: center;
	text-transform: uppercase;
}

.contact-form .button:hover {
	background: #ea532a;
	border: solid 1px #ea532a;
}

.contact-form input[type="email"],
.contact-form input[type="text"],
.contact-form textarea,
.contact-form .button {
	font-size: 15px;
	border-radius: 3px
}

.loading .error {
  margin-top: 20px;
}

.error{
    color:red;
}
</style>