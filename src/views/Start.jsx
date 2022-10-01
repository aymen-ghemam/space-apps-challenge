import React, { useEffect } from 'react'

const Start = ({setPage}) => {
    useEffect(() => {
        // DOM selectors
        const stars = document.getElementById('stars');
        const starsCtx = stars.getContext('2d');

        // const slider = document.querySelector(".slider input");
        // const output = document.querySelector("#speed");
        var timeout;

        // global variables
        let screen, starsElements, starsParams = { speed: 3, number: 400, extinction: 4};

        // run stars
        setupStars();
        updateStars();

        // handle slider
        // output.innerHTML = slider.value;
        // slider.oninput = function() {
        //     output.innerHTML = this.value;
        //     starsParams.speed = this.value;
        // };

        // update stars on resize to keep them centered
        window.onresize = function() {
            setupStars();
        };

        // star constructor
        function Star() {
            this.x = Math.random() * stars.width;
            this.y = Math.random() * stars.height;
            this.z = Math.random() * stars.width;

            this.move = function() {
                this.z -= starsParams.speed;
                if (this.z <= 0) {
                    this.z = stars.width;
                }
            };

            this.show = function() {
                let x, y, rad, opacity;
                x = (this.x - screen.c[0]) * (stars.width / this.z);
                x = x + screen.c[0];
                y = (this.y - screen.c[1]) * (stars.width / this.z);
                y = y + screen.c[1];
                rad = stars.width / this.z;
                opacity = (rad > starsParams.extinction) ? 1.5 * (2 - rad / starsParams.extinction) : 1;

                starsCtx.beginPath();
                starsCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
                starsCtx.arc(x, y, rad, 0, Math.PI * 2);
                starsCtx.fill();
            }
        }

        // setup <canvas>, create all the starts
        function setupStars() {
            screen = {
                w: window.innerWidth,
                h: window.innerHeight,
                c: [ window.innerWidth * 0.5, window.innerHeight * 0.5 ]
            };
            window.cancelAnimationFrame(updateStars);
            stars.width = screen.w;
            stars.height = screen.h;
            starsElements = [];
            for (let i = 0; i < starsParams.number; i++) {
                starsElements[i] = new Star();
            }
        }

        // redraw the frame
        function updateStars() {
            starsCtx.fillStyle = "black";
            starsCtx.fillRect(0, 0, stars.width, stars.height);
            starsElements.forEach(function (s) {
                s.show();
                s.move();
            });
            window.requestAnimationFrame(updateStars);
        }

        const animateCSS = (element, animation, prefix = 'animate__') =>
        // We create a Promise and return it
            new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;
            const node = document.querySelector(element);

            node.classList.add(`${prefix}animated`, animationName);

            // When the animation ends, we clean the classes and resolve the Promise
            function handleAnimationEnd(event) {
                event.stopPropagation();
                node.classList.remove(`${prefix}animated`, animationName);
                resolve('Animation ended');
            }

            node.addEventListener('animationend', handleAnimationEnd, {once: true});
            });


        // document.getElementById('start').addEventListener('click', ()=>{
        //     animateCSS('.wrapper', 'zoomOutDown').then(() => {
        //         document.getElementById('header').classList.add('hidden')
        //         document.getElementById('sun').classList.remove('hidden')
        //         animateCSS('#video1', 'zoomInUp').then(()=>{
        //             document.getElementById('canvas').classList.add('hidden')
        //         })
        //     });
        // })

    }, [])
    
  return (
    <header id="header" class="container">
      <div class="wrapper animate__animated animate__pulse animate__slow animate__infinite">
        <div>
          <img class="logo" src="./assets/logo.png" alt="" />
        </div>

        {/* <div class="slider">
          <input type="range" min="0.5" max="15" value="2" step="0.5" />
          <span id="speed"></span>
        </div> */}
      </div>

      <button id="start" onClick={()=>setPage(1)}>Start</button>
    </header>
  )
}

export default Start