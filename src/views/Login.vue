<template>
  <v-img height="100%" src="@/assets/bg.svg">
    <v-sheet class="bg-blue-darken-0 pa-5" height="100%" rounded>
      <v-card class="mx-auto px-6 py-8" elevation="10" max-width="400">
        <v-form v-model="form" @submit.prevent="isLogin ? login() : register()">
          <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Почта"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Пароль"
            placeholder="qwerty"
          ></v-text-field>
          <v-text-field
            v-if="!isLogin"
            v-model="username"
            :readonly="loading"
            :rules="[required]"
            clearable
            label="Имя пользователя"
          ></v-text-field>
          <br />
          <v-btn
            :disabled="!form"
            :loading="loading"
            class="my-2"
            block
            color="black"
            size="large"
            type="submit"
            variant="elevated"
          >
            {{ isLogin ? 'Войти' : 'Зарегистрироваться' }}
          </v-btn>
          <v-btn
            :loading="loading"
            @click="isLogin = !isLogin"
            block
            color="black"
            size="large"
            variant="plain"
          >
            {{ isLogin ? 'Зарегистрироваться' : 'Войти' }}
          </v-btn>
          <v-snackbar v-model="snackbar">
            {{ text }}
            <template v-slot:actions>
              <v-btn color="pink" variant="text" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </v-form>
      </v-card>
    </v-sheet>
  </v-img>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    username: null,
    loading: false,
    snackbar: false,
    text: `Ошибка`,
    isLogin: true,
  }),
  methods: {
    async login() {
      if (!this.form) return;
      this.loading = true;
      try {
        const response = await axios.post('http://79.174.91.58:8000/login', {
          email: this.email,
          password: this.password,
        });
        if (response.data.access_token) {
          // сохранить access_token в localStorage или Vuex
          this.text = 'Вход выполнен успешно';
          this.snackbar = true;
          // перенаправить на другую страницу
        } else {
          this.text = 'Неверные учетные данные';
          this.snackbar = true;
        }
      } catch (error) {
        this.text = error.response.data.error;
        this.snackbar = true;
      }
      this.loading = false;
    },
    async register() {
      if (!this.form) return;
      this.loading = true;
      try {
        const response = await axios.post('http://79.174.91.58:8000/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });
        if (response.data.message === 'User registered successfully') {
          this.text = 'Регистрация прошла успешно';
          this.snackbar = true;
          // перенаправить на страницу входа
        } else {
          this.text = 'Ошибка регистрации';
          this.snackbar = true;
        }
      } catch (error) {
        this.text = error.response.data.error;
        this.snackbar = true;
      }
      this.loading = false;
    },
    required(v) {
      return !!v || 'Обязательное поле';
    },
  },
};
</script>
