let move_speed = 3, gravity = 0.5;
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
//let sound_point = new Audio('sounds effect/point.mp3');
//let sound_die = new Audio('sounds effect/die.mp3');

// getting bird element properties
let bird_props = bird.getBoundingClientRect();

// This method returns DOMRect -> top, right, bottom, left, x, y, width, and height
let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    
    if(e.key == 'Enter' && game_state != 'Play'){
        document.querySelectorAll('.bamboo_pipe').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

function play(){
    function move(){
        if(game_state != 'Play') return;

        let bamboo_pipes = document.querySelectorAll('.bamboo_pipe');
        bamboo_pipes.forEach((element) => {
            let bamboo_pipe_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();

            if(bamboo_pipe_props.right <= 0){
                element.remove();
            }else{
                if(bird_props.left < bamboo_pipe_props.left + bamboo_pipe_props.width && bird_props.left + bird_props.width > bamboo_pipe_props.left && bird_props.top < bamboo_pipe_props.top + bamboo_pipe_props.height && bird_props.top + bird_props.height > bamboo_pipe_props.top){
                    game_state = 'End';
                    message.innerHTML = 'Game Over'.fontcolor('red') + '<br>Press Enter To Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    //sound_die.play();
                    return;
                }else{
                    if(bamboo_pipe_props.right < bird_props.left && bamboo_pipe_props.right + move_speed >= bird_props.left && element.increase_score == '1'){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                        //sound_point.play();
                    }
                    element.style.left = bamboo_pipe_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    let bird_dy = 0;
    function apply_gravity(){
        if(game_state != 'Play') return;
        bird_dy = bird_dy + gravity;
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'bird.png';
                bird_dy = -7.6;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp' || e.key == ' '){
                img.src = 'bird.png';
            }
        });

        if(bird_props.top <= 0 || bird_props.bottom >= background.bottom){
            game_state = 'End';
            message.style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
        requestAnimationFrame(apply_gravity);
    }
    requestAnimationFrame(apply_gravity);

    let pipe_separation = 0;

    let pipe_gap = 35;

    function create_pipe(){
        if(game_state != 'Play') return;

        if(pipe_separation > 115){
            pipe_separation = 0;

            let pipe_position = Math.floor(Math.random() * 43) + 8;
            let bamboo_pipe_inv = document.createElement('div');
            bamboo_pipe_inv.className = 'bamboo_pipe';
            bamboo_pipe_inv.style.top = pipe_position - 70 + 'vh';
            bamboo_pipe_inv.style.left = '100vw';

            document.body.appendChild(bamboo_pipe_inv);
            let bamboo_pipe = document.createElement('div');
            bamboo_pipe.className = 'bamboo_pipe';
            bamboo_pipe.style.top = pipe_position + pipe_gap + 'vh';
            bamboo_pipe.style.left = '100vw';
            bamboo_pipe.increase_score = '1';

            document.body.appendChild(bamboo_pipe);
        }
        pipe_separation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}
