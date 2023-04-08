import { A } from "solid-start";
import "./team.css";

export default function Team() {
  return (
    <main class="main">
      <div class="header">
        <p>MEET THE TEAM!</p>
      </div>

      <div class="container">
        <div class="card">
          <div class="content">

            <div class="imgBx">
              <img class="img" src="../../dakota.jpg" alt="Squid" />
            </div>

            <div class="contentBx">
              <h3>Dakota</h3> 
            </div>

            <ul class="sci">
              <li><a href="https://www.github.com/dakotalmcpherson" target="_blank"><img class="icons" src="../../github-mark-white.png" alt="" /></a></li>
              <li><a href="https://www.linkedin.com/in/dakota-mcpherson-006b23178/" target="_blank"><img class="icons" src="../../linked.png" alt="" /> </a></li>
            </ul>
          </div>
        </div>

        <div class="card">
          <div class="content">

            <div class="imgBx">
              <img class="img" src="../../lloyd.png" alt="Squid" />
            </div>

            <div class="contentBx">
              <h3>Lloyd</h3>
            </div>

            <ul class="sci">
              <li><a href="https://www.github.com/LloydBistany" target="_blank"><img class="icons" src="../../github-mark-white.png" alt="" /></a></li>
              <li><a href=" https://www.linkedin.com/in/lloyd-bistany" target="_blank"><img class="icons" src="../../linked.png" alt="" /> </a></li>
            </ul>
          </div>

            <div class="contentBx">
              <h3>Lloyd</h3>
        </div>
        
        <div class="card">
          <div class="content">

            <div class="imgBx">
              <img class="img" src="../../peter.jpeg" alt="Squid" />
            </div>

            <div class="contentBx">
              <h3>Peter</h3>
            </div>

            <ul class="sci">
              <li><a href="https://www.github.com/pko912" target="_blank"><img class="icons" src="../../github-mark-white.png" alt="" /></a></li>
              <li><a href="https://www.linkedin.com/in/peterko912" target="_blank"><img class="icons" src="../../linked.png" alt="" /> </a></li>
            </ul>
          </div>
        </div>

        <div class="card">
          <div class="content">

            <div class="imgBx">
              <img class="img" src="../../truett.png" alt="Squid" />
            </div>

            <div class="contentBx">
              <h3>Truett</h3>
            </div>

            <ul class="sci">
              <li><a href="https://www.github.com/truettd123" target="_blank"><img class="icons" src="../../github-mark-white.png" alt="" /></a></li>
              <li><a href="https://www.linkedin.com/in/truett-davis/" target="_blank"><img class="icons" src="../../linked.png" alt="" /> </a></li>
            </ul>
          </div>
        </div>

      </div>

    </main>
  );
}