
import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faUserSecret,faChevronCircleDown )


import store from './store/index'
import './style.css'

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)

app.mount('#app')