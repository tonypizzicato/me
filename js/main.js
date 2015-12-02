import $ from 'jquery';

const timeline = $('.timeline__block');

timeline.each((i, block) => {
    if ($(block).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
        $(block).find('.timeline__image, .timeline__content').addClass('is-hidden');
    }
});

$(window).on('scroll', () => {
    timeline.each((i, block) => {
        if ($(block).offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && $(block).find('.timeline__image').hasClass('is-hidden')) {
            $(block).find('.timeline__image, .timeline__content').removeClass('is-hidden').addClass('bounce-in');
        }
    });
});
