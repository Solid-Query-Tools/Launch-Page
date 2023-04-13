import "./team.css";
import Truett from "./assets/truett.png"
import Dakota from "./assets/dakota.jpg"
import Peter from "./assets/peter.jpeg"
import Lloyd from "./assets/lloyd.png"
import Linked from "./assets/linked.png"
import Github from "./assets/GithubWhite.png"
import Header from './header';
// import Footer from "./footer";
export default function Team() {
  return (
    <>
      <Header />
      <main class="main">
        <div class="header">
          <p>MEET THE TEAM!</p>
        </div>
        <div class="container">
          <div class="card">
            <div class="content">
              <div class="imgBx">
                <img class="img" src={Dakota} alt="Squid" />
              </div>
              <div class="contentBx">
                <h3>Dakota</h3>
              </div>
              <ul class="sci">
                <li><a href="https://www.github.com/dakotalmcpherson" target="_blank"><img class="icons" src={Github} alt="" /></a></li>
                <li><a href="https://www.linkedin.com/in/dakota-mcpherson-006b23178/" target="_blank"><img class="icons" src={Linked} alt="" /> </a></li>
              </ul>
            </div>
          </div>
          <div class="card">
            <div class="content">
              <div class="imgBx">
                <img class="img" src={Lloyd} alt="Squid" />
              </div>
              <div class="contentBx">
                <h3>Lloyd</h3>
              </div>
              <ul class="sci">
                <li><a href="https://www.github.com/LloydBistany" target="_blank"><img class="icons" src={Github} alt="" /></a></li>
                <li><a href=" https://www.linkedin.com/in/lloyd-bistany" target="_blank"><img class="icons" src={Linked} alt="" /> </a></li>
              </ul>
            </div>
          </div>
          <div class="card">
            <div class="content">
              <div class="imgBx">
                <img class="img" src={Peter} alt="Squid" />
              </div>
              <div class="contentBx">
                <h3>Peter</h3>
              </div>
              <ul class="sci">
                <li><a href="https://www.github.com/pko912" target="_blank"><img class="icons" src={Github} alt="" /></a></li>
                <li><a href="https://www.linkedin.com/in/peterko912" target="_blank"><img class="icons" src={Linked} alt="" /> </a></li>
              </ul>
            </div>
          </div>
          <div class="card">
            <div class="content">
              <div class="imgBx">
                <img class="img" src={Truett} alt="Squid" />
              </div>
              <div class="contentBx">
                <h3>Truett</h3>
              </div>
              <ul class="sci">
                <li><a href="https://www.github.com/truettd123" target="_blank"><img class="icons" src={Github} alt="" /></a></li>
                <li><a href="https://www.linkedin.com/in/truett-davis/" target="_blank"><img class="icons" src={Linked} alt="" /> </a></li>
              </ul>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </main>
    </>
  );
};