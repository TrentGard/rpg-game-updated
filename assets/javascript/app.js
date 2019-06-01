characters.forEach(char => {
    const wrapper = $('<div>').addClass("character other").data("hp", char.hp).data("attack", char.attack);
    const name = $('<div>').addClass("name").text(char.name);
    const hitPoints = $('<div>').addClass("hit-points").text(char.hp);
    const image = $('<img>').addClass("image").attr("src", char.img);
    wrapper.append(name).append(image).append(hitPoints);
    $("#charSelectDiv").prepend(wrapper);
});

let defenderPresent = false;
let villainsKilled = 0;
let heroAttack;
let defenderAttack;
let heroHP;
let defenderHP;
let heroName;
let defenderName;
$('.message').hide();

$('.other').click(function () {
    if($(this).hasClass("hero") || $(this).hasClass("defender")) {
        return;
    };
    if ($(this).hasClass("villain")) {
        handleVillainClick ($(this));
    } else {
        $('#heroSection').prepend($(this));
        $(this).addClass("hero").removeClass("other");
        heroAttack = $(this).data("attack");
        heroHP = $(this).data("hp");
        heroName = $('.hero .name').html().toUpperCase();
        console.log(heroName);
        $('#villains').prepend($('.other'));
        $('.other').removeClass("other").addClass("villain");
    };
});

const handleVillainClick = function (villain) {
    if (defenderPresent) return;
    defenderAttack = villain.data("attack");
    defenderHP = villain.data("hp");
    villain.addClass("defender").removeClass("villain");
    defenderName = $('.defender .name').html().toUpperCase();
    console.log(defenderName);
    $('#defenderDiv').show().prepend(villain);
    defenderPresent = true;
};

const gameOver = function (message) {
    const playAgainButton = $('<input type="button" value="Play Again?" class="play-again" />');
    $(playAgainButton).appendTo($("body"));
    $('#attackButton').attr("disabled", true);
    $('#attackMessage').html(message);
    $('#defenderMessage').hide();
    $('.play-again').click(function() {
        location.reload();
    });
};

const nextDefender = function () {
    $('#defenderMessage').hide();
    $('#attackMessage').html(`You defeated ${defenderName}!`);
    $('.defender').addClass("defeated").removeClass("defender");
    $('.defeated').hide();
    defenderPresent = false;
    villainsKilled++;
    if (villainsKilled === 3) {
        gameOver("You won!");
    };
};  

$('#attackButton').click(function () {
    if (!defenderPresent) return;
    $('.message').show();
    $('#attackMessage').html(`You attacked ${defenderName} for ${heroAttack} damage!`);
    $('#defenderMessage').html(`${defenderName} attacked you for ${defenderAttack} damage!`);
    $('.hero .hit-points').html(heroHP - defenderAttack);
    $('.defender .hit-points').html(defenderHP - heroAttack);
    heroHP = $('.hero .hit-points').html();
    defenderHP = $('.defender .hit-points').html();
    heroAttack = heroAttack+10;
    if (heroHP <= 0) {
        gameOver("You lost!");
        // console.log("Game Over!");
        return;
    } else if (heroHP > 0 && defenderHP <= 0) {
        nextDefender();
    };
});