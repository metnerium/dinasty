<template>
  <v-app id="inspire">
    <v-app-bar>
      <v-app-bar-title>
        <v-img
          src="https://raw.githubusercontent.com/metnerium/school_project/2765b9dffafd14995ef75c04b55ac09e578f332d/school_app/templates/school_app/img/logopur1.svg"
          class="ml-2 mt-1 wid1"
          :width
        ></v-img>
      </v-app-bar-title>
      <v-btn-toggle v-model="activeBtn" class="hidden-sm-and-down" mandatory>
        <v-btn @click="egepage('ege')">ЕГЭ</v-btn>
        <v-btn @click="egepage('courses')">Курсы</v-btn>
        <v-btn @click="egepage('teachers')">Преподаватели</v-btn>
        <v-btn @click="egepage('about')">О нас</v-btn>
      </v-btn-toggle>
      <v-menu
        open-on-hover
      >
        <template v-slot:activator="{ props }">
          <v-btn
            class="hidden-md-and-up"
            color="primary"
            v-bind="props"
            icon="mdi-menu"
          >

          </v-btn>
        </template>

        <v-list>
          <v-list-item
          >
            <v-list-item-title @click="egepage('ege')">ЕГЭ</v-list-item-title>
            <v-list-item-title @click="egepage('courses')">Курсы</v-list-item-title>
            <v-list-item-title @click="egepage('teachers')">Преподаватели</v-list-item-title>
            <v-list-item-title @click="egepage('about')">О нас</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn variant="outlined" @click="egepage('login')">
        Войти <v-icon icon="mdi-login-variant" end></v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-parallax height="100%" src="@/assets/bg.svg">
        <v-container class="con1">
          <v-row align="center" justify="center" class="flex-column">
            <h1 class="mt-10 text-center">ПРИСОЕДИНЯЙТЕСЬ К ДИНАСТИИ ЕГЭ</h1>
            <h4 class="mt-3 text-center">
              Достигайте вершин с нашей пошаговой подготовкой к ЕГЭ. Ваш успех - наша цель.
            </h4>
            <div>
              <v-btn
                size="large"
                variant="flat"
                class="mr-3 mt-5 bg-deep-purple-darken-1"
                @click="egepage('courses')"
              >Выбрать курс</v-btn
              >
              <v-btn size="large" variant="outlined" class="mt-5 hidden-sm-and-down"
              ><p class="wid2">Получить консультацию</p></v-btn
              >
            </div>
          </v-row>

        </v-container>
        <v-container class="con2" align="center" justify="center">
          <v-sheet class="pa-4" width="75%" color="transparent">
            <h1 align="center" justify="center">Направления подготовки</h1>
            <v-row>
              <v-col cols="12" md="6" lg="4" v-for="(direction, index) in directions" :key="index">
                <v-list-item nuxt :to="direction.link" color="primary">
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
          <v-sheet class="pa-4" color="transparent" >
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
                <div class="bg-deep-purple-darken-1 pb-5 cardteach">
                  <v-img
                    :src="course.image"
                    class="img1"
                    :width

                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >

                      </v-row>
                    </template>
                  </v-img>
                  <div>
                    <h3 class="mb-1">{{ course.title }}</h3>
                    <p class="mb-2">{{ course.teacher }}</p>
                    <v-btn width="70%" variant="tonal" @click="this.$router.push(course.link)">Перейти к курсу</v-btn>
                  </div>
                </div>


              </v-col>
            </v-row>

          </v-sheet>
        </v-container>
      </v-parallax>
    </v-main>
    <v-footer border>
      <v-row no-gutters class="flex-column">
        <v-btn
          v-for="link in ['ЕГЭ', 'Курсы', 'Преподователи', 'О нас']"
          :key="link"
          class="mx-2"
          color="black"
          variant="text"
        >
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
export default {
  name: 'Home',
  data() {
    return {
      activeBtn: null,
      courses: [
        {
          title: 'Русский язык с Дарьей',
          image: 'https://sun9-4.userapi.com/impg/YR40g2bIKofiIz6ZYm2taUEujaZGemC2VC-_zA/9_deVAoGNEQ.jpg?size=1727x2160&quality=95&sign=203b4e58a104203a20d35377dbccb320&type=album',
          teacher: 'Годовой курс ЕГЭ',
          price: '4=1 11 класс Флеш',
          link: '/course/1',
        },
        {
          title: 'Математика с Вячеславом',
          image: 'https://sun9-4.userapi.com/impg/YR40g2bIKofiIz6ZYm2taUEujaZGemC2VC-_zA/9_deVAoGNEQ.jpg?size=1727x2160&quality=95&sign=203b4e58a104203a20d35377dbccb320&type=album',
          teacher: 'Годовой курс ЕГЭ',
          price: '4=1 9 класс Флеш',
          link: '/course/2',
        },
        {
          title: 'Обществознание с Даниилом',
          image: 'https://sun9-4.userapi.com/impg/YR40g2bIKofiIz6ZYm2taUEujaZGemC2VC-_zA/9_deVAoGNEQ.jpg?size=1727x2160&quality=95&sign=203b4e58a104203a20d35377dbccb320&type=album',
          teacher: 'Годовой курс ЕГЭ',
          price: '4=1 9 класс Флеш',
          link: '/course/3',
        },
      ],
      directions: [
        {
          title: 'ЕГЭ 11 класс',
          link: '/ege/11-class',
          img: 'src/assets/11.svg',
        },
        {
          title: 'ЕГЭ 10 класс',
          link: '/ege/10-class',
          img: 'src/assets/10.svg',
        },
        {
          title: 'ОГЭ 9 класс',
          link: '/oge/9-class',
          img: 'src/assets/9.svg',
        },
        {
          title: '5-8 класс',
          link: '/ege/5-8-class',
          img: 'src/assets/5.svg',
        },
        {
          title: 'Олимпиады',
          link: '/olympics',
          img: 'src/assets/ol.svg',
        },
        {
          title: 'Репетиторы',
          link: '/teachers',
          img: 'src/assets/rep.svg',
        },
      ],
    };
  },
  methods: {
    egepage(l) {
      this.$router.push('/' + l);
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik+Scribble&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Rubik+Scribble&display=swap');

h1 {
  font-family: 'Oswald', sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 50px;
}
.wid1{
  width: 160px;
}
.wid2{
  font-size: 15px;
}
.con1{
  display: flex;
  flex-direction: column;
  height: 800px;

}
.con2{
  height: 800px;
}
.img1{
  margin-bottom: 4px;
  margin-top: 20px;
  border: 2px rgb(185, 86, 245) solid;
  border-radius: 15px;
  width: 400px;
}
.v-list-item--link:hover {

  background-color: rgba(152, 46, 214, 0.15);

}
.dark-gradient-background {
  background-image: linear-gradient(135deg, #000000, #ffffff);
  background-image: -webkit-linear-gradient(135deg, #000000, #ffffff);
}
.cardteach{
  border: black;
  border-radius: 20px;
}
@media (max-width: 959px) {
  h1 {
    font-size: 36px;
  }
  .wid1{
    width: 150px;
  }
  .wid2{
    font-size: 12px;
  }
  .img1{
    width: 220px;
  }
  .con2{
    height: 1500px;
  }
}

@media (max-width: 599px) {
  h1 {
    font-size: 24px;
  }
  .wid1{
    width: 110px;
  }
  .wid2{
    font-size: 10px;

  }
  .con2{
    height: 1400px;
  }
  .img1{
    width: 300px;
  }
}
</style>
