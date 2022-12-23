<script setup>
import { onBeforeMount, ref, onBeforeUpdate } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserLoginForm from '../../components/User/UserLoginForm.vue'
import { saveAccessToken, saveRefreshToken } from '../../utils/index.js'
import jwt_decode from 'jwt-decode'
import { UserAgentApplication } from 'msal'

const route = useRoute()
const router = useRouter()
// const users = ref([])
const accessToken = ref()
const refreshToken = ref()

const decoded = ref({ sub: '', role: '' })

const goHome = () => {
  router.push({ name: 'home' })
}

//login new user
const userLogin = async (userLogin) => {
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (userLogin.userEmail.length > 50) {
    alert('userEmail must have length 1-50')
  }
  if (userLogin.userEmail.match(validRegex)) {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/users/login`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userLogin.userEmail,
          password: userLogin.password,
        }),
      }
    )
    if (res.status === 201 || res.status === 200) {
      const data = await res.json()
      accessToken.value = data.jwttoken
      refreshToken.value = data.refreshToken
      saveAccessToken(accessToken.value)
      saveRefreshToken(refreshToken.value)
      // jwtToken.value = localStorage.getItem('accessToken')
      // decoded.value = jwt_decode(jwtToken.value)
      alert('Login Successful')
      goHome()
    } else if (res.status === 401) {
      alert('Password NOT Matched')
    } else if (res.status === 404) {
      alert('A user with the specified email DOES NOT exist')
    } else {
      alert('Error, please try again')
    }
  } else {
    alert('Invalid email address!')
  }
}

const userLoginWithMs = async () => {
  const res = await fetch(
    `${import.meta.env.VITE_SERVER_URL}/api/users/loginms`,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: localStorage.getItem(
        'msal.5152afa2-4ad8-407c-98fb-96e326a0aea1.idtoken'
      ),
    }
  )
  if (res.status === 201 || res.status === 200) {
    const data = await res.json()
    accessToken.value = data.jwttoken
    refreshToken.value = data.refreshToken
    saveAccessToken(accessToken.value)
    saveRefreshToken(refreshToken.value)
    jwtToken.value = localStorage.getItem('accessToken')
    decoded.value = jwt_decode(jwtToken.value)
    alert('Login Successful')
    goHome()
  } else {
    alert('Sorry, Cannot Login')
  }
}

const jwtToken = ref(null)

const msalConfig = {
  auth: {
    clientId: '05299507-9635-4ea1-a9d8-85dcc66c485e',
    authority:
      'https://login.microsoftonline.com/6f4432dc-20d2-441d-b1db-ac3380ba633d',
    redirectURI: 'https://intproj21.sit.kmutt.ac.th/ssi4/#/',
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: true,
    popUp: true, // Set this to "true" if you are having issues on IE11 or Edge
  },
}

var requestObj = {
  scopes: ['user.read'],
}

const accoutMicro = ref({ accountIdentifier: null, roles: [] })

var myMSALObj = new UserAgentApplication(msalConfig)

async function login() {
  var authResult = await myMSALObj.loginPopup(requestObj)
  accoutMicro.value = authResult.account
  localStorage.setItem('MSTToken', authResult.idToken.rawIdToken)
  const jwtMicosoft = localStorage.getItem(
    'msal.05299507-9635-4ea1-a9d8-85dcc66c485e.idtoken'
  )
  saveAccessToken(jwtMicosoft)
  localStorage.setItem('MsStatus', true);
  goHome()
}

var logoff = () => {
  myMSALObj.logout()
}
</script>

<template>
  <UserLoginForm @login="userLogin" />
  <br />
  <div class="text-gray-500 text-center text-sm mb-4">
    ━━━━━━━━━ or ━━━━━━━━━
  </div>
  <div class="text-center">
    <button
      @click="login()"
      class="inline-block rounded-lg"
    >
      <img
        src="../../components/new-microsoft-logo-SIZED-SQUARE.jpg"
        class="h-14"
      />
    </button>
  </div>
</template>

<style></style>
