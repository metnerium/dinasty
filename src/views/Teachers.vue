<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>
        <v-img
          src="https://raw.githubusercontent.com/metnerium/school_project/2765b9dffafd14995ef75c04b55ac09e578f332d/school_app/templates/school_app/img/logopur1.svg"
          class="ml-2 mt-1 wid1"
          :width="160"
        ></v-img>
      </v-app-bar-title>
      <v-btn-toggle v-model="activeBtn" class="hidden-sm-and-down" mandatory>
        <v-btn v-for="(item, i) in navItems" :key="i" @click="goToPage(item.route)">{{ item.title }}</v-btn>
      </v-btn-toggle>
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn class="hidden-md-and-up" color="primary" v-bind="props" icon="mdi-menu"></v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in navItems" :key="i">
            <v-list-item-title @click="goToPage(item.route)">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <span class="username">{{ username }}</span>
    </v-app-bar>
    <v-main>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6" class="mx-auto">
          <v-sheet class="pa-4" color="transparent">
            <h1 align="center" justify="center">Наши преподаватели</h1>
            <v-row>
              <v-col v-for="(teacher, index) in teachers" :key="index" cols="12" sm="6" md="4">
                <v-card class="text-center">
                  <v-avatar size="200" class="mx-auto my-2">
                    <v-img :src="teacher.photo"></v-img>
                  </v-avatar>
                  <v-card-title>{{ teacher.name }}</v-card-title>
                  <v-card-subtitle>{{ teacher.subject }}</v-card-subtitle>
                  <v-card-text>{{ teacher.description }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import t1 from '@/assets/sonya.jpg'
import t2 from '@/assets/slava.jpg'
import t3 from '@/assets/danya.jpg'
import t4 from '@/assets/darya.jpg'
import t5 from '@/assets/liza.jpg'
import t6 from '@/assets/nastya.jpg'
export default {
  name: 'Teachers',
  data() {
    return {
      username: null,
      navItems: [
        { title: 'Главная', route: '' },
        { title: 'ЕГЭ', route: 'courses' },
        { title: 'Курсы', route: 'courses' },
        { title: 'Преподаватели', route: 'teachers' },
        { title: 'О нас', route: 'about' },
      ],
      teachers: [
        {
          name: 'Софья',
          subject: 'Информатика',
          photo: t1,
          description: 'Финансовый университет при правительстве РФ'
        },
        {
          name: 'Вячеслав',
          subject: 'Математика',
          photo: t2,
          description: 'Финансовый университет при правительстве РФ'
        },
        {
          name: 'Даниил',
          subject: 'Обществознание',
          photo: t3,
          description: 'Финансовый университет при правительстве РФ'
        },
        {
          name: 'Дарья',
          subject: 'Русский язык',
          photo: t4,
          description: 'Финансовый университет при правительстве РФ'
        },
        {
          name: 'Елизавета',
          subject: 'Английский язык',
          photo: t5,
          description: 'Финансовый университет при правительстве РФ'
        },
        {
          name: 'Анастасия',
          subject: 'Биология',
          photo: t6,
          description: 'Финансовый университет при правительстве РФ'
        },
      ],
    };
  },
  created() {
    this.fetchProfileData()
  },
  methods: {
    goToPage(page) {
      this.$router.push(`/${page}`);
    },
    async fetchProfileData() {
      try {
        console.log(this.$store.state.jwtToken);
        const response = await axios.get('/profile', {
          params: {
            jwt_token: this.$store.state.jwtToken,
          },
        });
        this.username = response.data.username;
        console.log(this.username);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    },
  },
};
</script>
