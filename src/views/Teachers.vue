<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <v-img src="https://raw.githubusercontent.com/metnerium/school_project/2765b9dffafd14995ef75c04b55ac09e578f332d/school_app/templates/school_app/img/logopur1.svg" class="ml-2 mt-1 wid1" :width="160"></v-img>
      </v-app-bar-title>
      <v-btn variant="plain" @click="goToPage('')"> Главная </v-btn>
      <v-btn variant="outlined" @click="goToPage('login')">
        Войти <v-icon icon="mdi-login-variant" end></v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6" class="mx-auto">
            <v-sheet class="pa-4" color="transparent">
              <h1 align="center" justify="center">Наши преподаватели</h1>
              <v-row>
                <v-col v-for="(teacher, index) in teachers" :key="index" cols="12" sm="6" md="4">
                  <v-card>
                    <v-img :src="teacher.photo" height="300"></v-img>
                    <v-card-title>{{ teacher.name }}</v-card-title>
                    <v-card-subtitle>{{ teacher.subject }}</v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
    </v-main>
  </v-app>
</template>

<style></style>

<script>

export default {
  name: 'Teachers',
  data() {
    return {
      teachers: [
        {
          name: 'Софья',
          subject: 'Информатика',
          photo: '@/assets/sophia.jpg',
        },
        {
          name: 'Вячеслав',
          subject: 'Математика',
          photo: '@/assets/vyacheslav.jpg',
        },
        {
          name: 'Даниил',
          subject: 'Обществознание',
          photo: '@/assets/daniil.jpg',
        },
        {
          name: 'Дарья',
          subject: 'Русский язык',
          photo: '@/assets/daria.jpg',
        },
        {
          name: 'Елизавета',
          subject: 'Английский язык',
          photo: '@/assets/elizaveta.jpg',
        },
        {
          name: 'Анастасия',
          subject: 'Биология',
          photo: '@/assets/anastasia.jpg',
        },
      ],
    };
  },
  methods: {
    goToPage(page) {
      this.$router.push(`/${page}`);
    },
  },
};
</script>
