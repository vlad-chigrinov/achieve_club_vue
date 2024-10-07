<template>
  <header>
    <div class="heading-wrapper">
      <div id="profileSlogan">
        <span>Рейтинг клубов</span>
      </div>
    </div>
  </header>
  <!-----------------------------------header----------------------------------------->
  <main>
    <div class="topUsers">
      <a class="clubWidth">
        <div class="topClub">
          <div class="userImageTop">
            <img src="http://achieve.by:5000/icons/clubs/palace.png" alt="" />
          </div>
          <div class="userAboutWrapper">
            <div class="nameSurnameUser">
              <span>Title</span>
            </div>
            <div class="xpCountUser">
              <span>Средний опыт: 1000Xp</span>
            </div>
          </div>
          <div class="ClubLogoAndPositionUser">
            <div class="topPositionUser">
              <span>#1</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  </main>
</template>

<style scoped>

header {
    border-radius: 0px 0px 50px 50px;
}

.heading-wrapper {
    display: flex;
    justify-content: center;
    padding-top: 15px;
}

#profileSlogan {
    width: 100%;
    font-size: 24px;
    font-family: 'Exo 2', sans-serif;
    font-style: normal;
    font-weight: normal;
    margin: 0;
    color: white;
    text-align: center;
    padding-bottom: 20px;
}

footer {
    width: 100%;
    position: fixed;
    bottom: 0;
}

.footerSections {
    display: flex;
    background: white;
    width: 100%;
    justify-content: center;
    -webkit-box-shadow: 0px -5px 15px 4px rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0px -5px 15px 4px rgba(0, 0, 0, 0.2);
    box-shadow: 0px -5px 15px 4px rgba(0, 0, 0, 0.2);
}

footer img {
    width: 50px;
    margin: 10px 30px 5px 30px;
    object-fit: cover;
}

.secondSection hr {
    border-bottom: 5px solid #0D4E81;
    border-radius: 10px 10px 0px 0px;
    margin: 0;
}

.topUsers {
    display: flex;
    justify-content:center;
    flex-direction:column;
    align-items: center;
}


.topClub:hover {
    cursor: pointer;
}


.topClub {
    background: #151e1d;
    border-radius: 20px;
    display: flex;
    padding: 15px;
    margin-top: 15px;
}

.userImage img {
    width: 50px;
    object-fit: cover;
    border-radius: 50%;
}

.userImageTop img {
    width: 55px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid #151e1d;
}

.userAboutWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;
    width: 50%;
}

.nameSurnameUser {
    font-family: 'Exo 2';
    font-style: normal;
    font-weight: normal;
    color: white;
}

.xpCountUser {
    font-size: 0.8em;
    color: white;
}

.xpCountDefaultUser {
    font-size: 13px;
    color: black;
}

.clubUserLogo {
    text-align: center;
    display: flex;
    align-items: center;
    padding-right: 15px;
}

    .clubUserLogo img {
        width: 45px;
        object-fit: cover;
    }

.topPositionUser {
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    display: flex;
    color: white;
    align-items: center;
    color: white;
}

.topPositionUserDefault {
    font-size: 2em;
    font-weight: normal;
    text-align: center;
    display: flex;
    color: white;
    align-items: center;
}

.ClubLogoAndPositionUser {
    width: 30%;
    display: flex;
    justify-content: flex-end;
}

.clubWidth {
    width: 40%;
}

@media (max-width: 800px) {
    .clubWidth {
        width: 80%;
    }
    .topPositionUser {
        font-size: 1.5em;
    }
}

@media(max-width:430px) {
    #infoTask {
        text-align: left;
    }
    .clubWidth {
        width: 100%;
    }
    .topPositionUser {
        font-size: 1.5em;
    }
}

@media (max-width:1100px) {
    .ClubLogoAndPositionUser {
        width: 50%;
    }

    .clubWidth {
        width: 80%;
    }

    .userAboutWrapper {
        width: 80%;
    }
}
</style>