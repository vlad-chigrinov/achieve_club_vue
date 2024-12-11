import '../assets/styles/app.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './Pages/HomePage.vue'
import LoginPage from './Pages/LoginPage.vue'
import RegistrationPage from './Pages/RegistrationPage.vue'
import TopUsersPage from './Pages/TopUsersPage.vue'
import InfoPage from './Pages/InfoPage.vue'
import AnotherUserPage from './Pages/AnotherUserPage.vue'
import { createI18n } from 'vue-i18n'

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/registration', component: RegistrationPage },
  { path: '/topusers', component: TopUsersPage },
  { path: '/info', component: InfoPage },
  { path: '/users/:id', component: AnotherUserPage }
]

const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes
})

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'pl',
  availableLocales: ['ru', 'pl'],
  messages: {
    ru: {
      login: {
        title: 'Вход в аккаунт',
        or: 'или',
        register: 'зарегистрируйтесь',
        email: 'Почта',
        password: 'Пароль',
        forgotPassword: 'Забыли пароль?',
        login: 'Войти',
        errors: {
          wrongLoginOrPassword: 'Неправильный логин или пароль',
          enterEmail: 'Введите почту',
          wrongEmail: 'Вы ввели недействительную почту',
          enterPassword: 'Введите пароль',
          password6Characters: 'Минимум 6 символом',
          password1Letter: 'Минимум 1 буква',
          password1Digit: 'Минимум 1 цифра'
        }
      },
      forgotPassword: {
        title: 'Восстановление пароля',
        enterEmailHint: 'Введите адрес электронной почты, с помощью которой вы создавали аккаунт',
        email: 'Почта',
        sendCode: 'Отправить код',
        checkEmailHint: 'Проверьте почту {email}. Код должен придти в течение {interval} минут',
        enterCodeHint: 'Введите 4-значный код',
        newPasswordHint: 'Придумайте новый пароль',
        password: 'Пароль',
        passwordConfirm: 'Подтвеждение пароля',
        changePassword: 'Сменить пароль',
        successMessage: 'Пароль был успешно изменен!',
        backToLogin: 'Вернуться ко входу',
        errors: {
          enterEmail: 'Введите почту',
          wrongEmail: 'Вы ввели недействительную почту',
          userWithEmailNotFound: 'Пользователя с такой почтой не существует',
          serverError: 'Ошибка сервера',
          wrongCodeMessage: 'Вы ввели неправильный код, попробуйте еще раз',
          enterPassword: 'Введите пароль',
          password6Characters: 'Минимум 6 символом',
          password1Letter: 'Минимум 1 буква',
          password1Digit: 'Минимум 1 цифра',
          passwordNotEqualConfirmPassword: 'Пароли должны совпадать'
        }
      },
      menu: {
        profile: 'Профиль',
        topUsers: 'Топ 100',
        infoPage: 'Инфо'
      },
      profile: {
        stats: {
          xpSum: 'Всего XP',
          achieveCompleted: 'Заданий выполнено'
        },
        filters: {
          combo: 'комбо',
          completed: 'сделано',
          nonCompleted: 'несделано'
        }
      },
      topUsers: {
        title: 'Топ пользователей'
      },
      infoPage: {
        card1: {
          title: 'Выполнение достижений',
          subTitle: 'Чтобы выполнить достижение вам нужно:',
          point1: 'Выбрать желаемое достижение',
          point2: 'Нажать на вспывающую кнопку',
          point3: 'Попросить у тренера просканировать код'
        },
        card2: {
          title: 'Получайте XP за достижения',
          point1: 'Больше достижений',
          point2: 'Больше XP',
          point3: 'Вы поднимаетесь в топе пользователей'
        },
        card3: {
          title: 'Комбо достижения',
          point1:
            'Все комбо достижения отображаются во вкладке КОМБО. Их вы можете выполнять СКОЛЬКО УГОДНО - и каждый раз получать за это очки.',
          point2:
            'К примеру: если вы выполнили такое достижение на 100 очков 10 раз, то получили 100 × 10 = 1000XP!'
        },
        card4: {
          title: 'Топ пользователей',
          point1: 'Чем выше вы в топе - тем вы круче',
          point2: 'За первые места в топе можно получить приятные призы'
        }
      }
    },
    pl: {
      login: {
        title: 'Logowanie',
        or: 'lub',
        register: 'rejestracja',
        email: 'Poczta',
        password: 'Hasło',
        forgotPassword: 'Zapomniałeś hasła?',
        login: 'Login',
        errors: {
          wrongLoginOrPassword: 'Nieprawidłowy login lub hasło',
          enterEmail: 'Wprowadź swój adres e-mail',
          wrongEmail: 'Wprowadzono nieprawidłowy adres e-mail',
          enterPassword: 'Wprowadź hasło',
          password6Characters: 'Minimum 6 znaków',
          password1Letter: 'Minimum 1 litera',
          password1Digit: 'Minimum 1 cyfra'
        }
      },
      forgotPassword: {
        title: 'Odzyskaj hasło',
        enterEmailHint: 'Wprowadź adres e-mail użyty do utworzenia konta',
        email: 'Poczta',
        sendCode: 'Wyślij kod',
        checkEmailHint: 'Sprawdź {email}. Kod powinien dotrzeć w ciągu {interval} minut',
        enterCodeHint: 'Wprowadź 4-cyfrowy kod',
        newPasswordHint: 'Wprowadź nowe hasło',
        password: 'Hasło',
        passwordConfirm: 'Potwierdź hasło',
        changePassword: 'Zmień hasło',
        successMessage: 'Hasło zostało pomyślnie zmienione!',
        backToLogin: 'Wróć do logowania',
        errors: {
          enterEmail: 'Wprowadź swój adres e-mail',
          wrongEmail: 'Wprowadzono nieprawidłowy adres e-mail',
          userWithEmailNotFound: 'Użytkownik z tym adresem e-mail nie istnieje',
          serverError: 'Błąd serwera',
          wrongCodeMessage: 'Wprowadzono nieprawidłowy kod, spróbuj ponownie',
          enterPassword: 'Wprowadź hasło',
          password6Characters: 'Minimum 6 znaków',
          password1Letter: 'Minimum 1 litera',
          password1Digit: 'Minimum 1 cyfra',
          passwordNotEqualConfirmPassword: 'Hasła muszą być zgodne'
        }
      }
    }
  }
})

createApp(App).use(pinia).use(router).use(i18n).mount('#app')
