<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-title>
        <v-img src="https://raw.githubusercontent.com/metnerium/school_project/2765b9dffafd14995ef75c04b55ac09e578f332d/school_app/templates/school_app/img/logopur1.svg" class="ml-2 mt-1 wid1" :width="160"></v-img>
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
      <v-btn v-if="!username" variant="outlined" @click="goToPage('login')">
        Войти <v-icon icon="mdi-login-variant" end></v-icon>
      </v-btn>
      <span v-else class="username" @click="goToPage('profil')">{{ username }}</span>
    </v-app-bar>
    <v-main>
        <v-container class="con1">
          <v-row align="center" justify="center" class="flex-column">
            <h1 class="mt-5 text-center">ПРИСОЕДИНЯЙТЕСЬ К ДИНАСТИИ ЕГЭ</h1>
            <h4 class="mt-3 text-center">
              Достигайте вершин с нашей пошаговой подготовкой к ЕГЭ. Ваш успех - наша цель.
            </h4>
            <div>
              <v-btn
                size="large"
                variant="flat"
                class="mr-3 mt-5 bg-deep-purple-darken-1"
                @click="goToPage('courses')"
              >Выбрать курс</v-btn>
              <v-btn href="https://t.me/da_dunia" size="large" variant="outlined" class="mt-5 hidden-sm-and-down">
                <p class="wid2" >Получить консультацию</p>
              </v-btn>
            </div>
          </v-row>
        </v-container>
        <v-container class="con2" align="center" justify="center">
          <v-sheet class="pa-4" width="75%" color="transparent">
            <h1 align="center" justify="center">Направления подготовки</h1>
            <v-row>
              <v-col v-for="(direction, index) in directions" :key="index" cols="12" md="6" lg="4">
                <v-list-item :to="direction.link" color="primary">
                  <v-img :src="direction.img" width="250px"></v-img>
                  <v-list-item-content>
                    <h4>{{ direction.title }}</h4>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-row>
          </v-sheet>
        </v-container>
        <v-container align="center" justify="center">
          <v-sheet class="pa-4" color="transparent">
            <v-row class="ml-2 mt-2">
              <h2>Популярные курсы</h2>
            </v-row>
            <v-row class="mb-4">
              <v-col
                v-for="course in courses"
                :key="course.title"
                cols="12"
                sm="4"
                class="d-flex flex-column"
              >
                <div class="bg-black pb-5 cardteach">
                  <v-img :src="course.image" class="img1"  width="100%">
                    <template v-slot:placeholder>
                      <v-row class="ma-0" align="center" justify="center"></v-row>
                    </template>
                  </v-img>
                  <div>
                    <h3 class="mb-1">{{ course.title }}</h3>
                    <p class="mb-2">{{ course.teacher }}</p>
                    <v-btn width="70%" variant="tonal" @click="goToPage(course.link)">Перейти к курсу</v-btn>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-sheet>
        </v-container>
    </v-main>
    <v-footer border>
      <v-row no-gutters class="flex-column">
        <v-btn v-for="link in footerLinks" :key="link" class="mx-2" color="black" variant="text">
          {{ link }}
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>Династия</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<script>

import directionImg11 from '@/assets/11.svg';
import directionImg10 from '@/assets/10.svg';
import directionImg9 from '@/assets/9.svg';
import directionImg5 from '@/assets/5.svg';
import directionImgOl from '@/assets/ol.svg';
import directionImgRep from '@/assets/rep.svg';
import axios from "axios";
export default {
  name: 'Home',
  created() {
    if (this.$store.state.jwtToken) {
      this.fetchProfileData();
    }
  },
  data() {
    return {
      username: null,
      activeBtn: null,
      courses: [
        {
          title: 'Русский язык с Дарьей',
          image: 'https://avatars.mds.yandex.net/get-shedevrum/12733905/img_0c77eb970a1c11efb6608a2fbb0b6351/orig',
          teacher: 'Годовой курс ЕГЭ',
          price: '',
          link: 'courses',
        },
        {
          title: 'Информатика с Софьей',
          image: 'https://avatars.mds.yandex.net/get-shedevrum/11477113/img_b8d7973b0a1b11efa29d5ed523baf25f/orig',
          teacher: 'Годовой курс ЕГЭ',
          price: '',
          link: 'courses',
        },
        {
          title: 'Обществознание с Даниилом',
          image: 'https://avatars.mds.yandex.net/get-shedevrum/9283310/img_54afbc1a0a1c11ef90773ad29863823d/orig',
          teacher: 'Годовой курс ЕГЭ',
          price: '',
          link: 'courses',
        },
      ],
      directions: [
        {
          title: 'ЕГЭ 11 класс',
          link: '/courses',
          img: directionImg11,
        },
        {
          title: 'ЕГЭ 10 класс',
          link: '/courses',
          img: directionImg10,
        },
        {
          title: 'ОГЭ 9 класс',
          link: '/courses',
          img: directionImg9,
        },
        {
          title: '5-8 класс',
          link: '/courses',
          img: directionImg5,
        },
        {
          title: 'Олимпиады',
          link: '/courses',
          img: directionImgOl,
        },
        {
          title: 'Репетиторы',
          link: '/courses',
          img: directionImgRep,
        },
      ],
      navItems: [
        { title: 'ЕГЭ', route: 'courses' },
        { title: 'Курсы', route: 'courses' },
        { title: 'Преподаватели', route: 'teachers' },
        { title: 'О нас', route: 'about' },
      ],
      footerLinks: ['ЕГЭ', 'Курсы', 'Преподователи', 'О нас'],
    };
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik+Scribble&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Rubik+Scribble&display=swap');

body {
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.8), rgba(238, 228, 255, 0.8), rgba(255, 242, 230, 0.8), rgba(238, 228, 255, 0.8), rgba(255, 255, 255, 0.8));
  background-size: 400% 400%;
  animation: gradientAnimation 15s ease infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.username {
  cursor: pointer;
  color: #000000;
  margin-right: 16px;
}
h1 {
  font-family: 'Oswald', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 50px;
}
.wid2 {
  font-size: 15px;
}
.con1 {
  display: flex;
  flex-direction: column;
  height: 700px;
}
.con2 {
  height: 900px;
  margin-bottom: 100px;
}
.img1 {
  margin-bottom: 5px;
  border: 10px rgb(185, 86, 245);
  border-radius: 10px;
}
.v-list-item--link:hover {
  background-color: rgba(152, 46, 214, 0.15);
}
.cardteach {
  border-radius: 10px;
}
@media (max-width: 959px) {
  h1 {
    font-size: 36px;
  }
  .wid1 {
    width: 150px;
  }
  .wid2 {
    font-size: 12px;
  }
  .con2 {
    height: 1500px;
  }
}

@media (max-width: 599px) {
  h1 {
    font-size: 24px;
  }
  .wid1 {
    width: 100px;
  }
  .wid2 {
    font-size: 10px;
  }
  .con2 {
    height: 1400px;
  }
}
</style>
