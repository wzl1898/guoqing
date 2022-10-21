import * as all from '@/utils'
const request = all.request

export function login () {
  return request({
    url: '/login',
    method: 'post',
    params: {
      username: "04f7fff72041f3dff0d7f0e5fe21a642bae4884f4922e38771f6c3bc056ebb1f688480298b0d13146d1209c542a67924266e2063e42eb3c73efbc886a625e00fe26c1731210c65099e0890b24c9a05ecb433cffaaf957c760e233445dbe99448108f95d1efb9dd",
      password: "04f7fff72041f3dff0d7f0e5fe21a642bae4884f4922e38771f6c3bc056ebb1f688480298b0d13146d1209c542a67924266e2063e42eb3c73efbc886a625e00fe26c1731210c65099e0890b24c9a05ecb433cffaaf957c760e233445dbe99448108f95d1efb9dd"
    }
  })
}

export function loginlic (token) {
  return request({
    url: '/lics/loginLic/loginLic',
    method: 'post',
    params: {
      token: token
    }
  })
}
