import { A } from "solid-start";
import "./team.css";

export default function Team() {
  return (
    <main class="team">
      <div class="header">
        <p>MEET THE TEAM!</p>
      </div>

      <div class="teamMates">
        <div class="Dakota">
          <img class="img" src="../../dakota.jpg" alt="Squid" />
          <div class="links">
            Dakota 
          <a href="https://www.github.com" target="_blank"><img class="github" src="../../github.png" alt="" /></a> 
          <a href="https://www.linkedin.com" target="_blank"><img class="github" src="../../linked.png" alt="" /> </a>
          </div>
        </div>

        <div class="Lloyd">
          <img class="img" src="../../lloyd.png" alt="Squid" />
          <div class="links">
            Lloyd 
            <a href="https://www.github.com" target="_blank"><img class="github" src="../../github.png" alt="" /></a> 
            <a href="https://www.linkedin.com" target="_blank"><img class="github" src="../../linked.png" alt="" /> </a>
          </div>
        </div>
        
        <div class="Peter">
          <img class="img" src="../../peter.jpeg" alt="Squid" />
          <div class="links">
            Peter 
            <a href="https://www.github.com" target="_blank"><img class="github" src="../../github.png" alt="" /></a> 
            <a href="https://www.linkedin.com" target="_blank"><img class="github" src="../../linked.png" alt="" /> </a>
          </div>        
        </div>

        <div class="Truett">
          <img class="img" src="../../truett.png" alt="Squid" />
          <div class="links">
            Truett 
            <a href="https://www.github.com" target="_blank"><img class="github" src="../../github.png" alt="" /></a> 
            <a href="https://www.linkedin.com" target="_blank"><img class="github" src="../../linked.png" alt="" /> </a>
          </div>
        </div>

      </div>

    </main>
  );
}