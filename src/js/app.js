import $ from 'jquery';
import Parallax from './parallax';

const $window = $(window);

/** init parallax effect */

const parallax = new Parallax();
parallax.init();


const timeline = $('.timeline__block');
const skills   = $('.skills__item');

const CLASSES = {
    hidden:     'm_visibility_hidden',
    navSticked: 'nav_sticked_yes',
    animated:   'animated slideInUp'
}


const $nav       = $('.nav');
const $navOffset = $nav.offset().top;

const processTimelineBlock = (i, b) => {
    b = $(b);

    if (b.offset().top <= $window.scrollTop() + $window.height() * 0.75 && b.find('.timeline__image').hasClass(CLASSES['hidden'])) {
        b.find('.timeline__image, .timeline__content').removeClass(CLASSES['hidden']).addClass('bounce-in');
    }
}

const processSkillBlock = (i, b) => {
    b = $(b);

    if (b.offset().top <= $window.scrollTop() + $window.height() * .8 && b.find('.skills__logo').hasClass(CLASSES['hidden'])) {
        b.find('.skills__logo, .skills__desc').removeClass(CLASSES['hidden']).addClass(CLASSES['animated']);
    }
}

$window.on('scroll', () => {
    timeline.each(processTimelineBlock);
    skills.each(processSkillBlock);

    if ($window.scrollTop() >= $navOffset) {
        $nav.addClass(CLASSES['navSticked']);
    } else {
        $nav.removeClass(CLASSES['navSticked']);
    }
});


timeline.each((i, block) => {
    const b = $(block);

    if (b.offset().top > $window.scrollTop() + $(window).height() * 0.75) {
        b.find('.timeline__image, .timeline__content').addClass(CLASSES['hidden']);
    }
});


skills.each((i, block) => {
    const b = $(block);

    if (b.offset().top > $window.scrollTop() + $(window).height() * 0.8) {
        b.find('.skills__logo, .skills__desc').addClass(CLASSES['hidden']);
    }
});


