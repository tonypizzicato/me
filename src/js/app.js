import $ from 'jquery';

const timeline = $('.timeline__block');
const CLASSES  = {
    hidden: 'm_visibility_hidden'
}

timeline.each((i, block) => {
    if ($(block).offset().top > $(window).scrollTop() + $(window).height() * 0.75) {
        $(block).find('.timeline__image, .timeline__content').addClass(CLASSES['hidden']);
    }
});

$(window).on('scroll', () => {
    timeline.each((i, block) => {
        block = $(block);

        if (block.offset().top <= $(window).scrollTop() + $(window).height() * 0.75 && block.find('.timeline__image').hasClass(CLASSES['hidden'])) {
            block.find('.timeline__image, .timeline__content').removeClass(CLASSES['hidden']).addClass('bounce-in');
        }
    });
});
