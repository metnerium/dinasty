<template>
  <v-img height="100%" src="@/assets/bg.svg">
  <v-sheet class="bg-blue-darken-0 pa-5" height="100%" rounded>
    <v-card class="mx-auto px-6 py-8" elevation="10" max-width="400">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
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

        <br>

        <v-btn
          :disabled="!form"
          :loading="loading"
          class="my-2"
          @click="snackbar = true"
          block
          color="black"
          size="large"
          type="submit"
          variant="elevated"
        >
          Войти
        </v-btn>
        <v-btn
          :disabled="!form"
          :loading="loading"
          :href="`/`"
          block
          color="white"
          size="large"
          type="submit"
          variant="plain"

        >
          Вернуться назад
        </v-btn>
        <v-snackbar
          v-model="snackbar"
        >
          {{ text }}

          <template v-slot:actions>
            <v-btn
              color="pink"
              variant="text"
              @click="snackbar = false"
            >
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
export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
    snackbar: false,
    text: `Ошибка`,
  }),

  methods: {
    onSubmit () {
      if (!this.form) return

      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
    required (v) {
      return !!v || 'Обязательное поле'
    },
  },
}
</script>
